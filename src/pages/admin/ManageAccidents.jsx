import { useEffect, useState } from "react";
import axios from "axios";

function ManageAccidents() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // =====================================================
  // FETCH ACCIDENT REPORTS
  // =====================================================

  const fetchReports = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/accidents/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReports(response.data);
    } catch (error) {
      console.error("FETCH ACCIDENT REPORTS ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Unable to load accident reports."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // =====================================================
  // UPDATE STATUS
  // =====================================================

  const updateStatus = async (id, status) => {
    try {
      setUpdating(true);

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `http://localhost:5000/api/accidents/admin/${id}/status`,
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

      setSelectedReport(null);

      fetchReports();
    } catch (error) {
      console.error(
        "UPDATE ACCIDENT STATUS ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to update report status."
      );
    } finally {
      setUpdating(false);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredReports = reports.filter((report) => {
    const searchText = search.toLowerCase();

    return (
      report.user?.fullName
        ?.toLowerCase()
        .includes(searchText) ||
      report.user?.email
        ?.toLowerCase()
        .includes(searchText) ||
      report.ride?.from
        ?.toLowerCase()
        .includes(searchText) ||
      report.ride?.to
        ?.toLowerCase()
        .includes(searchText) ||
      report.status
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  // =====================================================
  // STATUS BADGE
  // =====================================================

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="badge bg-warning text-dark">
            Pending
          </span>
        );

      case "under-review":
        return (
          <span className="badge bg-primary">
            Under Review
          </span>
        );

      case "resolved":
        return (
          <span className="badge bg-success">
            Resolved
          </span>
        );

      case "rejected":
        return (
          <span className="badge bg-danger">
            Rejected
          </span>
        );

      default:
        return (
          <span className="badge bg-secondary">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="container-fluid">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            🚨 Accident Reports
          </h2>

          <p className="text-secondary mb-0">
            Review and manage safety incidents reported by Lifty users.
          </p>
        </div>

        <span className="badge bg-warning text-dark px-3 py-2">
          {reports.filter(
            (report) => report.status === "pending"
          ).length}{" "}
          Pending
        </span>

      </div>

      {/* =================================================
          SEARCH
      ================================================= */}

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by passenger, email, route or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* =================================================
          REPORT TABLE
      ================================================= */}

      <div className="card shadow-sm border-0">

        <div className="card-body">

          {loading ? (
            <div className="text-center py-5">

              <div
                className="spinner-border text-primary"
                role="status"
              ></div>

              <p className="text-secondary mt-2 mb-0">
                Loading accident reports...
              </p>

            </div>
          ) : (
            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead>
                  <tr>
                    <th>Passenger</th>
                    <th>Route</th>
                    <th>Safety</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                      <tr key={report._id}>

                        {/* Passenger */}

                        <td>
                          <strong>
                            {report.user?.fullName ||
                              "Unknown"}
                          </strong>

                          <br />

                          <small className="text-muted">
                            {report.user?.email ||
                              "No email"}
                          </small>
                        </td>

                        {/* Route */}

                        <td>
                          {report.ride?.from || "-"} →{" "}
                          {report.ride?.to || "-"}
                        </td>

                        {/* Safety */}

                        <td>
                          {report.safetyStatus === "safe" ? (
                            <span className="badge bg-success">
                              🛡️ Safe
                            </span>
                          ) : (
                            <span className="badge bg-danger">
                              🚨 Needs Help
                            </span>
                          )}
                        </td>

                        {/* Status */}

                        <td>
                          {getStatusBadge(report.status)}
                        </td>

                        {/* Date */}

                        <td>
                          {report.createdAt
                            ? new Date(
                                report.createdAt
                              ).toLocaleDateString()
                            : "-"}
                        </td>

                        {/* Action */}

                        <td>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() =>
                              setSelectedReport(report)
                            }
                          >
                            View Details
                          </button>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-5"
                      >
                        <div className="fs-1 mb-2">
                          🛡️
                        </div>

                        <h5 className="fw-semibold">
                          No accident reports found
                        </h5>

                        <p className="text-secondary mb-0">
                          There are currently no reports matching
                          your search.
                        </p>
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>
      </div>

      {/* =================================================
          DETAILS MODAL
      ================================================= */}

      {selectedReport && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.55)",
          }}
        >

          <div className="modal-dialog modal-dialog-centered modal-lg">

            <div className="modal-content border-0 rounded-4 shadow">

              {/* Modal Header */}

              <div className="modal-header">

                <div>
                  <h5 className="modal-title fw-bold">
                    🚨 Accident Report Details
                  </h5>

                  <small className="text-muted">
                    Report ID: {selectedReport._id}
                  </small>
                </div>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setSelectedReport(null)
                  }
                ></button>

              </div>

              {/* Modal Body */}

              <div className="modal-body p-4">

                {/* User */}

                <div className="card border-0 bg-light mb-3">

                  <div className="card-body">

                    <h6 className="fw-bold">
                      👤 Passenger
                    </h6>

                    <p className="mb-1">
                      <strong>Name:</strong>{" "}
                      {selectedReport.user?.fullName ||
                        "Unknown"}
                    </p>

                    <p className="mb-1">
                      <strong>Email:</strong>{" "}
                      {selectedReport.user?.email ||
                        "Unknown"}
                    </p>

                    <p className="mb-0">
                      <strong>Phone:</strong>{" "}
                      {selectedReport.user?.phone ||
                        "Unknown"}
                    </p>

                  </div>

                </div>

                {/* Ride */}

                <div className="card border-0 bg-light mb-3">

                  <div className="card-body">

                    <h6 className="fw-bold">
                      🚗 Ride Information
                    </h6>

                    <p className="mb-1">
                      <strong>Route:</strong>{" "}
                      {selectedReport.ride?.from ||
                        "-"}{" "}
                      →{" "}
                      {selectedReport.ride?.to ||
                        "-"}
                    </p>

                    <p className="mb-1">
                      <strong>Date:</strong>{" "}
                      {selectedReport.ride?.date ||
                        "-"}
                    </p>

                    <p className="mb-0">
                      <strong>Time:</strong>{" "}
                      {selectedReport.ride?.time ||
                        "-"}
                    </p>

                  </div>

                </div>

                {/* Safety */}

                <div className="mb-3">

                  <h6 className="fw-bold">
                    🛡️ Current Safety Status
                  </h6>

                  {selectedReport.safetyStatus ===
                  "safe" ? (
                    <div className="alert alert-success mb-0">
                      The passenger reported that they
                      are currently safe.
                    </div>
                  ) : (
                    <div className="alert alert-danger mb-0">
                      🚨 The passenger reported that they
                      need immediate help.
                    </div>
                  )}

                </div>

                {/* Description */}

                <div className="mb-3">

                  <h6 className="fw-bold">
                    📝 Incident Description
                  </h6>

                  <div className="border rounded-3 p-3 bg-light">
                    {selectedReport.description}
                  </div>

                </div>

                {/* Current Status */}

                <div>

                  <h6 className="fw-bold mb-2">
                    📊 Current Report Status
                  </h6>

                  {getStatusBadge(
                    selectedReport.status
                  )}

                </div>

              </div>

              {/* Modal Footer */}

              <div className="modal-footer">

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    setSelectedReport(null)
                  }
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={updating}
                  onClick={() =>
                    updateStatus(
                      selectedReport._id,
                      "under-review"
                    )
                  }
                >
                  {updating
                    ? "Updating..."
                    : "Under Review"}
                </button>

                <button
                  type="button"
                  className="btn btn-success"
                  disabled={updating}
                  onClick={() =>
                    updateStatus(
                      selectedReport._id,
                      "resolved"
                    )
                  }
                >
                  Mark Resolved
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger"
                  disabled={updating}
                  onClick={() =>
                    updateStatus(
                      selectedReport._id,
                      "rejected"
                    )
                  }
                >
                  Reject
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default ManageAccidents;