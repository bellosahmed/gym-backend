// to install or import npm packages or files
const express = require('express');
const { usersignup, userlogin, userlogout, verifyuser, forgotpass, resetpass } = require('../controllers/authController');
const { isresetvalid } = require('../middlewares/protectRoutes');

const router = express.Router();

router.post('/signup', usersignup); // for user to sign
router.post('/login', userlogin); // for user to login
router.post('/logout', userlogout); // for user to logout
//router.post('/forgotpassword', forgotpassword);
//router.post('/resetpassword/:resetToken', resetPassword)
router.post('/verify', verifyuser); // verify user through otp
router.post('/forgotpass', forgotpass); // send a link to the user email
router.post('/resetpass', isresetvalid, resetpass); // to reset password


// to export router
module.exports = router;