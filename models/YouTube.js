const mongoose = require("mongoose");
const youTubeSchema = new mongoose.Schema({
  homeTitle: {
    type: String,
    default: 'Unlimited Movies TV Shows and More.',
    required: false,
  },
  homeSubTitle1: {
    type: String,
    default: 'Watch anywhere and cancel anytime.',
    required: false,
  },
  homeSubTitle2: {
    type: String,
    default: 'Ready to watch? Enter your email to create or restart your membership.',
    required: false,
  },
  sectionTitle: {
    type: String,
    default: 'Enjoy on your TV.',
    required: false,
  },
  sectionSubTitle: {
    type: String,
    default: 'Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more',
    required: false,
  },
  summary:{
    type: String,
    default: 'What is netflix?',
    required: false,
  },
  detail:{
    type: String,
    default: 'netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices',
    required: false,
  },
  footer1: {
    type: String,
    default: 'FAQ',
    required: false,
  },
  footer2: {
    type: String,
    default: 'Help Centre',
    required: false,
  },
  footer3: {
    type: String,
    default: 'Account',
    required: false,
  },
  footer4: {
    type: String,
    default: 'Media Centre',
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("YouTube", youTubeSchema);