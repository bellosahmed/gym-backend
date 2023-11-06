// to install or import npm packages or files
const express = require('express');
const { createMember, updateMembership, getMembership, deleteMembership, getidmembership } = require('../controllers/membershipController');
const { adminRoutes, protectRoutes } = require('../middlewares/protectRoutes');

const router = express.Router();

router.post('/create', protectRoutes, adminRoutes, createMember); // route for admin to create member
router.patch('/update/:id', protectRoutes, adminRoutes, updateMembership); // route for admin to edit membership plan
router.get('/get', protectRoutes, getMembership); // route for user to get all the membership paln
router.delete('/delete/:id', protectRoutes, adminRoutes, deleteMembership); // route for admin to delete membership plan
router.get('/get/:id', protectRoutes, getidmembership); // route for user to get product by id

// to export router
module.exports = router;