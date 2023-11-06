// import npm packages
const User = require('../models/user');
const jwt = require('jsonwebtoken');


//Protect Routes
const protectRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) return res.status(401).json({ message: "Unauthorized" }); // no token will show Unauthorized if the token does match

        const decoded = jwt.verify(token, process.env.jwt_secret); // will verify token or jwt of the user

        const user = await User.findById(decoded.userId).select("-password"); // will find userId expect password

        if (!user) {
            return res.status(401).json({ message: "User not found" }); // only when sign in will show user
        }

        req.user = user; // will return user that is signed in

        // to return in terminal if user is sign in 
        // console.log("Decoded Token:", decoded);
        // console.log("User Object:", req.user);

        next();
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
