const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const tokenandcookies = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.jwt_secret, {
        expiresIn: '4d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days
        sameSite: "strict" // CSRF
    });

    return token;
};


module.exports = { tokenandcookies };