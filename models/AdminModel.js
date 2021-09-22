const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// schema design
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Admin username is required!'],
        trim: true,
        minlength: [6, 'username needs at lest 6 characters'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Admin name is required!'],
        trim: true,
        minlength: [3, 'username needs at lest 3 characters'],
    },
    email: {
        type: String,
        required: [true, 'Admin email is required!'],
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'Please provide valid email']
    },
    password: {
        type: String,
        required: [true, 'Admin password is required!'],
        trim: true,
        minlength: [6, 'password needs at lest 6 characters']
    },
    image: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        default: 'admin'
    },
    adminCreator: {
        type: mongoose.Types.ObjectId,
        ref: 'Admin'
    }
},{
    timestamps: true
});


// password checking for match
adminSchema.methods.matchPassword = async function(enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}


// token generate both login and signup user
adminSchema.methods.generateToken = async function() {
    return await jwt.sign(
        {id: this._id, username: this.username, name: this.name, email: this. email, role: this.role},
        process.env.JWT_SECRET, 
        {expiresIn: `${process.env.JWT_EXPIRE}`}
    )
}


// create model
const Admin = mongoose.model('Admin', adminSchema);

// module export
module.exports = Admin;