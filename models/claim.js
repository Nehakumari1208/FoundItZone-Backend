const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  claimedBy: {
    name: { type: String, required: true },

    email: { type: String, required: true },
    phone: { type: String },
    userId: { type: String, required: true },
  },
  answer: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Pending | Approved | Rejected
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Claim", claimSchema);
