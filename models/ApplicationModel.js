const mongoose = require('mongoose');
const validator = require('validator');

// schema design
const applicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Job must have a title"],
        trim: true,
        minlength: [6, 'title needs at lest 6 characters'],
    },
    description: {
        type: String,
        required: [true, "Job must have a description"],
        trim: true,
        minlength: [20, 'description needs at lest 20 characters'],
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
        minlength: [3, "country name too small!"],
        lowercase: true
    },
    jobType: {
        type: String,
        enum: ['remote','office work']
    },
    image: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true,
        required: [true, "company needed"],
        minlength: [3, "company name too small!"],
    },
    recruiterId: {
        type: String,
        trim: true,
        required: [true, "recruiter's id needed"],
    },
    recruiterEmail: {
        type: String,
        trim: true,
        required: [true, "recruiter's Email needed"],
    },
    user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
    }
    
},{
    timestamps: true,
});


// create model
const Application = mongoose.model('Application', applicationSchema);

// module export
module.exports = Application;