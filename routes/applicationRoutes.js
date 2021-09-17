// external import
const express = require('express');

// internal import
const { 
    saveApplication, 
    getApplications, 
    getApplication, 
    deleteApplication,
    getAppByRecruiterId,
    updateStatusApplication
} = require('../controllers/application/applicationController');

const { checkLogin } = require('../middleware/checkLogin')

// app initialization
const router = express.Router();

// routes
router.post('/', checkLogin, saveApplication);

router.get('/', getApplications);

router.get('/:id', getApplication);

router.post('/findByRecruiterId', getAppByRecruiterId);

router.patch('/statusUpdate', updateStatusApplication);

router.delete('/:id', checkLogin, deleteApplication);


// module export
module.exports = router;
