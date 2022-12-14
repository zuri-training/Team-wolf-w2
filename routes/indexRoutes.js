const { Router } = require("express");
var express = require("express");
var router = express.Router();
const flash = require("connect-flash");

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
  res.render("pages/templates", { currentUser: req.user });
});

router.get("/payment", isLoggedIn, function (req, res) {
  res.render("pages/payment", { currentUser: req.user });
});
router.get("/sidebar", isLoggedIn, function (req, res) {
  res.render("pages/sidebar");
});
router.get("/settings", (req, res) => {
  res.render("pages/settings", { currentUser: req.user });
});

router.get("/subscription", function (req, res) {
  res.render("pages/subscription", { currentUser: req.user });
});

router.get("/template", function (req, res) {
  res.render("pages/template", { currentUser: req.user });
});

router.get("/createtemplate", isLoggedIn, function (req, res) {
  res.render("pages/createtemplate", { currentUser: req.user });
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
