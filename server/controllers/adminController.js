const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const { generateToken } = require("../middleware/authMiddleware")

const crypto = require('crypto');
const jwt = require('jsonwebtoken');



const register = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    try {

        if (!fullName || !email || !password) {
            res.status(400);
            throw new Error("Please enter all the fields.");
        }
        const userExist = await User.findOne({ email })
        if (userExist) {
            res.status(400)
            throw new Error("User already exist")
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            fullName,
            email,
            password: hashPassword,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            })
        }
        else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }

})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            })
        } else {
            res.status(401);
            throw new Error("invalid email or password");
        }
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
})

const getAllUser = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users)
    } catch (error) {
        res.status(400).json({ messag: error.message })
    }
})



const updateUserPoints = async (req, res) => {
  const { userId } = req.params;  
  const { credits } = req.body;   
  if (credits === undefined || credits === null) {
    return res.status(400).json({ message: 'Credits are required' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.credits = credits;
    
    const updatedUser = await user.save();
    
    return res.status(200).json({
      message: 'User points updated successfully',
      user: updatedUser, 
    });
  } catch (error) {
    console.error('Error updating points:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};






module.exports = {register, loginUser, getAllUser,updateUserPoints}