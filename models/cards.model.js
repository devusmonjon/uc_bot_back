const mongoose = require('mongoose');

const cardsSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    }
},{ timestamps: true });

module.exports = mongoose.model('Cards', cardsSchema);