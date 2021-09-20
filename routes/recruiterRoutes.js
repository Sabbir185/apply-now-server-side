// external import
const express = require('express');

// internal import
const { 
    createRecruiter, 
    getRecruiters,
    getRecruiter,
    recruiterLogin,
    deleteRecruiter,
    updateProfile
} = require('../controllers/recruiter/recruiterController');

const { checkLogin } = require('../middleware/checkLogin');
const { profileImage } = require('../middleware/profileImage');

// app initialization
const router = express.Router();

// routes
router.post('/', createRecruiter);
router.post('/login', recruiterLogin);

router.get('/', getRecruiters);
router.get('/:id', getRecruiter);

router.patch('/update/:id', profileImage, updateProfile);

router.delete('/:id', deleteRecruiter);


module.exports = router;
