const User = require('../models/User');
const asyncHandler = require("express-async-handler")

const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const { fullName, phone, fatherName, address } = req.body;

    console.log("useris",userId)

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (fatherName) user.fatherName = fatherName;
    if (address) user.address = address;

    user.credits = (user.credits || 0) + 10;

    await user.save();

    return res.status(200).json({
      message: 'Profile updated successfully',
      credits: user.credits,
      user,
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params; 
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User profile fetched successfully',
      user,
    });
    
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Admin code 


const getAllProfiles = asyncHandler(async (req, res) => {
  try {
      const users = await User.find({});
      res.json(users)
  } catch (error) {
      res.status(400).json({ messag: error.message })
  }
})



const updateUserPoints = async (req, res) => {
  try {
    const { userId } = req.params;
    const { credits } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.credits = credits;
    await user.save();

    res.status(200).json({ message: 'User points updated', user });
  } catch (error) {
    console.error('Error updating user points:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  updateProfile,
  getUserProfile,
  getAllProfiles,
  updateUserPoints,
};



