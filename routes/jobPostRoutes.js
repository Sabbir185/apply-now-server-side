// external import
const express = require('express');

// internal import
const { 
    createPost, 
    getPosts, 
    getPost, 
    deletePost 
} = require('../controllers/jobPost/jobPostController');

const { checkLogin } = require('../middleware/checkLogin')

// app initialization
const router = express.Router();

// routes
router.post('/',checkLogin, createPost);

router.get('/', getPosts);

router.get('/:id', getPost);

router.delete('/:id', checkLogin, deletePost);


// module export
module.exports = router;
