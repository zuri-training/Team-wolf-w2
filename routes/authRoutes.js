const { Router } = require("express");
var express = require("express");
var router = express.Router();
var User = require("../models/User"),
  passport = require("passport");

// Sign Up Route
router.get("/register", function (req, res) {
  res.render("pages/SignUp");
});
router.post("/register", (req, res) => {
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
        return res.render("pages/SigUp");
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
  res.redirect("/");
  // res.render("pages/success");
});
// Login Route
router.get("/login", function (req, res) {
  res.render("pages/Login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/Login",
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
            res.redirect("/dashboard");
          }
        }
      );
    }
  });
});
// Reset Password Route
router.get("/resetpassword", (req, res) => res.render("pages/resetpassword"));
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

module.exports = router;
