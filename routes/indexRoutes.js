const { Router } = require("express");
var express = require("express");
var router = express.Router();

// Home Route
router.get("/", function (req, res) {
  res.render("pages/home", { currentUser: req.user });
});
// About Us Route
router.get("/aboutus", function (req, res) {
  res.render("pages/aboutus");
});
// Dashboard Route
router.get("/dashboard", isLoggedIn, function (req, res) {
  res.render("pages/dashboard", { currentUser: req.user });
});
router.get("/templates", isLoggedIn, function (req, res) {
  res.render("pages/templates");
});

router.get("/payment", isLoggedIn, function (req, res) {
  res.render("pages/payment");
});
router.get("/sidebar", isLoggedIn, function (req, res) {
  res.render("pages/sidebar");
});
// 404 Route
router.get("*", isLoggedIn, function (req, res) {
  res.render("pages/404");
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
