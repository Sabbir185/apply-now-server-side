const mongoose = require('mongoose');

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
    userCV: {
        type: String,
        trim: true,
        required: [true, "user must submit a cv link"]
    },
    status: {
        type: String,
        enum: ['pending', 'received', 'reject'],
        default: 'pending'
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