const mongoose = require("mongoose");
const landingModelSchema = new mongoose.Schema({
  navItems: {
    type: String,
    default: "Home",
    required: false,
  },
  homeTitle: {
    type: String,
    default: "Earn money by displaying your work to us.",
    required: false,
  },
  homeSubTitle: {
    type: String,
    default:
      "Create your website for free and sell physical or digital products to anyone online. No code needed. It only takes a few minutes.",
    required: false,
  },
  byIndustry: {
    type: String,
    default: "By Industry",
    required: false,
  },
  byFeatures: {
    type: String,
    default: "By Features",
    required: false,
  },
  section1Title: {
    type: String,
    default: "Tested and trusted by 100k Creators",
    required: false,
  },
  section1para: {
    type: String,
    default:
      "Thousands of content creators, influencers, digital creators, photographers and many more users to create an organised digital presence.",
    required: false,
  },
  aboutTitle: {
    type: String,
    default:
      "Welcome to weCode.com, our goal is to democratize publishing and eCommerce one website at a time.",
    required: false,
  },
  aboutPara: {
    type: String,
    default:
      "Welcome to weCode.com, our goal is to democratize publishing and eCommerce one website at a time.",
    required: false,
  },
  aboutPara2: {
    type: String,
    default:
      "We are here to help you build a website for your business and to share ideas as well. Note that when you share your ideas with us, you will get paid.",
    required: false,
  },
  button: {
    type: String,
    required: false,
    default: "Get Started",
  },
  footer1: {
    type: String,
    default: "Domain Names",
    required: false,
  },
  footer2: {
    type: String,
    default: "Overview",
    required: false,
  },
  footer3: {
    type: String,
    default: "Public Code",
    required: false,
  },
  footer4: {
    type: String,
    default: "About",
    required: false,
  },
  footer5: {
    type: String,
    default: "Learn",
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("LandingModel", landingModelSchema);
