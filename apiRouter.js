// project external files
const express = require("express");
const router = express.Router();

// project files
const userController = require("./paymentController");

router.post("/pay", userController.oneTimePayment);
router.post("/callback", userController.paymentCallback);

module.exports = router;
