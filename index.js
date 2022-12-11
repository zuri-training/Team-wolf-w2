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
// const user = require("./models/user");
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

// Listen Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log("Server is running at http://127.0.0.1:%s", `${PORT}`)
);
