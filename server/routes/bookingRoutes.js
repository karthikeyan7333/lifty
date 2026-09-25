const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  bookRide,
  getMyBookings,
  getProviderBookings,
  cancelBooking,

} = require("../controllers/bookingController");

router.post("/", protect, bookRide);

router.get("/my-bookings", protect, getMyBookings);
router.get("/provider", protect, getProviderBookings);
router.delete("/:id", protect, cancelBooking);

module.exports = router;
