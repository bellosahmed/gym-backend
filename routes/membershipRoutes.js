const express = require('express');
const { createMember, updateMembership, getMembership, deleteMembership } = require('../controllers/membershipController');
const { adminRoutes, protectRoutes } = require('../middlewares/protectRoutes');

const router = express.Router();

router.post('/create', protectRoutes, adminRoutes, createMember);
router.patch('/update/:id', protectRoutes, adminRoutes, updateMembership);
router.get('/get', protectRoutes, getMembership);
router.delete('/delete/:id', protectRoutes, adminRoutes, deleteMembership);

module.exports = router;