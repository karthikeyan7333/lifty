const Booking = require("../models/Booking");
const Ride = require("../models/Ride");

// Book Ride
// Book Ride
const bookRide = async (req, res) => {
  try {
    const { rideId } = req.body;

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    if (ride.availableSeats <= 0) {
      return res.status(400).json({
        message: "No seats available",
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      ride: rideId,
      seatsBooked: 1,
      amount: ride.price,
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: "demo",
    });

    res.status(201).json({
      message: "Booking created. Payment required.",
      booking,
    });
  } catch (error) {
    console.error("Book ride error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate({
        path: "ride",
        populate: {
          path: "driver",
          select: "fullName phone",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getProviderBookings = async (req, res) => {
  try {
    if (req.user.role !== "provider") {
      return res.status(403).json({
        message: "Provider access only",
      });
    }

    const rides = await Ride.find({
      driver: req.user.id,
    }).select("_id");

    const rideIds = rides.map((ride) => ride._id);

    const bookings = await Booking.find({
      ride: {
        $in: rideIds,
      },
    })
      .populate("user", "fullName email phone")
      .populate("ride", "from to date time availableSeats price")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const ride = await Ride.findById(booking.ride);

   if (ride && booking.paymentStatus === "paid") {
  ride.availableSeats += booking.seatsBooked;
  await ride.save();
}

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  bookRide,
  getMyBookings,
  getProviderBookings,
  cancelBooking,
};
