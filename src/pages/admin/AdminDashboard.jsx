import { API_URL } from "../config/api.js";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRides: 0,
    totalBookings: 0,
  });

  const [pendingProviders, setPendingProviders] = useState([]);
  const [loadingProviders, setLoadingProviders] = useState(true);

  // Fetch dashboard statistics
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_URL}/api/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);
    } catch (error) {
      console.error("Admin dashboard error:", error);
    }
  };

  // Fetch pending providers
  const fetchPendingProviders = async () => {
    try {
      setLoadingProviders(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_URL}/api/admin/providers/pending`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPendingProviders(response.data.providers);
    } catch (error) {
      console.error("Pending providers error:", error);

      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    } finally {
      setLoadingProviders(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchPendingProviders();
  }, []);

  // Approve / Reject provider
  const updateProviderStatus = async (providerId, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${API_URL}/api/admin/providers/${providerId}/verification`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      // Refresh pending providers
      fetchPendingProviders();

      // Refresh statistics
      fetchStats();
    } catch (error) {
      console.error("Provider verification error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update provider verification"
      );
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="fw-bold mb-1">
          Admin Dashboard
        </h1>

        <p className="text-secondary mb-0">
          Manage and monitor your Lifty platform.
        </p>
      </div>

      {/* Statistics */}
      <div className="row g-4 mb-5">

        {/* Total Users */}
        <div className="col-lg-4 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">

              <div className="fs-1 mb-3">
                <i className="bi bi-people"></i>
              </div>

              <h2 className="fw-bold mb-1">
                {stats.totalUsers}
              </h2>

              <p className="text-secondary mb-0">
                Total Users
              </p>

            </div>
          </div>
        </div>

        {/* Total Rides */}
        <div className="col-lg-4 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">

              <div className="fs-1 mb-3">
                <i className="bi bi-car-front"></i>
              </div>

              <h2 className="fw-bold mb-1">
                {stats.totalRides}
              </h2>

              <p className="text-secondary mb-0">
                Total Rides
              </p>

            </div>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="col-lg-4 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">

              <div className="fs-1 mb-3">
                <i className="bi bi-calendar-check"></i>
              </div>

              <h2 className="fw-bold mb-1">
                {stats.totalBookings}
              </h2>

              <p className="text-secondary mb-0">
                Total Bookings
              </p>

            </div>
          </div>
        </div>

      </div>

      {/* Platform Overview */}
      <div className="card border-0 shadow-sm mb-5">

        <div className="card-body p-4 p-md-5">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h3 className="fw-bold mb-1">
                Platform Overview
              </h3>

              <p className="text-secondary mb-0">
                Monitor the current activity on Lifty.
              </p>
            </div>

            <span className="badge bg-primary px-3 py-2">
              Live
            </span>

          </div>

          <div className="row gy-4">

            <div className="col-md-4">
              <small className="text-secondary">
                Registered Users
              </small>

              <h5 className="fw-semibold mb-0">
                {stats.totalUsers}
              </h5>
            </div>

            <div className="col-md-4">
              <small className="text-secondary">
                Available Rides
              </small>

              <h5 className="fw-semibold mb-0">
                {stats.totalRides}
              </h5>
            </div>

            <div className="col-md-4">
              <small className="text-secondary">
                Total Bookings
              </small>

              <h5 className="fw-semibold mb-0">
                {stats.totalBookings}
              </h5>
            </div>

          </div>

        </div>
      </div>

      {/* Provider Verification */}
      <div className="card border-0 shadow-sm">

        <div className="card-body p-4 p-md-5">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h3 className="fw-bold mb-1">
                Provider Verification
              </h3>

              <p className="text-secondary mb-0">
                Review providers waiting for approval.
              </p>
            </div>

            <span className="badge bg-warning text-dark px-3 py-2">
              {pendingProviders.length} Pending
            </span>

          </div>

          {/* Loading */}
          {loadingProviders && (
            <div className="text-center py-4">
              <div
                className="spinner-border text-primary"
                role="status"
              ></div>

              <p className="text-secondary mt-2 mb-0">
                Loading providers...
              </p>
            </div>
          )}

          {/* No pending providers */}
          {!loadingProviders &&
            pendingProviders.length === 0 && (
              <div className="text-center py-5">

                <div className="fs-1 mb-3">
                  ✅
                </div>

                <h5 className="fw-semibold">
                  No pending providers
                </h5>

                <p className="text-secondary mb-0">
                  All provider verification requests
                  have been reviewed.
                </p>

              </div>
            )}

          {/* Pending Providers */}
          {!loadingProviders &&
            pendingProviders.length > 0 && (
              <div className="row g-4">

                {pendingProviders.map((provider) => (
                  <div
                    className="col-lg-6"
                    key={provider._id}
                  >
                    <div className="border rounded-4 p-4 h-100">

                      <div className="d-flex justify-content-between align-items-start mb-3">

                        <div>
                          <h5 className="fw-bold mb-1">
                            {provider.fullName}
                          </h5>

                          <span className="badge bg-warning text-dark">
                            Pending Verification
                          </span>
                        </div>

                        <i className="bi bi-person-badge fs-2"></i>

                      </div>

                      <div className="mb-3">

                        <p className="mb-2">
                          <strong>Email:</strong>{" "}
                          {provider.email}
                        </p>

                        <p className="mb-2">
                          <strong>Phone:</strong>{" "}
                          {provider.phone}
                        </p>

                      </div>

                      {/* ID Proof */}
                      <div className="mb-4">

                        <p className="fw-semibold mb-2">
                          ID Proof
                        </p>

                        {provider.idProof ? (
                          <a
                            href={`${API_URL}/uploads/${provider.idProof}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary"
                          >
                            <i className="bi bi-file-earmark-text me-2"></i>
                            View ID Proof
                          </a>
                        ) : (
                          <span className="text-danger">
                            ID proof not available
                          </span>
                        )}

                      </div>

                      {/* Actions */}
                      <div className="d-flex gap-2">

                        <button
                          className="btn btn-success flex-grow-1"
                          onClick={() =>
                            updateProviderStatus(
                              provider._id,
                              "approved"
                            )
                          }
                        >
                          <i className="bi bi-check-circle me-2"></i>
                          Approve
                        </button>

                        <button
                          className="btn btn-outline-danger flex-grow-1"
                          onClick={() =>
                            updateProviderStatus(
                              provider._id,
                              "rejected"
                            )
                          }
                        >
                          <i className="bi bi-x-circle me-2"></i>
                          Reject
                        </button>

                      </div>

                    </div>
                  </div>
                ))}

              </div>
            )}

        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;