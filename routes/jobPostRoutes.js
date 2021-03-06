// external import
const express = require('express');

// internal import
const { 
    createPost, 
    getPosts, 
    getPost, 
    deletePost,
    updateJobPost,
    getPostByTitle,
    titleAndJobType,
    paginationPosts,
    paginationPostByTitle 
} = require('../controllers/jobPost/jobPostController');

const { checkLogin } = require('../middleware/checkLogin')

// app initialization
const router = express.Router();

// routes
router.post('/',checkLogin, createPost);

router.get('/', getPosts);

router.get('/:id', getPost);

router.get('/popularPost/:title', getPostByTitle);

router.post('/search', titleAndJobType);

router.post('/jobs', paginationPosts);

router.post('/popular/:title', paginationPostByTitle);

router.patch('/:id', checkLogin, updateJobPost);

router.delete('/:id', checkLogin, deletePost);


// module export
module.exports = router;
