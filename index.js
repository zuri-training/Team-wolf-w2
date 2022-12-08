var express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  flash = require("connect-flash"),
  User = require("./models/user"),
  Message = require("./models/contact"),
  bodyParser = require("body-parser"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");
require("dotenv").config();
const user = require("./models/user");
const connect = require("./config/database");
connect();

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(flash());

app.use(
  require("express-session")({
    secret: "Welcome",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.NINverified = req.number;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.welcome = req.flash("welcome");
  next();
});

// ===============
// ROUTES
// ===============

app.get("/", function (req, res) {
  res.render("pages/home", { currentUser: req.user });
  // res.send("<h1>You are Welcome!!!</h1><h2>You are Welcome!!!</h2>")
});

app.get("/register", function (req, res) {
  res.render("pages/signup");
});
app.post("/register", (req, res) => {
  User.register(
    new User(
      { username: req.body.username },
      { fullname: req.body.fullname },
      { email: req.body.email }
    ),
    req.body.password,
    (err, user) => {
      if (err) {
        req.flash("error", "Username already exists");
        return res.render("pages/signup");
      }
      passport.authenticate("local")(req, res, () => {
        req.flash("welcome", "Welcome " + req.body.username);
        res.redirect("/dashboard");
      });
    }
  );
  // res.status(200).json({ message: "Registered successfully", User: User });
});
app.get("/changepassword", (req, res) => res.render("pages/changepassword"));
app.post("/changepassword", function (req, res) {
  User.findByUsername(req.body.username, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      user.changePassword(
        req.body.oldpassword,
        req.body.newpassword,
        function (err) {
          if (err) {
            res.send(err);
          } else {
            res.redirect("/dashboard");
          }
        }
      );
    }
  });
});
app.get("/resetpassword", (req, res) => res.render("pages/resetpassword"));
// Login Route
app.get("/login", function (req, res) {
  res.render("pages/login");
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
  (req, res) => {
    // res.status(200).json({ message: "Login successfully" });
    req.flash("success", "You login successfully");
  }
);
// Dashboard Route
app.get("/dashboard", isLoggedIn, function (req, res) {
  res.render("pages/dashboard", { currentUser: req.user });
});
// Logout Route
app.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    req.flash("success", "You logged out, please login in again");
    res.redirect("/login");
  });
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please Login First");
  res.redirect("/login");
}

app.get("/contacts", isLoggedIn, function (req, res) {
  res.render("pages/contacts");
});
app.post("/contacts", (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if (err) {
      sendStatus(500);
      console.log(err);
    } else
      req.flash(
        "success",
        "Hi " + req.body.names + ", Thanks for contacting us"
      );
    req.flash("Thanks for contacting us");
    // res.status(200).json({ message: "Thanks" });
    res.redirect("/dashboard");
  });
});

app.get("*", function (req, res) {
  res.render("pages/404");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log("Server is running at http://127.0.0.1:%s", `${PORT}`)
);
