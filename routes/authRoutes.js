// to install or import npm packages or files
const express = require('express');
const { usersignup, userlogin, userlogout } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', usersignup); // for user to sign
router.post('/login', userlogin); // for user to login
router.post('/logout', userlogout); // for user to logout

// to export router
module.exports = router;