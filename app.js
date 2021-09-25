// external import
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// static image file handle
app.use('/public/upload/avatars/', express.static(path.join(__dirname, 'public/upload/avatars/')));


// routes
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/recruiter', recruiterRoutes);
app.use('/jobPost', jobPostRoutes);
app.use('/application', applicationRoutes);

app.get('/', (req, res) => {
    res.send("Hello, welcome!")
})


// error handling
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'Failed!',
        message: `${req.originalUrl} Not Found!`
    });
    next();
})


mongoose
  .connect(process.env.DATABASE_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful!"))
  .catch((err) => console.log(err));

  
// server
app.listen(process.env.APP_PORT || 3000, () => {
  console.log(`Server is listening ${process.env.APP_PORT}`);
});


// module export
module.exports = app;