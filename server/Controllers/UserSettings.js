const User = require("../Models/User");

// Controller to get user profile data
const getProfile = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).select('full_name first_name email last_name phone location company_name  created_at');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const profileId = await user.id.slice(-8);

    res.status(200).json({
      message: 'Profile data retrieved successfully',
      data: {
        ...user.toObject(), // Convert Mongoose document to plain object
        profileId // Add the sliced id
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching profile data',
      error: error.message,
    });
  }
};

// Controller to update user profile data
const updateProfile = async (req, res) => {
  const userId = req.user._id;
  const { full_name, first_name, last_name, phone, company_name,location } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        full_name,
        first_name,
        last_name,
        phone,
        company_name,
        location,
        updated_at: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating profile data',
      error: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
