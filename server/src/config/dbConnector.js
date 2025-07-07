const mongoose = require("mongoose");
const { mongooseUri } = require("../secret");

const databaseConnector = () => {
  mongoose
    .connect(mongooseUri)
    .then(() => {
      console.log(`MongoDB connected successfully`);
    })
    .catch((error) => {
      console.error("MongoDB connection error: ", error);
    });
};

module.exports = databaseConnector;