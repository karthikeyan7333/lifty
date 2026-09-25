const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// =====================================================
// DEMO OTP / CAPTCHA STORAGE
// =====================================================

// Temporary storage for CAPTCHA
const captchaStore = new Map();

// Temporary storage for pending registrations
const otpStore = new Map();

// =====================================================
// CAPTCHA
// =====================================================

const generateCaptcha = async (req, res) => {
  try {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;

    const captchaId = crypto.randomUUID();

    captchaStore.set(captchaId, {
      answer: String(num1 + num2),
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    res.status(200).json({
      captchaId,
      question: `What is ${num1} + ${num2}?`,
    });
  } catch (error) {
    console.error("CAPTCHA ERROR:", error);

    res.status(500).json({
      message: "Unable to generate CAPTCHA",
    });
  }
};

// =====================================================
// REGISTER USER - REQUEST OTP
// =====================================================

const requestUserOtp = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      captchaId,
      captchaAnswer,
    } = req.body;

    // Basic validation
    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !captchaId ||
      !captchaAnswer
    ) {
      return res.status(400).json({
        message: "Please fill in all fields.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // =================================================
    // CAPTCHA CHECK
    // =================================================

    const captcha = captchaStore.get(captchaId);

    if (!captcha) {
      return res.status(400).json({
        message: "CAPTCHA expired. Please generate a new CAPTCHA.",
      });
    }

    if (Date.now() > captcha.expiresAt) {
      captchaStore.delete(captchaId);

      return res.status(400).json({
        message: "CAPTCHA expired. Please generate a new CAPTCHA.",
      });
    }

    if (String(captchaAnswer).trim() !== captcha.answer) {
      return res.status(400).json({
        message: "Incorrect CAPTCHA answer.",
      });
    }

    // CAPTCHA can only be used once
    captchaStore.delete(captchaId);

    // =================================================
    // CHECK EXISTING USER
    // =================================================

    const existingUser = await User.findOne({
      $or: [
        { email: normalizedEmail },
        { phone: phone.trim() },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or phone number already registered.",
      });
    }

    // =================================================
    // OTP RATE LIMIT
    // =================================================

    const existingOtp = otpStore.get(normalizedEmail);

    if (
      existingOtp &&
      existingOtp.generatedAt &&
      Date.now() - existingOtp.generatedAt < 10 * 60 * 1000
    ) {
      if (existingOtp.generationCount >= 3) {
        return res.status(429).json({
          message:
            "Too many OTP requests. Please wait a few minutes before trying again.",
        });
      }
    }

    // =================================================
    // GENERATE 6 DIGIT OTP
    // =================================================

    const otp = crypto.randomInt(100000, 1000000).toString();

    const generationCount =
      existingOtp &&
      Date.now() - existingOtp.firstGeneratedAt < 10 * 60 * 1000
        ? existingOtp.generationCount + 1
        : 1;

    // =================================================
    // STORE PENDING REGISTRATION
    // =================================================

    otpStore.set(normalizedEmail, {
      fullName,
      email: normalizedEmail,
      phone: phone.trim(),
      password,

      otp,

      expiresAt: Date.now() + 5 * 60 * 1000,

      attempts: 0,

      generationCount,

      firstGeneratedAt:
        existingOtp &&
        Date.now() - existingOtp.firstGeneratedAt < 10 * 60 * 1000
          ? existingOtp.firstGeneratedAt
          : Date.now(),

      generatedAt: Date.now(),
    });

    // =================================================
    // DEMO RESPONSE
    // =================================================

    res.status(200).json({
      message: "Demo OTP generated successfully.",

      // DEMO ONLY
      otp,

      expiresIn: "5 minutes",
    });
  } catch (error) {
    console.error("REQUEST OTP ERROR:", error);

    res.status(500).json({
      message: "Unable to generate OTP",
    });
  }
};

// =====================================================
// VERIFY OTP + CREATE USER
// =====================================================

const verifyUserOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const pendingRegistration = otpStore.get(normalizedEmail);

    if (!pendingRegistration) {
      return res.status(400).json({
        message:
          "No pending registration found. Please generate a new OTP.",
      });
    }

    // =================================================
    // OTP EXPIRY
    // =================================================

    if (Date.now() > pendingRegistration.expiresAt) {
      otpStore.delete(normalizedEmail);

      return res.status(400).json({
        message: "OTP expired. Please generate a new OTP.",
      });
    }

    // =================================================
    // ATTEMPT LIMIT
    // =================================================

    if (pendingRegistration.attempts >= 5) {
      otpStore.delete(normalizedEmail);

      return res.status(429).json({
        message:
          "Too many incorrect OTP attempts. Please generate a new OTP.",
      });
    }

    // =================================================
    // OTP CHECK
    // =================================================

    if (String(otp).trim() !== pendingRegistration.otp) {
      pendingRegistration.attempts += 1;

      return res.status(400).json({
        message: `Incorrect OTP. ${
          5 - pendingRegistration.attempts
        } attempts remaining.`,
      });
    }

    // =================================================
    // CHECK AGAIN BEFORE CREATE
    // =================================================

    const existingUser = await User.findOne({
      $or: [
        { email: normalizedEmail },
        { phone: pendingRegistration.phone },
      ],
    });

    if (existingUser) {
      otpStore.delete(normalizedEmail);

      return res.status(400).json({
        message: "Email or phone number already registered.",
      });
    }

    // =================================================
    // HASH PASSWORD
    // =================================================

    const hashedPassword = await bcrypt.hash(
      pendingRegistration.password,
      10
    );

    // =================================================
    // CREATE USER
    // =================================================

    const newUser = await User.create({
      fullName: pendingRegistration.fullName,
      email: pendingRegistration.email,
      phone: pendingRegistration.phone,
      password: hashedPassword,
      role: "user",
    });

    // Remove OTP after successful verification
    otpStore.delete(normalizedEmail);

    res.status(201).json({
      message: "OTP verified. Account created successfully.",
      user: newUser,
    });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// OLD REGISTER USER
// =====================================================

// Kept for compatibility.
// Normal registration will now use requestUserOtp + verifyUserOtp.
const registerUser = async (req, res) => {
  try {
    const { fullName, email, phone, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// REGISTER PROVIDER
// =====================================================

const registerProvider = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    if (!/^\d{10}$/.test(phone)) {
  return res.status(400).json({
    message: "Phone number must be exactly 10 digits.",
  });
}

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or phone number already registered",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "ID proof is required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newProvider = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role: "provider",

      verificationStatus: "pending",

      idProof: req.file.filename,
    });

    res.status(201).json({
      message:
        "Provider account created successfully. Your ID proof is waiting for admin verification.",
      user: newProvider,
    });
  } catch (error) {
    console.error("PROVIDER REGISTER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// LOGIN USER
// =====================================================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  registerProvider,
  loginUser,
  generateCaptcha,
  requestUserOtp,
  verifyUserOtp,
};