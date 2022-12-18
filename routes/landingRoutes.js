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
// router.post("/createuser", (req, res) => {
//   createuser.register(
//     new createuser(
//       { username1: req.body.username1 },
//       { fullname: req.body.fullname },
//       { email: req.body.email }
//     ),
//     req.body.password,
//     (err, user) => {
//       if (err) {
//         req.flash("error", "Username already exists");
//         res.send(err);
//         // return res.render("workspace/createuser");
//       }
//       // if (req.body.password == req.body.repeat_password) {
//       passport.authenticate("local")(req, res, () => {
//         req.flash("welcome", "Welcome " + req.body.username1);
//         res.redirect("/landing");
//       });
//     }
//     // }
//   );
//   // res.status(200).json({ message: "Registered successfully", User: User });
// });

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
