// external import
const bcrypt = require('bcrypt');

// internal import
const Admin = require('../../models/AdminModel');


// create new admin
exports.adminCreate = async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newAdmin = await Admin.create({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            image: req.body.image,
            password: hashedPassword,
            admin: req.user.id
        })

        res.status(200).json({
            status: 'New admin created successfully!',
            admin: {
                id: newAdmin._id,
                username: newAdmin.username,
                name: newAdmin.name,
                email: newAdmin.email,
            }
        })

    }catch(err){
        res.status(400).json({
            status: 'failed!',
            message: err.message
        })
    }
}


// get all admin
exports.getAllAdmin = async (req, res) => {
    try{
        const admins = await Admin.find().select('-password');

        res.status(200).json({
            status: 'successful!',
            totalAdmin: admins.length,
            data: admins
        })
    }catch(err){
        res.status(500).json({
            status: 'failed!',
            message: err.message
        })
    }
}


// get admin by id
exports.getAdmin = async (req, res) => {
    try{
        const admin = await Admin.find({_id: req.params.id}).select('-password -__v');

        res.status(200).json({
            status: 'successful!',
            data: admin
        })

    }catch(err){
        res.status(500).json({
            status: 'failed!',
            message: err.message
        })
    }
}


// admin login
exports.adminLogin = async (req, res) => {
    try{
        const {username, password} = req.body;
        const admin = await Admin.findOne({username});

        // if admin and hashed password true
        if(admin && (await admin.matchPassword(password))) {

            const token = await admin.generateToken();
            
            res.status(200).json({
                status: 'successful',
                token: token,
                admin : {
                    id : admin._id,
                    username : admin.username,
                    name : admin.name,
                    email : admin.email,
                    role : admin.role,
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