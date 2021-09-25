// external import
const express = require('express');

// internal import
const {
    adminCreate, 
    getAllAdmin, 
    adminLogin, 
    getAdmin
} = require('../controllers/admin/adminController');

const { checkLogin } = require('../middleware/checkLogin');

// app initialization
const router = express.Router();

// routes
router.post('/', checkLogin, adminCreate);

router.post('/login', adminLogin);

router.get('/', getAllAdmin);

router.get('/:id', getAdmin);



module.exports = router;
