const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// schema design
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'User must have a username'],
        unique: true,
        trim: true,
        minlength: [4, 'username needs at lest 4 characters'],
    },
    name: {
        type: String,
        required: [true, 'User must have a name'],
        trim: true,
        minlength: [3, 'name needs at lest 3 characters'],
    },
    password: {
        type: String,
        required: [true, 'User must have a password'],
        trim: true,
        minlength: [6, 'password needs at lest 6 characters'],
    },
    email: {
        type: String,
        required: [true, 'User must have a email'],
        trim: true,
        validate: [validator.isEmail, 'invalid email!'],
        unique: true
    },
    role: {
        type: String,
        default: 'user'
    },
    image: {
        type: String,
        trim: true
    }
},{
    timestamps: true,
});


// password checking
userSchema.methods.matchPassword = async function(enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}


// generate token for user
userSchema.methods.generateUserJWT = async function() {
    return await jwt.sign(
        {id: this._id, username: this.username, name: this.name, email: this.email},
        process.env.JWT_SECRET,
        {
            expiresIn: `${ process.env.JWT_EXPIRE}`
        }
    )
}


// create model
const User = mongoose.model('User', userSchema);

// module export
module.exports = User;