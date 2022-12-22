var express = require("express");
var router = express.Router();
var createuser = require("../models/createuser");
var Navbar = require("../models/navbar");
var passport = require("passport");
var flash = require("connect-flash");
const LandingModel = require("../models/LandingModel");

// Route
router.get("/createuser", (req, res) => {
  res.render("workspace/url");
});
router.get("/home", (req, res) => {
  Navbar.find({}, (err, data) => {
    res.render("workspace/home", { Navbar: data });
  });
});

router.get("/navform", (req, res) => {
  res.render("workspace/navform");
});
router.post("/navform", async (req, res) => {
  const nav = new Navbar({
    ...req.body,
  });

  try {
    await nav.save();
    res.redirect("/home");
  } catch (err) {
    res.redirect("/home");
  }
});
router.get("/edit", (req, res) => {
  res.render("workspace//edit");
});
router.put("/edit", async (req, res) => {
  try {
    Navbar.findByIdAndUpdate(req.body, { new: true }).then((Navbar) => {
      if (!Navbar) {
        return res.status(404).send({
          message: "Navbar not found with id ",
        });
      }
      res.redirect("/home");
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Old Routes
router.get("/landing", (req, res) => {
  LandingModel.find({}, (err, data) => {
    res.render("workspace/home", { LandingModel: data });
  });
});

// POST METHOD
router.post("/land", async (req, res) => {
  const landing = new LandingModel({
    ...req.body,
  });

  try {
    await landing.save();
    res.redirect("/landing");
  } catch (err) {
    res.redirect("/landing");
  }
});

// Update or edit route

// ///////////////
router
  .route("/landing/edit/:id")
  .get((req, res) => {
    const id = req.params.id;
    LandingModel.find({}, (err, data) => {
      res.render("workspace/landingEdit", {
        landingModel: data,
        idData: id,
      });
    });
  })
  .post((req, res) => {
    const id = req.params.id;
    LandingModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      (err) => {
        if (err) return res.status(500).send(err);
        res.redirect("/landing");
      }
    );
  });

// DELETE
router.route("/landing/remove/:id").get((req, res) => {
  const id = req.params.id;
  LandingModel.findByIdAndRemove(id, (err) => {
    if (err) return res.send(500, err);
    res.redirect("/landing");
  });
});

router.get("/template", isLoggedIn, function (req, res) {
  res.render("workspace/landing", { Navbar: req.body });
});

router.get("/navbar", isLoggedIn, function (req, res) {
  res.render("workspace/navbar", { Navbar: req.body });
});
router.post("/navbar", (req, res) => {
  var navbar = new Navbar(req.body);
  var header = document.getElementById("nav1");

  header.addEventListener("click", () => {
    var item = prompt("Change item");
    header.textContent == item;
  });
  navbar.save((err) => {
    if (err) {
      sendStatus(500);
      console.log(err);
    } else req.flash("success, you have added navbar items");
    // res.status(200).json({ message: "Thanks" });
    res.redirect("/template");
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
