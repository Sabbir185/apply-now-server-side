// external import
const express = require('express');

// internal import
const { 
    createUser, 
    getUsers, 
    getUser, 
    userLogin, 
    deleteUser,
    updateProfile 
} = require('../controllers/user/userController');

const { checkLogin } = require('../middleware/checkLogin');
const { profileImage } = require('../middleware/profileImage');

// app initialization
const router = express.Router();

// routes
router.post('/', createUser);
router.post('/login', userLogin);

router.get('/getAll', getUsers);
router.get('/:id', getUser);

router.patch('/update/:id', profileImage, updateProfile);

router.delete('/:id', deleteUser);


module.exports = router;
