const {Router} = require ("express");

 const { 
  signUpController,
  requestResetPassword,
  resetPasswordController,

 } = require ("../controller/authController")
const router = Router()


router.post('/register', signUpController),
router.post('/requestresetpassword',  requestResetPassword )
router.post('/resetpasssword', resetPasswordController )

module.exports = router