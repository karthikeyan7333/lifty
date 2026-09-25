const Booking = require("../models/Booking");

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "fullName email phone")
      .populate({
        path: "ride",
        populate: {
          path: "driver",
          select: "fullName email phone",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const adminDeleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "cancelled",
      "completed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid booking status",
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = status;

    await booking.save();

    res.status(200).json({
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.error("UPDATE BOOKING STATUS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getAllBookings,
  adminDeleteBooking,
  updateBookingStatus,
};