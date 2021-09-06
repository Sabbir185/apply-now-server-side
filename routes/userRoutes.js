// external import
const express = require('express');

// internal import
const { createUser } = require('../controllers/user/userController');
const { checkLogin } = require('../middleware/checkLogin')

// app initialization
const router = express.Router();

// routes
router.post('/', createUser);

// router.post('/login', adminLogin);

// router.get('/', getAllAdmin);


module.exports = router;
