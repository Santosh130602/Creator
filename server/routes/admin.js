const express = require("express");
const {register, loginUser, getAllUser,updateUserPoints} = require("../controllers/adminController")
const {protect,admin} = require("../middleware/authMiddleware")
const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(loginUser)



// // Admin routes

router.route('/get-user').get(protect,admin,getAllUser)
router.route('/change-point/:userId').put(protect,admin,updateUserPoints)

module.exports = router;