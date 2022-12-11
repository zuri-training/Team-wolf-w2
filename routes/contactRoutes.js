const { Router } = require("express");
var express = require("express");
var router = express.Router();
var Message = require("../models/contact");

// Contacts Route
router.get("/contacts", isLoggedIn, function (req, res) {
  res.render("pages/contacts");
});
router.post("/contacts", (req, res) => {
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
// isLoggedin Function
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please Login First");
  res.redirect("/Login");
}
module.exports = router;
