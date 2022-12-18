var mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

var createuserSchema = new mongoose.Schema({
  fullname: String,
  username1: String,
  email: String,
  provider: String,
  password: String,
  salt: String,
});
createuserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("createuser", createuserSchema);
