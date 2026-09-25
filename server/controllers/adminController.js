const User = require("../models/User");
const Ride = require("../models/Ride");
const Booking = require("../models/Booking");

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRides = await Ride.countDocuments();
    const totalBookings = await Booking.countDocuments();

    res.status(200).json({
      totalUsers,
      totalRides,
      totalBookings,
    });
  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// Get pending providers
const getPendingProviders = async (req, res) => {
  try {
    const providers = await User.find({
      role: "provider",
      verificationStatus: "pending",
    }).select("-password");

    res.status(200).json({
      providers,
    });
  } catch (error) {
    console.error("GET PENDING PROVIDERS ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// Approve or reject provider
const updateProviderVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid verification status",
      });
    }

    const provider = await User.findOne({
      _id: id,
      role: "provider",
    });

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    provider.verificationStatus = status;

    await provider.save();

    res.status(200).json({
      message:
        status === "approved"
          ? "Provider approved successfully"
          : "Provider rejected successfully",
      provider,
    });
  } catch (error) {
    console.error("UPDATE PROVIDER VERIFICATION ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


module.exports = {
  getDashboardStats,
  getPendingProviders,
  updateProviderVerification,
};