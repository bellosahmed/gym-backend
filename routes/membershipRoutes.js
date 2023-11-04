const express = require('express');
const { createMember, updateMembership, getMembership, deleteMembership, getidmembership } = require('../controllers/membershipController');
const { adminRoutes, protectRoutes } = require('../middlewares/protectRoutes');


const router = express.Router();

router.post('/create', protectRoutes, adminRoutes, createMember);
router.patch('/update/:id', protectRoutes, adminRoutes, updateMembership);
router.get('/get', protectRoutes, getMembership);
router.delete('/delete/:id', protectRoutes, adminRoutes, deleteMembership);
router.get('/get/:id', protectRoutes, getidmembership);

module.exports = router;