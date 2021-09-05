// internal import
const app = require("./app");

// external import
const mongoose = require("mongoose");

// const DB = process.env.DATABASE_NAME.replace(`<PASSWORD>`, process.env.DB_PASS);

mongoose
  .connect(process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful!"))
  .catch((err) => console.log(err));

  
// server
app.listen(process.env.APP_PORT || 3000, () => {
  console.log(`Server is listening ${process.env.APP_PORT}`);
});
