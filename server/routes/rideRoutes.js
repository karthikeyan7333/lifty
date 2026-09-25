const express = require("express");

const router = express.Router();

const {
  createRide,
  getMyRides,
  getAllRides,
  getRideById,
   deleteRide,
   geocodeRideLocations,
} = require("../controllers/rideController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createRide);
router.get("/my-rides", protect, getMyRides);
router.get("/", getAllRides);
router.get("/geocode", geocodeRideLocations);
router.get("/:id", getRideById);
router.delete("/:id", protect, deleteRide);
module.exports = router;