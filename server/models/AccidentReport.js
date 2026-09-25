const mongoose = require("mongoose");

const accidentReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    ride: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    safetyStatus: {
      type: String,
      enum: ["safe", "need-help"],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "under-review",
        "resolved",
        "rejected",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AccidentReport",
  accidentReportSchema
);