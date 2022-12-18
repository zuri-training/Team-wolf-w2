const { Router } = require("express");
var express = require("express");
var router = express.Router();
const flash = require("connect-flash");
const youTube = require("../models/YouTube");

// Home Route
router.get("/", function (req, res) {
  res.render("pages/home", { currentUser: req.user });
});
// About Us Route
router.get("/aboutus", isLoggedIn, function (req, res) {
  res.render("pages/aboutus");
});
// Dashboard Route
router.get("/dashboard", isLoggedIn, function (req, res) {
  res.render("pages/dashboard", { currentUser: req.user });
});
router.get("/templates", isLoggedIn, function (req, res) {
  res.render("pages/templates", { currentUser: req.user });
});
router.get("/youtube", function (req, res) {
  res.render("workspace/youtube");
});
router.get("/templatenew", isLoggedIn, function (req, res) {
  res.render("workspace/templatenew", { currentUser: req.user });
});
router.get("/mysites", function (req, res) {
  res.render("pages/mysites", { currentUser: req.user });
});
router.get("/infotemplate", isLoggedIn, function (req, res) {
  res.render("pages/infotemplate", { currentUser: req.user });
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
// router.get("/template", isLoggedIn, function (req, res) {
//   res.render("workspace/landing", { currentUser: req.user });
// });
router.get("/subscription", function (req, res) {
  res.render("pages/subscription", { currentUser: req.user });
});
router.get("/element", function (req, res) {
  res.render("pages/element", { currentUser: req.user });
});
router.get("/insight", function (req, res) {
  res.render("pages/insights", { currentUser: req.user });
});
router.get("/preview", function (req, res) {
  res.render("pages/preview", { currentUser: req.user });
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
