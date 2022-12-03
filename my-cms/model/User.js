const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      require: true,
      unique: true,
      minlenght: 3,
      maxlenght: 9,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    userType: {
      type: String,
      enum: ["staff", "businessOwner", "individual"],
      default: "individual",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    refreshToken: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const userModel = model("User", userSchema);

module.exports = userModel;
