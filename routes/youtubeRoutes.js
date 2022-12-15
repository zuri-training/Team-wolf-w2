const { Router } = require("express");
var express = require("express");
const YouTube = require("../models/YouTube");
var router = express.Router();
const flash = require("connect-flash");

// GET METHOD
router.get("/youtube", (req, res) => {
  YouTube.find({}, (err, tasks) => {
    res.render("workspace/youtube", { youTube: tasks });
  });
});

// POST METHOD
router.post("/youtube", async (req, res) => {
  const youTube = new YouTube({
    ...req.body,
  });

  try {
    await youTube.save();
    res.redirect("/youtube");
  } catch (err) {
    res.redirect("/youtube");
  }
});
// UPDATE
router
  .route("/youtube/edit/:id")
  .get((req, res) => {
    const id = req.params.id;
    YouTube.find({}, (err, data) => {
      res.render("workspace/youtubeEdit", { youTube: data, idData: id });
    });
  })
  .post((req, res) => {
    const id = req.params.id;
    YouTube.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      (err) => {
        if (err) return res.status(500).send(err);
        res.redirect("/youtube");
      }
    );
  });

//DELETE
router.route("/youtube/remove/:id").get((req, res) => {
  const id = req.params.id;
  YouTube.findByIdAndRemove(id, (err) => {
    if (err) return res.send(500, err);
    res.redirect("/youtube");
  });
});
