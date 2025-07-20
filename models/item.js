const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    category: { type: String, required: true },
    foundBy: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    place: { type: String, required: true },
    datetime: { type: Date, required: true },
    description: { type: String, required: true },
    photoUrl: { type: String, required: true },
    hintQuestion: { type: String, required: true },
    hintAnswer: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
