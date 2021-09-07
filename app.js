// external import
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

// internal import
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes');
const jobPostRoutes = require('./routes/jobPostRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

// app initialization
const app = express();
dotenv.config();


// middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/recruiter', recruiterRoutes);
app.use('/jobPost', jobPostRoutes);
app.use('/application', applicationRoutes);


// error handling
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'Failed!',
        message: `${req.originalUrl} Not Found!`
    });
    next();
})


// module export
module.exports = app;