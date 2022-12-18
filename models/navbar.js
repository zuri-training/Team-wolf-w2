var mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

var navbarSchema = new mongoose.Schema({
  nav1: String,
  nav2: String,
  nav3: String,
  nav4: String,
});
navbarSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Navbar", navbarSchema);
