const mongoose = require("mongoose");

const FlatSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    block: { type: String, required: true },
    number: { type: Number, required: true },
    residents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "resident",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("flat", FlatSchema);
