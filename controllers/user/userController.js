// external import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// internal import
const User = require('../../models/UserModel');


// create new user
exports.createUser = async (req, res) => {
    const checkUser = await  User.findOne({$or: [{username: req.body.username}, {email: req.body.email} ]}).select('username email -_id')
    if(checkUser){
        return res.status(400).json({
            message: 'User already exist!',
            user: checkUser
        });
    }

    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const newUser = await User.create({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            image: req.body.image,
            password: hashedPassword
        })

        const userToken = await jwt.sign(
            {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
            process.env.JWT_SECRET,
            {expiresIn: `${process.env.JWT_EXPIRE}`}
        )

        res.status(200).json({
            status: 'new user created successfully!',
            token: userToken,
            user: {
                id: newUser._id,
                username: newUser.username,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'failed!',
            error: {
                message: err.message
            }
        });
    }
}


// get all user
exports.getUsers = async (req, res) => {
    try{
        const allUser = await User.find().select('-password -__v');
        res.status(200).json({
            status: 'successful!',
            totalUser: allUser.length,
            user: allUser
        })

    }catch(err){
        res.status(500).json({
            status: 'Failed',
            error: {
                message: err.message
            }
        });
    }
}


// get user by id
exports.getUser = async (req, res) => {
    try{
        const allUser = await User.findById({_id: req.params.id}).select('-password -__v').populate('applications', 'title company country status createdAt');
        res.status(200).json({
            status: 'successful!',
            user: allUser
        })

    }catch(err){
        res.status(500).json({
            status: 'Failed',
            error: {
                message: err.message
            }
        });
    }
}


// user login
exports.userLogin = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({ username });

        if(user && (await user.matchPassword(password))) {

            const userToken = await user.generateUserJWT();

            res.status(200).json({
                status: 'successful',
                token: userToken,
                user : {
                    id : user._id,
                    username : user.username,
                    name : user.name,
                    email : user.email,
                    role : user.role,
                }
            })

        }else{
            res.status(404).json({
                message: 'Authentication failed!',
            })
        }

    }catch(err){
        res.status(500).json({
            status: 'Authentication failed!',
            error: err.message
        })
    }
}


// delete user
exports.deleteUser = async (req, res) => {
    try{
        const deleteUser = await User.findByIdAndDelete({ _id: req.params.id });

        res.status(200).json({
            status: 'User delete successful!',
            delete: true
        })

    }catch(err){
        res.status(500).json({
            status: 'Failed!',
            message: err.message
        })
    }
}



// update profile image
exports.updateProfile = async (req, res) => {
    
    const destination = (req.files[0].destination)
    const filename = (req.files[0].filename)
    const imagePath = destination + filename;
  
    try{

        const updateUser = await User.findByIdAndUpdate(
            { _id: req.params.id },
            {image: imagePath});

        res.status(200).json({
            status: 'Profile Updated successfully!',
            update: true
        })

    }catch(err){
        res.status(500).json({
            status: 'Failed to update!',
            message: err.message
        })
    }
}