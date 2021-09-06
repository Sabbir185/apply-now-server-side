// external import
const express = require('express');

// internal import
const { 
    createRecruiter, 
    getRecruiters,
    getRecruiter
} = require('../controllers/recruiter/recruiterController');

const { checkLogin } = require('../middleware/checkLogin')

// app initialization
const router = express.Router();

// routes
router.post('/', createRecruiter);

// router.post('/login', adminLogin);

router.get('/', getRecruiters);

router.get('/:id', getRecruiter);


module.exports = router;
