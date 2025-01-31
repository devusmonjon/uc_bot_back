const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: {
        type: String,
        required: true,
        default: ""
    },
    stats: {
        type: Boolean,
        default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", ordersSchema);
