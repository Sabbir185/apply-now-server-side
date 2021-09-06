// external import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// internal import
const Recruiter = require('../../models/recruiterModel');


// create new user
exports.createRecruiter = async (req, res) => {
    const checkRecruiter = await  Recruiter.findOne({$or: [{username: req.body.username}, {email: req.body.email} ]}).select('username email -_id')
    if(checkRecruiter){
        return res.status(401).json({
            message: 'User already exist!',
            user: checkRecruiter
        });
    }

    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newRecruiter = await Recruiter.create({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            image: req.body.image,
            company: req.body.company,
            country: req.body.country,
            password: hashedPassword
        })

        const recruiterToken = await jwt.sign(
            {
                id: newRecruiter._id,
                username: newRecruiter.username,
                email: newRecruiter.email,
            },
            process.env.JWT_SECRET,
            {expiresIn: `${process.env.JWT_EXPIRE}`}
        )

        res.status(200).json({
            status: 'new recruiter created successfully!',
            token: recruiterToken,
            data: {
                id: newRecruiter._id,
                username: newRecruiter.username,
                name: newRecruiter.name,
                email: newRecruiter.email,
                role: newRecruiter.role,
                company: newRecruiter.company,
                country: newRecruiter.country
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
exports.getRecruiters = async (req, res) => {
    try{
        const allRecruiter = await Recruiter.find().select('-password -__v');
        res.status(200).json({
            status: 'successful!',
            totalRecruiter: allRecruiter.length,
            user: allRecruiter
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
exports.getRecruiter = async (req, res) => {
    try{
        const recruiter = await Recruiter.find({_id: req.params.id}).select('-password -__v');
        res.status(200).json({
            status: 'successful!',
            user: recruiter
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