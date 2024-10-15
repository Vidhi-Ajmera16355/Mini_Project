const User = require("../models/User");

// Get user profile
exports.getUserProfile = async (req, res) => {
  const userId = req.user.id; // Extracted from JWT

  try {
    const user = await User.findById(userId).select("-password"); // Exclude password
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
