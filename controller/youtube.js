// GET METHOD
app.get("/youtube", (req, res) => {
  YouTube.find({}, (err, tasks) => {
    res.render("youtube.ejs", { youTube: tasks });
  });
});

// POST METHOD
app.post("/youtube", async (req, res) => {
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
app
  .route("/youtube/edit/:id")
  .get((req, res) => {
    const id = req.params.id;
    YouTube.find({}, (err, data) => {
      res.render("youtubeEdit.ejs", { youTube: data, idData: id });
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
app.route("/youtube/remove/:id").get((req, res) => {
  const id = req.params.id;
  YouTube.findByIdAndRemove(id, (err) => {
    if (err) return res.send(500, err);
    res.redirect("/youtube");
  });
});
