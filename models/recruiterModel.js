const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// schema design
const recruiterSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Recruiter's must have a username"],
        unique: true,
        trim: true,
        minlength: [4, 'username needs at lest 4 characters'],
    },
    name: {
        type: String,
        required: [true, "Recruiter's must have a name"],
        trim: true,
        minlength: [3, 'name needs at lest 3 characters'],
    },
    password: {
        type: String,
        required: [true, "Recruiter's must have a password"],
        trim: true,
        minlength: [6, 'password needs at lest 6 characters'],
    },
    email: {
        type: String,
        required: [true, "Recruiter's must have a email"],
        trim: true,
        validate: [validator.isEmail, 'invalid email!'],
        unique: true
    },
    role: {
        type: String,
        default: 'recruiter'
    },
    image: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true,
        required: [true, "Recruiter's must have a company"],
        minlength: [3, "company name too small!"]
    },
    country: {
        type: String,
        trim: true,
        required: [true, "Recruiter's country name needed"],
        minlength: [3, "country name too small!"],
        lowercase: true
    },
    jobPost: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'JobPost',
        }
    ]
},{
    timestamps: true,
});


// password checking
recruiterSchema.methods.matchPassword = async function(enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}


// generate token for user
recruiterSchema.methods.generateRecruiterJWT = async function() {
    return await jwt.sign(
        {username: this.username, name: this.name, email: this.email},
        process.env.JWT_SECRET,
        {
            expiresIn: `${ process.env.JWT_EXPIRE}`
        }
    )
}


// create model
const Recruiter = mongoose.model('Recruiter', recruiterSchema);

// module export
module.exports = Recruiter;