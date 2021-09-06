const jwt = require('jsonwebtoken')

exports.checkLogin = async (req, res, next) => {
    const { authorization } = req.headers;

   if(authorization && authorization.startsWith('Bearer')){
        try{
            const token = authorization.split(' ')[1];

            if(!token) res.status(401).json({msg: 'Authentication failed!'});

            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();

        }catch(err){
            res.status(401).json({
                status: 'Authentication failed!',
                error: err.message,
            })
        }
        
   }else{
        res.status(401).json({
            status: 'Authentication failed!',
        })
   }
}