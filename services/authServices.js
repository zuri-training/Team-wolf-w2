const JWT = require("jsonwebtoken");
const resetUser = require("../models/resetUser");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const signup = async (data) => {
  try{ 
    let user = await resetUser.findOne({ email: data.email });
    if (user) {
      throw new Error("Email already exist");
    }
    user = new User(data);
    const token = JWT.sign({ id: user._id }, JWTSecret);
    await user.save();
    return (data = {
      userId: user._id,
      email: user.email,
      name: user.name,
      token: token,
    });
  }
  catch(error){
  res.status(500).json({
      success:false,
      message: 'internal server error',
      error: error.message
  })
  }

};

const requestPasswordReset = async (email) => {
  try {
    const user = await resetUser.findOne({ email });
  if (!user) {
    throw new Error("User does not exist");
  }

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
  sendEmail(
    user.email,
    "Password Reset Request",
    { name: user.name, link: link },
    "./template/requestResetPassword.handlebars"
  );
  return link;
  } catch (error) {
     error.message
  }
  
};

const resetPassword = async (userId, token, password) => {
  try {
    let passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token ");
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error("invalid or expired password reset token ");
  }
  const hash = await bcrypt.hash(password, Number(bcryptSalt));
  await resetUser.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );
  const user = await User.findById({ _id: userId });
  sendEmail(
    user.email,
    "Pasword Reset Successfully",
    {
      name: user.name,
    },
    "./template/resetPassword.handlebars"
  );
  await passwordResetToken.deleteOne();
  return true;
  } catch (error) {
    res.status(500).json({
      success:false,
      message: 'internal server error',
      error: error.message
  })
  }
};

module.exports = { signup, resetPassword, requestPasswordReset };
