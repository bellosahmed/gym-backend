const express = require('express');
const { usersignup, userlogin, userlogout } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', usersignup);
router.post('/login', userlogin);
router.post('/logout', userlogout);

module.exports = router;