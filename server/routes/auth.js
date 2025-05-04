const express = require("express");
const {updateProfile, getUserProfile,getAllProfiles,updateUserPoints} = require("../controllers/authController")
const {protect,admin} = require("../middleware/authMiddleware")
const router = express.Router()


router.route('/update/:userId').put(updateProfile)
router.route('/prof/:userId').get(protect,getUserProfile)





module.exports = router;

