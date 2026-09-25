const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const adminOnly = require("../middleware/adminMiddleware");

const {
  createAccidentReport,
  getMyAccidentReports,
  getAllAccidentReports,
  updateAccidentStatus,
} = require("../controllers/accidentController");

// User creates accident report
router.post(
  "/",
  protect,
  createAccidentReport
);

// User views their reports
router.get(
  "/my-reports",
  protect,
  getMyAccidentReports
);

// Admin views all reports
router.get(
  "/admin",
  protect,
  adminOnly,
  getAllAccidentReports
);

// Admin updates report status
router.patch(
  "/admin/:id/status",
  protect,
  adminOnly,
  updateAccidentStatus
);

module.exports = router;