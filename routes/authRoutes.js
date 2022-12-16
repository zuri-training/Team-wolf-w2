const { Router } = require("express");
var express = require("express");
var router = express.Router();
var User = require("../models/User"),
  passport = require("passport");
const flash = require("connect-flash");
require("../pass");
// Sign Up Route
router.get("/register", function (req, res) {
  res.render("pages/SignUp");
});
router.post("/register", (req, res) => {
  User.register(
    new User(
      { username: req.body.username },
      { fullname: req.body.fullname },
      { email: req.body.email },
      { password: req.body.retypepassword }
    ),
    req.body.password,
    (err, user) => {
      if (err) {
        req.flash("error", "Username already exists");
        return res.render("pages/SignUp");
      }
      // if (req.body.password == req.body.repeat_password) {
      passport.authenticate("local")(req, res, () => {
        req.flash("welcome", "Welcome " + req.body.username);
        res.redirect("/dashboard");
      });
    }
    // }
  );
  // res.status(200).json({ message: "Registered successfully", User: User });
});
// Google Login Route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  function (req, res) {
    res.redirect("/success");
  }
);
router.get("/failed", (req, res) => {
  // res.send("Failed")
  res.render("pages/failed");
});
router.get("/success", isLoggedIn, (req, res) => {
  // res.redirect("/");
  res.render("pages/success", { currentUser: req.user });
});
// Login Route
router.get("/login", function (req, res) {
  res.render("pages/Login");
});
router.post(
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

// Change Password Route
router.get("/changepassword", (req, res) => res.render("pages/changepassword"));
router.post("/changepassword", function (req, res) {
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
            req.flash("success", "Please login again");
            res.redirect("/login");
          }
        }
      );
    }
  });
});
// Reset Password Route
// router.get("/requestresetpassword", (req, res) =>
//   res.render("pages/requestresetpassword")
// );
router.get("/forgot", function (req, res) {
  if (req.isAuthenticated()) {
    //user is alreay logged in
    return res.redirect("/");
  }

  //UI with one input for email
  res.render("pages/forgot");
});
router.post("/forgot", function (req, res) {
  if (req.isAuthenticated()) {
    //user is alreay logged in
    return res.redirect("/");
  }
  User.forgot(req, res, function (err) {
    if (err) {
      req.flash("error", err);
    } else {
      req.flash("success", "Please check your email for further instructions.");
    }
    res.redirect("/");
  });
});

router.get("/reset/:token", function (req, res) {
  if (req.isAuthenticated()) {
    //user is alreay logged in
    return res.redirect("/");
  }
  var token = req.params.token;
  User.checkReset(token, req, res, function (err, data) {
    if (err) req.flash("error", err);

    //show the UI with new password entry
    res.render("pages/reset");
  });
});

router.post("/reset", function (req, res) {
  if (req.isAuthenticated()) {
    //user is alreay logged in
    return res.redirect("/");
  }
  User.reset(req, res, function (err) {
    if (err) {
      req.flash("error", err);
      return res.redirect("/reset");
    } else {
      req.flash(
        "success",
        "Password successfully reset.  Please login using new password."
      );
      return res.redirect("/login");
    }
  });
});
// router.get("/resetpassword", (req, res) => res.render("pages/resetpassword"));
// Logout Route
router.get("/logout", function (req, res) {
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
  res.redirect("/Login");
}
// Reset Password Function
function generateToken() {
  var buf = new Buffer(16);
  for (var i = 0; i < buf.length; i++) {
    buf[i] = Math.floor(Math.random() * 256);
  }
  var id = buf.toString("base64");
  return id;
}

module.exports = router;
