const { default: mongoose } = require("mongoose");

const ucSchema = new mongoose.Schema(
    {
      name: {
        type: Number,
        required: true,
        default: 0,
      },
      price: {
        type: Number,
        required: true,
        unique: true,
      },
    },
    { timestamps: true }
  );

  module.exports = mongoose.model('Uc', ucSchema);
