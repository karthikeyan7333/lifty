const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ride: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
    },

    seatsBooked: {
      type: Number,
      default: 1,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentMethod: {
  type: String,
  enum: ["demo", "razorpay"],
  default: "demo",
},

// Razorpay payment details
razorpayOrderId: {
  type: String,
  default: null,
},

razorpayPaymentId: {
  type: String,
  default: null,
},

razorpaySignature: {
  type: String,
  default: null,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);