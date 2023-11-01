const User = require('../models/user');
const jwt = require('jsonwebtoken');


//Protect Routes
const protectRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.jwt_secret);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        console.log("Decoded Token:", decoded);
        console.log("User Object:", req.user);

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in protectRoute: ", error.message);
    }
};


// Admin Routes 
const adminRoutes = async (req, res, next) => {
    try {
        if (req.user.role == 'admin' || req.user.role == 'super-admin') {
            next();
        } else {
            res.status(401).json({ message: 'not allowed' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in admin routes middlewares: ", error.message);
    }
};


module.exports = { protectRoutes, adminRoutes };
