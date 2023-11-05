const User = require('../models/user');
const { tokenandcookies } = require('../utilis/jwtandcookies');
const jwt = require('jsonwebtoken');

//Signup User
const usersignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ $or: [{ username }] });

        if (user) {
            return res.status(400).json({ message: 'User exists' });
        }

        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();

        tokenandcookies(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: error.message });
    }
};

//Login User
const userlogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'User not exist' });
        } else {

            tokenandcookies(user._id, res);

            res.status(200).json({
                _id: user._id,
                username: user.username,
                password: user.password
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in LoginUser: ", error.message);
    }
};

//Logout 
const userlogout = async (req, res) => {
    try {
        res.cookie("jwt", "", { MaxAge: 1 });
        res.status(200).json({ message: 'User logged out' });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in Logout: ", error.message);
    }
};

// forgot password


// reset password



// should i include otp to improve security


module.exports = { usersignup, userlogin, userlogout };