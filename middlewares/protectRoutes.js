// import npm packages
const User = require('../models/user');
const jwt = require('jsonwebtoken');


//Protect Routes
const protectRoutes = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        //check for token
        if (!token) { return res.status(401).json({ status: false, msg: "No token, authorization denied" }) }
        else {
            //verify token
            const decoded = jwt.verify(token, process.env.jwtSecret);
            //add user from payload
            req.user = decoded;
            next();
        };
    } catch (error) {
        // if there is an error
        res.status(500).json({ message: error.message });
        console.log("Error in protectRoute: ", error.message);
    }
};


// Admin Routes 
const adminRoutes = async (req, res, next) => {
    try {
        if (req.user.role == 'admin' || req.user.role == 'super-admin') { // admin is the same as super admin
            next();
        } else {
            res.status(401).json({ message: 'not allowed' }) // when user try to access the admin file it will show not allowed
        }
    } catch (error) {
        // if there is an error
        res.status(500).json({ message: error.message });
        console.log("Error in admin routes middlewares: ", error.message);
    }
};

// export files
module.exports = { protectRoutes, adminRoutes };
