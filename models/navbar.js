var mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

var navbarSchema = new mongoose.Schema({
  nav: String,
  nav2: String,
});
navbarSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Navbar", navbarSchema);
