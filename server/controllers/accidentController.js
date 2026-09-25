const AccidentReport = require("../models/AccidentReport");
const Booking = require("../models/Booking");

// =====================================================
// CREATE ACCIDENT REPORT
// =====================================================

const createAccidentReport = async (req, res) => {
  try {
    const {
      bookingId,
      description,
      safetyStatus,
    } = req.body;

    if (!bookingId || !description || !safetyStatus) {
      return res.status(400).json({
        message: "Please provide all accident report details.",
      });
    }

    if (!["safe", "need-help"].includes(safetyStatus)) {
      return res.status(400).json({
        message: "Invalid safety status.",
      });
    }

    // Find booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    // Make sure this booking belongs to the logged-in user
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to report this booking.",
      });
    }

    // Create accident report
    const report = await AccidentReport.create({
      user: req.user.id,
      booking: booking._id,
      ride: booking.ride,
      description,
      safetyStatus,
      status: "pending",
    });

    res.status(201).json({
      message:
        "Accident report submitted successfully.",
      report,
    });
  } catch (error) {
    console.error(
      "CREATE ACCIDENT REPORT ERROR:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =====================================================
// GET USER'S ACCIDENT REPORTS
// =====================================================

const getMyAccidentReports = async (req, res) => {
  try {
    const reports = await AccidentReport.find({
      user: req.user.id,
    })
      .populate({
        path: "booking",
        select: "status paymentStatus createdAt",
      })
      .populate({
        path: "ride",
        select: "from to date time",
      })
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    console.error(
      "GET MY ACCIDENT REPORTS ERROR:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =====================================================
// ADMIN - GET ALL ACCIDENT REPORTS
// =====================================================

const getAllAccidentReports = async (req, res) => {
  try {
    const reports = await AccidentReport.find()
      .populate(
        "user",
        "fullName email phone"
      )
      .populate({
        path: "booking",
        select: "status paymentStatus createdAt",
      })
      .populate({
        path: "ride",
        select: "from to date time driver",
        populate: {
          path: "driver",
          select: "fullName phone",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    console.error(
      "GET ALL ACCIDENT REPORTS ERROR:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =====================================================
// ADMIN - UPDATE ACCIDENT STATUS
// =====================================================

const updateAccidentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "under-review",
      "resolved",
      "rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid accident report status.",
      });
    }

    const report = await AccidentReport.findById(id);

    if (!report) {
      return res.status(404).json({
        message: "Accident report not found.",
      });
    }

    report.status = status;

    await report.save();

    res.status(200).json({
      message:
        "Accident report status updated successfully.",
      report,
    });
  } catch (error) {
    console.error(
      "UPDATE ACCIDENT STATUS ERROR:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createAccidentReport,
  getMyAccidentReports,
  getAllAccidentReports,
  updateAccidentStatus,
};