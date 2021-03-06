const mongoose = require('mongoose');

// schema design
const jobPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Job must have a title"],
        trim: true,
        minlength: [6, 'title needs at lest 6 characters'],
        lowercase: true
    },
    description: {
        type: String,
        required: [true, "Job must have a description"],
        trim: true,
        minlength: [20, 'description needs at least 20 characters'],
    },
    salary: {
        type: String,
        trim: true,
        required: [true, "Input salary range"],
    },
    country: {
        type: String,
        trim: true,
        required: [true, "country name needed"],
        minlength: [2, "country name too small!"],
        lowercase: true
    },
    jobType: {
        type: String,
        enum: ['remote','office work'],
        lowercase: true
    },
    image: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true,
        required: [true, "company needed"],
        minlength: [2, "company name too small!"],
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    recruiter: {
            type: mongoose.Types.ObjectId,
            ref: 'Recruiter',
    }
    
},{
    timestamps: true,
});


// create model
const JobPost = mongoose.model('JobPost', jobPostSchema);

// module export
module.exports = JobPost;