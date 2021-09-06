// external import
const express = require('express');

// internal import
const { 
    createRecruiter, 
    getRecruiters,
    getRecruiter,
    recruiterLogin,
    deleteRecruiter
} = require('../controllers/recruiter/recruiterController');

const { checkLogin } = require('../middleware/checkLogin')

// app initialization
const router = express.Router();

// routes
router.post('/', createRecruiter);
router.post('/login', recruiterLogin);

router.get('/', getRecruiters);
router.get('/:id', getRecruiter);

router.delete('/:id', deleteRecruiter);


module.exports = router;
