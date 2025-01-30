require("dotenv").config();

const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

module.exports = async () => mongoose.connect(mongoURI);
