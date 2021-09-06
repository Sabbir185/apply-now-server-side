// external import
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')

// internal import
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

// app initialization
const app = express();
dotenv.config();

// middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: false}))


// routes
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// error handling
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'Failed!',
        message: `${req.originalUrl} Not Found!`
    });
    next();
})

module.exports = app;