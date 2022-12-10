const { signup, requestPasswordReset, resetPassword} = require("../services/authServices");

const signUpController = async (req, res, next) =>
{
  try {
    const signUpService = await signup(req.body);
  return res.json(signUpService)
  } catch ( error) {
    next(error)
  }
  
};


const requestResetPassword = async ( req, res, next) =>{
  try {
    const requestPasswordResetService = await requestPasswordReset(
      req.body.email
    );
    return res.json(requestPasswordResetService);
  } catch (error ) {
    next(error)
  }
};


const resetPasswordController = async (req, res, next) => { 
  try {
    const resetPasswordService = await resetPassword(
      req.body.userId,
      req.body.token,
      req.body.password
    );
    return res.json(resetPasswordService);
  } catch (error) {
     next (error)
  }
  
};

module.exports = { 
  signUpController,
  requestResetPassword,
  resetPasswordController,

 }

