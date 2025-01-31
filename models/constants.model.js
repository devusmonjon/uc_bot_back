const mongoose = require('mongoose');

const constantsSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
        default: 0
    }
},{ timestamps: true });

module.exports = mongoose.model('Constants', constantsSchema);