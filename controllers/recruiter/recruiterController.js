// external import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// internal import
const Recruiter = require('../../models/recruiterModel');


// create new recruiter
exports.createRecruiter = async (req, res) => {
    const checkRecruiter = await  Recruiter.findOne({$or: [{username: req.body.username}, {email: req.body.email} ]}).select('username email -_id')
    if(checkRecruiter){
        return res.status(401).json({
            message: 'Recruiter already exist!',
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


// get all recruiter
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


// get recruiter by id
exports.getRecruiter = async (req, res) => {
    try{
        const recruiter = await Recruiter.find({_id: req.params.id})
                                         .populate('jobPost')
                                         .select('-password -__v');
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


// recruiter login
exports.recruiterLogin = async (req, res) => {
    try{
        const {username, password} = req.body;
        const recruiter = await Recruiter.findOne({ username });

        if(recruiter && (await recruiter.matchPassword(password))) {

            const recruiterToken = await recruiter.generateRecruiterJWT();

            res.status(200).json({
                status: 'successful',
                token: recruiterToken,
                user : {
                    id : recruiter._id,
                    username : recruiter.username,
                    name : recruiter.name,
                    email : recruiter.email,
                    country : recruiter.country,
                    role : recruiter.role,
                    company : recruiter.company,
                }
            })

        }else {
            res.status(401).json({
                status: 'Authentication failed!',
            })
        }

    }catch(err){
        res.status(401).json({
            status: 'Authentication failed!',
            error: err.message
        })
    }
}


// delete recruiter
exports.deleteRecruiter = async (req, res) => {
    try{
        const deleteRecruiter = await Recruiter.findByIdAndDelete({ _id: req.params.id });

        res.status(200).json({
            status: 'Recruiter delete successful!',
            delete: true
        })

    }catch(err){
        res.status(500).json({
            status: 'Failed!',
            message: err.message
        })
    }
}


// update recruiter profile image
exports.updateProfile = async (req, res) => {
    
    const destination = (req.files[0].destination)
    const filename = (req.files[0].filename)
    const imagePath = destination + filename;
  
    try{

        const updateUser = await Recruiter.findByIdAndUpdate(
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