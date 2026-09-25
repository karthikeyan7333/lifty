const Booking = require("../models/Booking");
const Ride = require("../models/Ride");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// =====================================================
// RAZORPAY INSTANCE
// =====================================================

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// =====================================================
// DEMO PAYMENT
// KEEPING EXISTING FLOW
// =====================================================

const processDemoPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    if (booking.paymentStatus === "paid") {
      return res.status(400).json({
        message: "Booking is already paid",
      });
    }

    const ride = await Ride.findById(booking.ride);

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    if (ride.availableSeats < booking.seatsBooked) {
      return res.status(400).json({
        message: "Sorry, no seats are available",
      });
    }

    booking.paymentStatus = "paid";
    booking.paymentMethod = "demo";
    booking.status = "confirmed";

    ride.availableSeats -= booking.seatsBooked;

    await ride.save();
    await booking.save();

    res.status(200).json({
      message: "Demo payment successful",
      booking,
    });
  } catch (error) {
    console.error("Demo payment error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =====================================================
// CREATE RAZORPAY ORDER
// =====================================================

const createRazorpayOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Make sure booking belongs to logged-in user
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    // Already paid
    if (booking.paymentStatus === "paid") {
      return res.status(400).json({
        message: "Booking is already paid",
      });
    }

    const ride = await Ride.findById(booking.ride);

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    // Check seats before creating payment order
    if (ride.availableSeats < booking.seatsBooked) {
      return res.status(400).json({
        message: "Sorry, no seats are available",
      });
    }

    // Razorpay amount is in paise
    const amountInPaise = Math.round(booking.amount * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `booking_${booking._id}`,
      notes: {
        bookingId: booking._id.toString(),
      },
    };

    const order = await razorpay.orders.create(options);

    // Save Razorpay order ID
    booking.razorpayOrderId = order.id;

    await booking.save();

    res.status(200).json({
      message: "Razorpay order created successfully",
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("RAZORPAY CREATE ORDER ERROR:", error);

    res.status(500).json({
      message: "Unable to create Razorpay order",
    });
  }
};

// =====================================================
// VERIFY RAZORPAY PAYMENT
// =====================================================

const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      bookingId,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !bookingId ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        message: "Payment verification details are missing",
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Make sure booking belongs to logged-in user
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    if (!booking.razorpayOrderId) {
      return res.status(400).json({
        message: "Razorpay order not found",
      });
    }

    // Prevent duplicate payment processing
    if (booking.paymentStatus === "paid") {
      return res.status(400).json({
        message: "Booking is already paid",
      });
    }

    // =================================================
    // VERIFY SIGNATURE
    // =================================================

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        `${booking.razorpayOrderId}|${razorpay_payment_id}`
      )
      .digest("hex");

    const expectedBuffer = Buffer.from(
      generatedSignature,
      "utf8"
    );

    const receivedBuffer = Buffer.from(
      razorpay_signature,
      "utf8"
    );

    if (
      expectedBuffer.length !==
      receivedBuffer.length
    ) {
      return res.status(400).json({
        message: "Invalid payment signature",
      });
    }

    const isValid = crypto.timingSafeEqual(
      expectedBuffer,
      receivedBuffer
    );

    if (!isValid) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }

    // =================================================
    // CHECK RIDE
    // =================================================

    const ride = await Ride.findById(booking.ride);

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    if (ride.availableSeats < booking.seatsBooked) {
      return res.status(400).json({
        message: "Sorry, no seats are available",
      });
    }

    // =================================================
    // PAYMENT SUCCESS
    // =================================================

    booking.paymentStatus = "paid";
    booking.paymentMethod = "razorpay";
    booking.status = "confirmed";

    booking.razorpayPaymentId =
      razorpay_payment_id;

    booking.razorpaySignature =
      razorpay_signature;

    // Decrease seats only after verified payment
    ride.availableSeats -= booking.seatsBooked;

    await ride.save();
    await booking.save();

    res.status(200).json({
      message: "Razorpay payment successful",
      booking,
    });
  } catch (error) {
    console.error(
      "RAZORPAY VERIFY PAYMENT ERROR:",
      error
    );

    res.status(500).json({
      message: "Payment verification failed",
    });
  }
};

module.exports = {
  processDemoPayment,
  createRazorpayOrder,
  verifyRazorpayPayment,
};