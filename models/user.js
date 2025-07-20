const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Clerk user id
  email: { type: String, required: true },
  firstName: String,
  lastName: String,
  imageUrl: String,
  createdAt: Date,
});

module.exports = mongoose.model("User", userSchema);
