// internal import
const app = require("./app");
const port = 8080;

// external import
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful!"))
  .catch((err) => console.log(err));

  
// server
app.listen(process.env.PORT || port);
