// to install or import npm packages or files
const express = require('express');
const { userProfile, updateProfile, deleteUser, getAllUsersExceptAdmin, usercreated } = require('../controllers/userController');
const { protectRoutes, adminRoutes } = require('../middlewares/protectRoutes');
const user = require('../models/user');

const router = express.Router();

router.get('/profile/:id', protectRoutes, userProfile); //Route to get user profile by ID
router.patch('/update/:id', protectRoutes, updateProfile); // Route to edit user profile
router.delete('/delete/:id', protectRoutes, deleteUser); // Route for user to delete his account
router.get('/users', protectRoutes, adminRoutes, getAllUsersExceptAdmin); // Route for admin to get all user
router.get('/createduser', protectRoutes, adminRoutes, usercreated)

// to export router
module.exports = router;