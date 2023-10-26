const express = require('express');
const { userProfile, updateProfile, deleteUser } = require('../controllers/userController');
const { protectRoutes } = require('../middlewares/protectRoutes');


const router = express.Router();

router.get('/profile/:username', userProfile);
router.patch('/update/:id', protectRoutes, updateProfile);
router.delete('/delete/:id', protectRoutes, deleteUser);


module.exports = router;