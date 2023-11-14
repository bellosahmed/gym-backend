// to install or import npm packages or files
const express = require('express');
const { usersignup, userlogin, userlogout, forgotpassword, userotp } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', usersignup); // for user to sign
router.post('/login', userlogin); // for user to login
router.post('/logout', userlogout); // for user to logout
router.post('/forgotpassword', forgotpassword); //when user forgot password
router.post('/otp', userotp);

// to export router
module.exports = router;