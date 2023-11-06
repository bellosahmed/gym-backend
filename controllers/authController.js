//install npm packages or files
const User = require('../models/user');
const { tokenandcookies } = require('../utilis/jwtandcookies');
const jwt = require('jsonwebtoken');

//Signup User
const usersignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ $or: [{ username }] }); // find user by username 

        if (user) {
            return res.status(400).json({ message: 'User exists' }); // can't have the same with other user
        }

        const newUser = new User({ // to create user
            username,
            email,
            password
        });

        await newUser.save();// is saved in the database

        tokenandcookies(newUser._id, res); // will create the cookies of the user

        res.status(201).json({ // if registered will show the following as the output
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        });
    } catch (error) {
        // if there is error
        console.error('Error in signup:', error);
        res.status(500).json({ message: error.message });
    }
};

//Login User
const userlogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }); // find user by username

        if (!user) {
            return res.status(400).json({ message: 'User not exist' }); // if user does not exist 
        } else {

            tokenandcookies(user._id, res);

            res.status(200).json({ // if loggedin will return the output
                _id: user._id,
                username: user.username,
                password: user.password
            });
        }
    } catch (error) {
        // if there is error
        res.status(500).json({ message: error.message });
        console.log("Error in LoginUser: ", error.message);
    }
};

//Logout 
const userlogout = async (req, res) => {
    try {
        res.cookie("jwt", "", { MaxAge: 1 });
        res.status(200).json({ message: 'User logged out' }); // user to logout
    } catch (error) {
        // if there is error
        res.status(500).json({ message: error.message });
        console.log("Error in Logout: ", error.message);
    }
};

// forgot password


// reset password


// should i include otp to improve security

// to export files
module.exports = { usersignup, userlogin, userlogout };