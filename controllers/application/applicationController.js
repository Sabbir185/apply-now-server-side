// internal import
const Application = require('../../models/ApplicationModel');
const User = require('../../models/UserModel');


// save new application
exports.saveApplication = async (req, res) => {
    try{
        const newApplication = await Application.create({
            ...req.body,
            user: req.user.id
        });
        
        await User.updateOne({_id: req.user.id}, {$push: {applications: newApplication._id}} );

        res.status(200).json({
            status: 'You have successfully applied!',
            apply: true
        })
    }catch(err){
        res.status(404).json({
            status: 'failed to apply, try again!',
        })
    }
}


// get all application
exports.getApplications = async (req, res) => {
    try{
        const applications = await Application.find().select('-__v');

        res.status(200).json({
            status: 'success!',
            totalPost: applications.length,
            data: applications
        })
        
    }catch(err){
        res.status(500).json({
            status: 'failed!',
            message: err.message
        })
    }
}


// get application by id
exports.getApplication = async (req, res) => {
    try{
        const application = await Application.findById({_id: req.params.id}).populate("user", "-password -__v").select('-__v');

        res.status(200).json({
            status: 'success!',
            data: application
        })

    }catch(err){
        res.status(500).json({
            status: 'failed!',
            message: err.message
        })
    }
}



// delete application by id
exports.deleteApplication = async (req, res) => {
    try{
        const applications = await Application.findByIdAndDelete({ _id: req.params.id });

        res.status(200).json({
            status: 'application deleted successfully!',
            delete: true
        })

    }catch(err){
        res.status(500).json({
            status: 'failed!',
            message: err.message
        })
    }
}