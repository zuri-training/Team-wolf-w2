var express = require("express"),
  mongoose = require("mongoose"),
  path = require("path"),
  favicon = require("static-favicon"),
  morgan = require("morgan"),
  cookieParser = require("cookie-parser"),
  cookieSession = require("cookie-session"),
  passport = require("passport"),
  flash = require("connect-flash"),
  User = require("./models/User"),
  Message = require("./models/contact"),
  YouTube = require("./models/YouTube"),
  bodyParser = require("body-parser"),
  http = require("http"),
  https = require("https"),
  fs = require("fs"),
  localStrategy = require("passport-local").Strategy,
  passportLocalMongoose = require("passport-local-mongoose");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
var authRoutes = require("./routes/authRoutes"),
  contactRoutes = require("./routes/contactRoutes"),
  // youtubeRoutes = require("./routes/youtubeRoutes"),
  indexRoutes = require("./routes/indexRoutes");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

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
// var cookies = cookieSession({
//   name: "abc123",
//   secret: "mysecret",
//   maxage: 10 * 60 * 1000,
// });
// app.use(cookies);
app.use(favicon());
app.use(morgan());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
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
//   new LocalStrategy(function (username, password, done) {
//     return User.validateUser(username, password, done);
//   })
// );

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });
// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.welcome = req.flash("welcome");
  next();
});
//Error handling after everything else
// app.use(logErrors); //log all errors
// app.use(clientErrorHandler); //special handler for xhr
// app.use(errorHandler); //basic handler

// Routes Use
app.use("/api/v1", userRoutes);
app.use(authRoutes);
app.use(contactRoutes);
// app.use(youtubeRoutes);
app.use(indexRoutes);

// ===============
// ROUTES
// ===============

// Listen Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log("Server is running at http://127.0.0.1:%s", `${PORT}`)
);
// app.listen(process.env.PORT);
