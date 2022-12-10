var express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  flash = require("connect-flash"),
  User = require("./models/user"),
  Message = require("./models/contact"),
  bodyParser = require("body-parser"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const cookieSession = require("cookie-session");
require("./pass");
require("dotenv").config();
const user = require("./models/user");
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

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },
//     function (email, password, done) {
//       // verify the username and password
//       User.findOne({ email: email }, function (err, user) {
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           return done(null, false);
//         }
//         if (!user.verifyPassword(password)) {
//           return done(null, false);
//         }
//         return done(null, user);
//       });
//     }
//   )
// );
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

// ===============
// ROUTES
// ===============

// Home Route
app.get("/", function (req, res) {
  res.render("pages/home", { currentUser: req.user });
});
// About Us Route
app.get("/aboutus", function (req, res) {
  res.render("pages/aboutus");
});

// Google Login Route
app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  function (req, res) {
    res.redirect("/success");
  }
);
app.get("/failed", (req, res) => {
  // res.send("Failed")
  res.render("pages/failed");
});
app.get("/success", isLoggedIn, (req, res) => {
  res.redirect("/");
  // res.render("pages/success");
});

// Sign Up Route
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
      // if (req.body.password == req.body.repeat_password) {
      passport.authenticate("local")(req, res, () => {
        req.flash("welcome", "Welcome " + req.body.username);
        res.redirect("/");
      });
    }
    // }
  );
  // res.status(200).json({ message: "Registered successfully", User: User });
});
// Change Password Route
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
// Reset Password Route
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
    res.redirect("/");
  });
});
// isLoggedin Function
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please Login First");
  res.redirect("/login");
}
// Contacts Route
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
app.get("/templates", isLoggedIn, function (req, res) {
  res.render("pages/templates");
});

app.get("/payment", isLoggedIn, function (req, res) {
  res.render("pages/payment");
});
// 404 Route
app.get("*", function (req, res) {
  res.render("pages/404");
});

// Listen Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log("Server is running at http://127.0.0.1:%s", `${PORT}`)
);
