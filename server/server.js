const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const rideRoutes = require("./routes/rideRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const accidentRoutes = require("./routes/accidentRoutes");

connectDB();

const app = express();

const allowedOrigins = new Set(
  [process.env.FRONTEND_URL, "http://localhost:5173", "http://127.0.0.1:5173"]
    .filter(Boolean)
    .map((origin) => origin.replace(/\/$/, ""))
);

app.use(
  cors({
    origin(origin, callback) {
      // Requests without an Origin header (for example, server-to-server health checks)
      // are not subject to browser CORS enforcement.
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error("Origin not allowed by CORS"));
    },
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/accidents", accidentRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Lifty Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
