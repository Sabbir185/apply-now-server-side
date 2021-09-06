// external import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// internal import
const User = require('../../models/UserModel');


// create new user
exports.createUser = async (req, res) => {
    try{
        const checkUser = await  User.findOne({$or: [{username: req.body.username}, {email: req.body.email} ]}).select('username email -_id')
        if(checkUser.username || checkUser.password ){
            res.status(500).json({
                message: 'User already exist!',
                user: checkUser
            });
        }
    

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
                message: err
            }
        });
    }
}