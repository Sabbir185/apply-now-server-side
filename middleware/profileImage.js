const uploader = require('../utilities/singleFileUpload');
const path = require('path');

function profileImage(req, res, next){
    const upload = uploader(
        'avatars',
        ['image/jpeg', 'image/jpg', 'image/png'],
        300000,
        'Only .png .jpg $ .jpeg files are allowed'
    );

    upload.any()(req, res, (err) => {
        if(err){

            // if (req.files.length > 0) {
            //     const { filename } = req.files[0];
            //     fs.unlink(path.join(__dirname), `../public/upload/avatars/${filename}`, (err) => {
            //         if (err) {
            //             console.log(err)
            //         }
            //     })
            // }

            res.status(500).json({
                errors: {
                    avatar: {
                        message: err.message
                    }
                }
            })
        } else{
            next()
        }
    })
}


module.exports = {
    profileImage,
}