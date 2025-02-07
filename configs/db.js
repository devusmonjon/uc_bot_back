require("dotenv").config();

const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/uc_bot";

module.exports = async () => mongoose.connect(mongoURI);
