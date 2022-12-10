const { Schema, model } = require("mongoose");
const bcrpt = require ("bcryptjs");
const bcryptSalt =process.env.BCRYPRT_SALT

const userSchema = new Schema(
  {
    Name: {
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
    // resetLink: {
    //   data: String,
    //   default: ''
    // },
    refreshToken: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")){
    return next();
  }
  const hash = await bcryptSalt.hash(this.password, Number(bcryptSalt));
  this.password = hash;
  next()
});

const userModel = model("User", userSchema);

module.exports = userModel;
