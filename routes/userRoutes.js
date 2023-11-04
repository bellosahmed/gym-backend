const express = require('express');
const { userProfile, updateProfile, deleteUser, getAllUsersExceptAdmin } = require('../controllers/userController');
const { protectRoutes, adminRoutes } = require('../middlewares/protectRoutes');


const router = express.Router();

router.get('/profile/:id', protectRoutes, userProfile);
router.patch('/update/:id', protectRoutes, updateProfile);
router.delete('/delete/:id', protectRoutes, deleteUser);
router.get('/users', protectRoutes, adminRoutes, getAllUsersExceptAdmin);

module.exports = router;