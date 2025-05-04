const express = require("express");
const { addCredit, getCredit, adminUpdateCredit,rewardDaily } = require("../controllers/creditController");

const {protect,admin} = require("../middleware/authMiddleware")
const router = express.Router()






router.route('/points').post(addCredit)
router.route('/credits/:userId').get(getCredit)
router.route('/reward-daily').post(rewardDaily)


// Admin routes

router.route('/admin/points').get(protect,admin,adminUpdateCredit)


module.exports = router;  