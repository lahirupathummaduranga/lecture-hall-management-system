const mongoose = require("mongoose");
require('dotenv').config();

const mongoDb_URL = process.env.MongoDbURL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDb_URL, {});
    console.log("DB connected...");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
