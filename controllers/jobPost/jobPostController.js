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

        console.log(newPost)

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
        const posts = await JobPost.find().populate("recruiter").select("-__v").sort('-createdAt')
        
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
            status: 'Post deleted successfully!',
            delete: true,
        })

    }catch(err){
        res.status(500).json({
            status: 'Failure!',
            message: err.message
        })
    }
}


// pagination search by title & jobType
exports.paginationPosts = async (req, res) => {
    try{
        const page = req.query.page * 1;
        const limit = req.query.limit * 1;
        const skip = (page -1 ) * limit;

        const {title, jobType} = req.body;
        const posts = await JobPost.find({$and: [{title : {$regex: `${title}` }}, {jobType: `${jobType}`}] })
        .populate("recruiter","-password -__v -jobPost").select("-__v").skip(skip).limit(limit).sort('-createdAt');
        
        const jobs = posts;

        // total post count
        const postCount = await JobPost.find({$and: [{title : {$regex: `${title}` }}, {jobType: `${jobType}`}] }).countDocuments();

        res.status(200).json({
            status: 'OK',
            data:jobs,
            count: page,
            postCount: postCount
        })

    }catch(err){
        res.status(500).json({
            status: 'Failure!',
            message: err.message
        })
    }
}



// pagination, get post by title (popular keyword )
exports.paginationPostByTitle = async (req, res) => {
    try{
        const page = req.body.page * 1;
        const limit = req.body.limit * 1;
        const skip = (page -1 ) * limit;

        // `${popularPost}`
        const popularPost = req.params.title;
        const jobs = await JobPost.find({title : {$regex: `${popularPost}` }})
        .populate("recruiter","-password -__v -jobPost").select("-__v").skip(skip).limit(limit).sort('-createdAt');

          // total post count
          const postCount = await JobPost.find({title : {$regex: `${popularPost}` }}).countDocuments();
        
        res.status(200).json({
            status: 'OK',
            data:jobs,
            count: page,
            postCount: postCount,
        })

    }catch(err){
        res.status(500).json({
            status: 'Failure!',
            message: err.message
        })
    }
}