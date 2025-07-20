const User = require("../models/user");

exports.createUserFromClerk = async (req, res) => {
  try {
    const { id, email, firstName, lastName, imageUrl, createdAt } = req.body;

    const existingUser = await User.findOne({ id });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    const user = new User({
      id,
      email,
      firstName,
      lastName,
      imageUrl,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
    });

    await user.save();
    res.status(201).json({ message: "User saved to MongoDB" });
  } 
  catch (err) {
    console.error("❌ Error saving user:", err);
    res.status(500).json({ error: err.message });
  }
};
