const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  processDemoPayment,
  createRazorpayOrder,
  verifyRazorpayPayment,
} = require("../controllers/paymentController");

// =====================================================
// DEMO PAYMENT
// =====================================================

router.post(
  "/:id/pay",
  protect,
  processDemoPayment
);

// =====================================================
// RAZORPAY
// =====================================================

// Create Razorpay order
router.post(
  "/:id/razorpay/order",
  protect,
  createRazorpayOrder
);

// Verify Razorpay payment
router.post(
  "/razorpay/verify",
  protect,
  verifyRazorpayPayment
);

module.exports = router;