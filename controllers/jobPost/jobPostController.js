// internal import
const JobPost = require('../../models/JobPostModel');
const Recruiter = require('../../models/recruiterModel');


// create post
exports.createPost = async (req, res) => {

    try{
        const newPost = await JobPost.create({
            ...req.body,
            recruiter: req.user.id
        });

        await Recruiter.updateOne({ _id: req.user.id}, {$push: {jobPost: newPost._id}});

        res.status(200).json({
            status: 'Post created successfully!',
            data: newPost
        })

    }catch(err){
        res.status(400).json({
            status: 'failed!',
            message: err.message
        })
    }
}


// get all post
exports.getPosts = async (req, res) => {
    try{
        const posts = await JobPost.find().select("-__v")
        
        res.status(200).json({
            status: 'OK',
            totalPost: posts.length,
            data: posts,
        })

    }catch(err){
        res.status(500).json({
            status: 'Failure!',
            message: err.message
        })
    }
}


// get post by id
exports.getPost = async (req, res) => {
    try{
        const post = await JobPost.find({ _id: req.params.id }).populate("recruiter").select("-__v")
        
        res.status(200).json({
            status: 'OK',
            data: post,
        })

    }catch(err){
        res.status(500).json({
            status: 'Failure!',
            message: err.message
        })
    }
}


// get post by title
exports.getPostByTitle = async (req, res) => {
    try{
        // `${popularPost}`
        const popularPost = req.params.title;
        const post = await JobPost.find({title : {$regex: `${popularPost}` }})
        .populate("recruiter","-password -__v -jobPost").select("-__v")
        
        res.status(200).json({
            status: 'OK',
            data: post,
        })

    }catch(err){
        res.status(500).json({
            status: 'Failure!',
            message: err.message
        })
    }
}


// search by title & jobType
exports.titleAndJobType = async (req, res) => {
    try{
        const {title, jobType} = req.body;
        const post = await JobPost.find({$and: [{title : {$regex: `${title}` }}, {jobType: `${jobType}`}] })
        .populate("recruiter","-password -__v -jobPost").select("-__v")
        
        res.status(200).json({
            status: 'OK',
            data: post,
        })

    }catch(err){
        res.status(500).json({
            status: 'Failure!',
            message: err.message
        })
    }
}


// update post by id
exports.updateJobPost = async (req, res) => {
    try{
        const checkPost = await  JobPost.findById({ _id: req.params.id })
        if(!checkPost){
            return res.status(400).json({
                message: 'Post Not Found!',
            });
        }

        const post = await JobPost.updateOne({ _id: req.params.id },{
            isApproved: req.body.isApproved
        });
        
        res.status(200).json({
            status: 'post updated successfully!',
            data: post,
        })

    }catch(err){
        res.status(500).json({
            status: 'Failure!',
            message: err.message
        })
    }
}


// delete post by id
exports.deletePost = async (req, res) => {
    try{
        const checkPost = await  JobPost.findById({ _id: req.params.id })
        if(!checkPost){
            return res.status(400).json({
                message: 'Post Not Found!',
            });
        }

        const post = await JobPost.findByIdAndDelete({ _id: req.params.id });
        
        res.status(200).json({
            status: 'post deleted successfully!',
            delete: true,
        })

    }catch(err){
        res.status(500).json({
            status: 'Failure!',
            message: err.message
        })
    }
}