const express = require('express');
const { creategymstore, getgymstore, deletegymstore, updategymstore, getidgymstore } = require('../controllers/gymstoreController.js');
const { protectRoutes, adminRoutes } = require('../middlewares/protectRoutes');

const router = express.Router();

router.post('/create', protectRoutes, adminRoutes, creategymstore);
router.get('/get', protectRoutes, getgymstore)
router.delete('/delete/:id', protectRoutes, adminRoutes, deletegymstore);
router.patch('/update/:id', protectRoutes, adminRoutes, updategymstore);
router.get('/get/:id', protectRoutes, getidgymstore);

module.exports = router;