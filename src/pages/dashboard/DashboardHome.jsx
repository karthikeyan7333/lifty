import { API_URL } from "../config/api.js";
import { useEffect, useState } from "react";
import axios from "axios";

function DashboardHome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/api/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
      } catch (error) {
        console.log("Profile error:", error);
      }
    };

    fetchProfile();
  }, []);

  const fullName = user?.fullName || "User";

  return (
    <div>
      {/* Page Heading */}
      <div className="mb-4">
        <h1 className="fw-bold mb-1">
          Welcome back, {fullName} 👋
        </h1>

        <p className="text-secondary mb-0">
          Here's an overview of your Lifty activity.
        </p>
      </div>

      {/* Statistics */}
      <div className="row g-4 mb-5">
        <div className="col-lg-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <div className="fs-1 mb-3">🚗</div>

              <h2 className="fw-bold mb-1">
                12
              </h2>

              <p className="text-secondary mb-0">
                My Rides
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <div className="fs-1 mb-3">📅</div>

              <h2 className="fw-bold mb-1">
                8
              </h2>

              <p className="text-secondary mb-0">
                Bookings
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <div className="fs-1 mb-3">💰</div>

              <h2 className="fw-bold mb-1">
                ₹3,250
              </h2>

              <p className="text-secondary mb-0">
                Money Saved
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <div className="fs-1 mb-3">⭐</div>

              <h2 className="fw-bold mb-1">
                4.9
              </h2>

              <p className="text-secondary mb-0">
                Rating
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Ride */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4 p-md-5">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold mb-0">
              🚗 Upcoming Ride
            </h3>

            <span className="badge bg-primary px-3 py-2">
              Upcoming
            </span>
          </div>

          <div className="row gy-4">

            <div className="col-md-3">
              <small className="text-secondary">
                From
              </small>

              <h5 className="fw-semibold mb-0">
                Kollam
              </h5>
            </div>

            <div className="col-md-3">
              <small className="text-secondary">
                To
              </small>

              <h5 className="fw-semibold mb-0">
                Trivandrum
              </h5>
            </div>

            <div className="col-md-3">
              <small className="text-secondary">
                Date
              </small>

              <h5 className="fw-semibold mb-0">
                15 Aug 2026
              </h5>
            </div>

            <div className="col-md-3">
              <small className="text-secondary">
                Time
              </small>

              <h5 className="fw-semibold mb-0">
                09:30 AM
              </h5>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;