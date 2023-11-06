// to install or import npm packages or files
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// To access .env
dotenv.config();

// to create token and cookies
const tokenandcookies = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.jwt_secret, {
        expiresIn: '4d' // this will expire in 4 days after user is logged in
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days
        sameSite: "strict" // CSRF
    });

    return token;
};

// to export files
module.exports = { tokenandcookies };