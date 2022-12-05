const express = require("express");
const connect = require("./config/database");

connect();

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Our Website");
});

app.listen(PORT, () => console.log(`server on port ${PORT}`));
