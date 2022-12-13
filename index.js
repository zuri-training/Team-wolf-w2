var express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  flash = require("connect-flash"),
  User = require("./models/User"),
  Message = require("./models/contact"),
  bodyParser = require("body-parser"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");

var authRoutes = require("./routes/authRoutes"),
  contactRoutes = require("./routes/contactRoutes"),
  indexRoutes = require("./routes/indexRoutes");

const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const cookieSession = require("cookie-session");
require("./pass");
require("dotenv").config();
const connect = require("./config/database");
connect();

var app = express();
app.set("view engine", "ejs");
// app.use(
//   cookieSession({
//     name: "google-auth-session",
//     keys: ["key1", "key2"],
//   })
// );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(flash());

app.use(
  require("express-session")({
    secret: "Welcome",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.use(new localStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
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
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.welcome = req.flash("welcome");
  next();
});

app.use(authRoutes);
app.use(contactRoutes);
app.use(indexRoutes);
// ===============
// ROUTES
// ===============

app.get("/", function (req, res) {
  res.render("pages/home", { currentUser: req.user });
  // res.send("<h1>You are Welcome!!!</h1><h2>You are Welcome!!!</h2>")
});

app.get("/register", function (req, res) {
  res.render("pages/SignUp");
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
        return res.render("pages/SignUp");
      }
      passport.authenticate("local")(req, res, () => {
        req.flash("welcome", "Welcome " + req.body.username);
        res.redirect("/");
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
            res.redirect("/");
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
    successRedirect: "/",
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

app.get("/aboutus", (req, res) => {
  res.render("pages/aboutus");
});

app.get("/settings", (req, res) => {
  res.render("pages/settings");
});

app.get("/subscription", function (req, res) {
  res.render("pages/subscription");
});

app.get("/template", function (req, res) {
  res.render("pages/template");
});


app.get("*", function (req, res) {
  res.render("pages/404");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log("Server is running at http://127.0.0.1:%s", `${PORT}`)
);
// app.listen(process.env.PORT);
