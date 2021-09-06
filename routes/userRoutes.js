// external import
const express = require('express');

// internal import
const { createUser, getUsers, getUser, userLogin } = require('../controllers/user/userController');
const { checkLogin } = require('../middleware/checkLogin')

// app initialization
const router = express.Router();

// routes
router.post('/', createUser);
router.post('/login', userLogin);

router.get('/getAll', getUsers);
router.get('/:id', getUser);


module.exports = router;
