const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    fatherName:{
        type: String,
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    image:{
        type:String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
      },
    credits: { 
        type: Number, 
        default: 0 
    },
    preferences: { 
        type: Object, 
        default: {} 
    },
    lastRewardDate: { 
        type: Date, 
        default: null 
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
