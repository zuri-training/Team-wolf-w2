const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const { MONGODB_URI } = process.env;

const connect = async () => {
  await mongoose.connect(
    MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      autoIndex: false, // Don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    },
    (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("Database Connected");
      }
    }
  );
};
module.exports = connect;
