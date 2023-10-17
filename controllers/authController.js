const User = require('../models/user');
const { tokenandcookies } = require('../utilis/jwtandcookies');

//Signup User
const usersignup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ $or: [{ username }] });

        if (user) {
            return res.status(400).json({ message: 'User exists' });
        }

        const newUser = new User({
            username,
            password
        });

        await newUser.save();

        tokenandcookies(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            password: newUser.password
        });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: error.message });
    }
};

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

const userlogout = async (req, res) => {
    try {
        res.cookie("jwt", "loggedout",);
        res.status(200).json({ message: 'User logged out' });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in Logout: ", error.message);
    }
};


module.exports = { usersignup, userlogin, userlogout };