// to install or import npm packages or files
const express = require('express');
const { creategymstore, getgymstore, deletegymstore, updategymstore, getidgymstore } = require('../controllers/gymstoreController.js');
const { protectRoutes, adminRoutes } = require('../middlewares/protectRoutes');

const router = express.Router();

router.post('/create', protectRoutes, adminRoutes, creategymstore); //  route for admin to create
router.get('/get', protectRoutes, getgymstore) // route to get all the items
router.delete('/delete/:id', protectRoutes, adminRoutes, deletegymstore); // // route for admin to delete
router.patch('/update/:id', protectRoutes, adminRoutes, updategymstore); // route for admin to edit
router.get('/get/:id', protectRoutes, getidgymstore); // route to get gym store by id

// to export route
module.exports = router;