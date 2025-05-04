
const User = require('../models/User');
const mongoose = require('mongoose');

const addCredit = async (req, res) => {
  try {
    const { userId, delta } = req.body;

    if (!userId || userId.length !== 24) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.credits += delta;
    await user.save();
    res.json({ success: true, credits: user.credits });
  } catch (err) {
    console.error('Error adding credit:', err);
    res.status(500).json({ error: 'Failed to update credits' });
  }
};


const getCredit = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ credits: user.credits });
  } catch (err) {
    console.error('Error getting credit:', err);
    return res.status(500).json({ error: 'Failed to get credits' });
  }
};

const rewardDaily = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentDate = new Date().toISOString().split('T')[0]; 
    const lastRewardDate = user.lastRewardDate;

    const lastDate = lastRewardDate ? lastRewardDate.toISOString().split('T')[0] : null;

    console.log("current date", currentDate);
    console.log("last login", lastDate);

    if (lastDate && lastDate === currentDate) {
      return res.json({ rewarded: false, credits: user.credits });
    }

    user.credits += 2;  
    user.lastRewardDate = new Date(); 
    await user.save();

    res.json({ rewarded: true, credits: user.credits });
  } catch (err) {
    console.error('Error rewarding daily user:', err);
    res.status(500).json({ error: 'Failed to reward user' });
  }
};









const adminUpdateCredit = async (adminUserId, targetUserId, delta) => {
  try {
    const admin = await User.findOne({ userId: adminUserId });
    if (!admin || !admin.isAdmin) {
      throw new Error('Not authorized. Admin privileges required.');
    }

    let user = await User.findOne({ userId: targetUserId });
    if (!user) {
      throw new Error('Target user not found');
    }

    user.credits += delta;
    await user.save();

    return user.credits;
  } catch (err) {
    console.error('Error updating credit by admin:', err);
    throw new Error('Failed to update credits');
  }
};


module.exports = { addCredit, getCredit, adminUpdateCredit, rewardDaily };

