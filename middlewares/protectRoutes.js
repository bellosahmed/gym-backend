// import npm packages
const { isValidObjectId } = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Resttoken = require('../models/resettoken');


const signToken = id => {
    return jwt.sign({ id }, process.env.jwt_secret, {
        expiresIn: process.env.jwt_expires_in
    });
};

// Improve protect Routes
const protectRoutes = async (req, res, next) => {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ msg: 'Unauthorized! You need to loggin' });
        }

        // console.log(req.headers); to get the token

        const decoded = await jwt.verify(token, process.env.jwt_secret)

        //console.log(decoded); // to get userid

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ msg: 'User not found' });
        }

        //console.log(user);
        req.user = user;
        next();
    } catch (error) {
        console.error('Error in protect:', error.message);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


// Admin Routes 
const adminRoutes = async (req, res, next) => {
    try {
        if (req.user.role == 'admin' || req.user.role == 'super-admin') { // admin is the same as super admin
            next();
        } else {
            res.status(401).json({ message: 'Not allowed, only admin have access' }) // when user try to access the admin file it will show not allowed
        }
    } catch (error) {
        // if there is an error
        res.status(500).json({ message: error.message });
        console.log("Error in admin routes middlewares: ", error.message);
    }
};


// Reset to be valid
const isresetvalid = async (req, res, next) => {
    const { token, id } = req.query
    if (!(token || id)) {
        res.json({ msg: 'Invalid request' });
    }

    if (!isValidObjectId(id)) {
        res.json({ msg: 'Invalid user' });
    }

    const user = await User.findById(id);
    if (!user) {
        res.json({ msg: 'No user found' });
    }

    const resettoken = await Resttoken.findOne({ owner: user._id });
    if (!resettoken) {
        res.json({ msg: 'Reset token not found' });
    }

    req.user = user;
    next();
};

// export files
module.exports = { protectRoutes, adminRoutes, signToken, isresetvalid };
