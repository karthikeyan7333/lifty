const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  registerUser,
  registerProvider,
  loginUser,
  generateCaptcha,
  requestUserOtp,
  verifyUserOtp,
} = require("../controllers/authController");

// =====================================================
// USER REGISTRATION
// =====================================================

router.post("/register", registerUser);

// Generate CAPTCHA
router.get("/captcha", generateCaptcha);

// Generate demo OTP
router.post("/register/request-otp", requestUserOtp);

// Verify OTP and create account
router.post("/register/verify-otp", verifyUserOtp);

// =====================================================
// PROVIDER REGISTRATION
// =====================================================

router.post(
  "/register-provider",
  upload.single("idProof"),
  registerProvider
);

// =====================================================
// LOGIN
// =====================================================

router.post("/login", loginUser);

module.exports = router;