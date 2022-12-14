var mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

var messageSchema = new mongoose.Schema({
  names: String,
  email: String,
  subject: String,
  message: String,
});
messageSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Message", messageSchema);
