const mongoose = require("mongoose");

const ResidentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("resident", ResidentSchema);
