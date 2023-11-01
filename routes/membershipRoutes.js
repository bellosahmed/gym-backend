const express = require('express');
const { createMember } = require('../controllers/membershipController');
const { adminRoutes, protectRoutes } = require('../middlewares/protectRoutes');

const router = express.Router();

router.post('/create', protectRoutes, adminRoutes, createMember);


module.exports = router;