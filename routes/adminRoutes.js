// external import
const express = require('express');

// internal import
const {adminCreate, getAllAdmin, adminLogin} = require('../controllers/admin/adminController');
const { isAdminAuth } = require('../middleware/admin/isAdminAuth')

// app initialization
const router = express.Router();

// routes
router.post('/', adminCreate);

router.post('/login', adminLogin);

router.get('/', isAdminAuth, getAllAdmin);


module.exports = router;
