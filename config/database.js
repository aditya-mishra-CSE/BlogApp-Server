const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connection with the database is successfull");
    })
    .catch((error) => {
      console.log("Error found");
      console.error(error);
      process.exit(1);
    });
};

module.exports = dbConnect;
