const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getPendingProviders,
  updateProviderVerification,
} = require("../controllers/adminController");

const { getAllUsers, deleteUser } = require("../controllers/userController");

const {
  getAllRides,
  adminDeleteRide,
} = require("../controllers/rideController");
const {
  getAllBookings,
  adminDeleteBooking,
  updateBookingStatus,
} = require("../controllers/adminBookingController");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/dashboard", protect, getDashboardStats);
router.get("/users", protect, getAllUsers);
router.delete("/rides/:id", protect, adminDeleteRide);
router.get("/rides", protect, getAllRides);
router.delete("/users/:id", protect, deleteUser);
router.get("/bookings", protect, getAllBookings);
router.delete("/bookings/:id", protect, adminDeleteBooking);
router.patch(
  "/bookings/:id/status",
  protect,
  updateBookingStatus
);
// Provider verification
router.get(
  "/providers/pending",
  protect,
  adminOnly,
  getPendingProviders
);

router.patch(
  "/providers/:id/verification",
  protect,
  adminOnly,
  updateProviderVerification
);
module.exports = router;