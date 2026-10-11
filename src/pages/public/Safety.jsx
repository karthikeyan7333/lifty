import { API_URL } from "../../config/api.js";
import { useEffect, useState } from "react";
import axios from "axios";

function Safety() {
  const [showProtection, setShowProtection] = useState(false);
  const [showAccidentForm, setShowAccidentForm] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [description, setDescription] = useState("");
  const [safetyStatus, setSafetyStatus] = useState("");
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [submittingReport, setSubmittingReport] = useState(false);

  // =====================================================
  // GET USER BOOKINGS
  // =====================================================

  const loadBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login to report an accident.");
        return;
      }

      setLoadingBookings(true);

      const response = await axios.get(
        `${API_URL}/api/bookings/my-bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(response.data);
    } catch (error) {
      console.error("GET BOOKINGS ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Unable to load your bookings."
      );
    } finally {
      setLoadingBookings(false);
    }
  };

  // =====================================================
  // OPEN ACCIDENT FORM
  // =====================================================

  const openAccidentForm = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login before reporting an accident.");
      return;
    }

    await loadBookings();

    setShowProtection(false);
    setShowAccidentForm(true);
  };

  // =====================================================
  // SUBMIT ACCIDENT REPORT
  // =====================================================

  const handleAccidentSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBooking) {
      alert("Please select the ride.");
      return;
    }

    if (!description.trim()) {
      alert("Please describe what happened.");
      return;
    }

    if (!safetyStatus) {
      alert("Please select your current safety status.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      setSubmittingReport(true);

      const response = await axios.post(
        `${API_URL}/api/accidents`,
        {
          bookingId: selectedBooking,
          description,
          safetyStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        response.data.message ||
          "Accident report submitted successfully."
      );

      // Clear form
      setSelectedBooking("");
      setDescription("");
      setSafetyStatus("");

      setShowAccidentForm(false);
    } catch (error) {
      console.error(
        "ACCIDENT REPORT ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to submit accident report."
      );
    } finally {
      setSubmittingReport(false);
    }
  };

  // =====================================================
  // EMERGENCY
  // =====================================================

  const handleEmergency = () => {
    const confirmed = window.confirm(
      "Are you sure you want to contact emergency services?"
    );

    if (!confirmed) return;

    window.location.href = "tel:112";
  };

  // =====================================================
  // SHARE
  // =====================================================

  const handleShare = async () => {
    const shareData = {
      title: "Lifty Ride",
      text: "I'm using Lifty for my ride.",
      url: window.location.origin,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text} ${shareData.url}`
        );

        alert("Lifty link copied to clipboard.");
      }
    } catch (error) {
      console.log("Share cancelled");
    }
  };

  // =====================================================
  // LOAD BOOKINGS WHEN ACCIDENT FORM OPENS
  // =====================================================

  useEffect(() => {
    if (showAccidentForm) {
      loadBookings();
    }
  }, [showAccidentForm]);

  return (
    <div>
      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="bg-light py-5">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-md-7">
              <span className="badge bg-success mb-3">
                🛡️ Lifty Safety
              </span>

              <h1 className="display-4 fw-bold text-dark">
                Your safety comes first.
              </h1>

              <p className="lead text-secondary mt-3">
                Lifty is designed to make shared travel
                comfortable, responsible, and safer for
                everyone using the platform.
              </p>
            </div>

            <div className="col-md-5 text-center mt-4 mt-md-0">
              <div className="bg-white rounded-4 shadow-sm p-5">
                <div style={{ fontSize: "80px" }}>
                  🛡️
                </div>

                <h4 className="fw-bold mt-3">
                  Travel With Confidence
                </h4>

                <p className="text-muted mb-0">
                  Stay aware. Travel responsibly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SAFETY FEATURES
      ===================================================== */}

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">
              Safety Features
            </h2>

            <p className="text-secondary">
              Simple features designed to support safer rides.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 text-center">
                <div style={{ fontSize: "45px" }}>
                  👤
                </div>

                <h5 className="fw-bold mt-3">
                  Verified Accounts
                </h5>

                <p className="text-muted mb-0">
                  User accounts help identify the people
                  participating in a shared ride.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 text-center">
                <div style={{ fontSize: "45px" }}>
                  📍
                </div>

                <h5 className="fw-bold mt-3">
                  Clear Trip Details
                </h5>

                <p className="text-muted mb-0">
                  Review the pickup location, destination,
                  date, and ride information before booking.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 text-center">
                <div style={{ fontSize: "45px" }}>
                  📞
                </div>

                <h5 className="fw-bold mt-3">
                  Stay Connected
                </h5>

                <p className="text-muted mb-0">
                  Keep important contacts informed about
                  your travel plans when appropriate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          LIFTY SAFETY PROTECTION
      ===================================================== */}

      <section className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-success mb-3">
              🛡️ Safety Protection
            </span>

            <h2 className="fw-bold">
              Lifty Safety Protection
            </h2>

            <p
              className="text-secondary mx-auto"
              style={{ maxWidth: "700px" }}
            >
              Helpful safety, accident-support, and protection
              information designed to support passengers during
              unexpected situations.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm p-4 text-center">
                <div style={{ fontSize: "42px" }}>
                  🚑
                </div>

                <h5 className="fw-bold mt-3">
                  Accident Support
                </h5>

                <p className="text-muted">
                  Guidance on what to do after an unexpected
                  accident during a ride.
                </p>

                <button
                  type="button"
                  className="btn btn-outline-success mt-auto"
                  onClick={() => setShowProtection(true)}
                >
                  Learn More
                </button>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm p-4 text-center">
                <div style={{ fontSize: "42px" }}>
                  🏥
                </div>

                <h5 className="fw-bold mt-3">
                  Medical Guidance
                </h5>

                <p className="text-muted">
                  Seek appropriate medical attention and keep
                  relevant medical documents when necessary.
                </p>

                <button
                  type="button"
                  className="btn btn-outline-success mt-auto"
                  onClick={() => setShowProtection(true)}
                >
                  View Guidance
                </button>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm p-4 text-center">
                <div style={{ fontSize: "42px" }}>
                  🛡️
                </div>

                <h5 className="fw-bold mt-3">
                  Insurance Information
                </h5>

                <p className="text-muted">
                  Understand how applicable accident insurance
                  coverage may work and why policy terms matter.
                </p>

                <button
                  type="button"
                  className="btn btn-outline-success mt-auto"
                  onClick={() => setShowProtection(true)}
                >
                  View Details
                </button>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm p-4 text-center">
                <div style={{ fontSize: "42px" }}>
                  📞
                </div>

                <h5 className="fw-bold mt-3">
                  Support
                </h5>

                <p className="text-muted">
                  Keep your ride and booking information available
                  when contacting Lifty support.
                </p>

                <button
                  type="button"
                  className="btn btn-outline-success mt-auto"
                  onClick={openAccidentForm}
                >
                  Report an Issue
                </button>
              </div>
            </div>
          </div>

          <div className="alert alert-info mt-5 mb-0 text-center">
            <strong>Important:</strong> Lifty Safety Protection is a
            safety-support feature. Any insurance coverage depends
            on the applicable insurance policy, terms, conditions,
            exclusions, and eligibility.
          </div>
        </div>
      </section>

      {/* =====================================================
          BEFORE YOUR RIDE
      ===================================================== */}

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">
              Before Your Ride
            </h2>

            <p className="text-secondary">
              A few simple precautions can make your journey better.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm mb-3">
                <div className="card-body p-4">
                  <h5 className="fw-bold">
                    ✅ Check the ride details
                  </h5>

                  <p className="text-muted mb-0">
                    Make sure the pickup point, destination,
                    date, and time are correct.
                  </p>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-3">
                <div className="card-body p-4">
                  <h5 className="fw-bold">
                    ✅ Meet in a suitable location
                  </h5>

                  <p className="text-muted mb-0">
                    Whenever possible, choose a public and
                    appropriate meeting point.
                  </p>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-3">
                <div className="card-body p-4">
                  <h5 className="fw-bold">
                    ✅ Keep someone informed
                  </h5>

                  <p className="text-muted mb-0">
                    Let someone you trust know about your
                    travel plans.
                  </p>
                </div>
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h5 className="fw-bold">
                    ✅ Trust your judgment
                  </h5>

                  <p className="text-muted mb-0">
                    If something feels unsafe or uncomfortable,
                    do not continue the journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EMERGENCY SECTION
      ===================================================== */}

      <section className="py-5">
        <div className="container">
          <div className="card border-danger shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5 text-center">
              <div style={{ fontSize: "50px" }}>
                🚨
              </div>

              <h2 className="fw-bold mt-3">
                Need Help?
              </h2>

              <p
                className="text-secondary mx-auto mt-3"
                style={{ maxWidth: "700px" }}
              >
                If you are in immediate danger, contact emergency
                services first. Your personal safety should always
                take priority.
              </p>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleEmergency}
                  className="btn btn-danger btn-lg px-5"
                >
                  🚨 Emergency Assistance
                </button>
              </div>

              <div className="row justify-content-center g-3 mt-3">
                <div className="col-md-5">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="btn btn-outline-primary btn-lg w-100"
                  >
                    📍 Share Lifty
                  </button>
                </div>

                <div className="col-md-5">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="btn btn-outline-secondary btn-lg w-100"
                  >
                    👤 Share With Someone
                  </button>
                </div>
              </div>

              <p className="text-muted small mt-4 mb-0">
                Lifty is a ride-sharing platform and does not
                replace emergency services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SAFETY REMINDER
      ===================================================== */}

      <section className="bg-light py-5">
        <div className="container text-center">
          <div style={{ fontSize: "45px" }}>
            🛡️
          </div>

          <h3 className="fw-bold mt-3">
            Share responsibly. Travel safely.
          </h3>

          <p className="text-secondary mb-0">
            Look out for yourself and the people travelling with you.
          </p>
        </div>
      </section>

      {/* =====================================================
          SAFETY PROTECTION MODAL
      ===================================================== */}

      {showProtection && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.55)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 rounded-4 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  🛡️ Lifty Safety Protection
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowProtection(false)}
                ></button>
              </div>

              <div className="modal-body p-4">
                <div className="alert alert-success">
                  <strong>Ride with more confidence.</strong>
                  <br />
                  This section provides safety and accident-support
                  information for Lifty users.
                </div>

                <h6 className="fw-bold mt-4">
                  🚑 If an accident happens
                </h6>

                <ul className="text-muted">
                  <li>
                    Move to a safe location when possible.
                  </li>

                  <li>
                    Contact emergency services when necessary.
                  </li>

                  <li>
                    Seek appropriate medical attention.
                  </li>

                  <li>
                    Keep your ride and booking information.
                  </li>

                  <li>
                    Keep relevant medical or incident documents.
                  </li>
                </ul>

                <h6 className="fw-bold mt-4">
                  🏥 Medical support
                </h6>

                <p className="text-muted">
                  Users should seek appropriate medical care after
                  an accident. Relevant medical records and
                  documentation may be useful for any applicable
                  support or insurance process.
                </p>

                <h6 className="fw-bold mt-4">
                  🛡️ Insurance information
                </h6>

                <p className="text-muted">
                  If an applicable accident-insurance policy is
                  associated with a ride, coverage depends on the
                  policy's terms, conditions, exclusions, and
                  eligibility requirements.
                </p>

                <div className="alert alert-warning mb-0">
                  <strong>Demo information:</strong> Lifty is not
                  currently claiming to provide an insurance policy
                  or guaranteed financial coverage.
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowProtection(false)}
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={openAccidentForm}
                >
                  🚨 Report an Accident
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          REAL ACCIDENT REPORT MODAL
      ===================================================== */}

      {showAccidentForm && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.55)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow">
              <form onSubmit={handleAccidentSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    🚨 Report an Accident
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() =>
                      setShowAccidentForm(false)
                    }
                  ></button>
                </div>

                <div className="modal-body p-4">
                  <div className="alert alert-warning">
                    If you are in immediate danger, contact
                    emergency services first.
                  </div>

                  {/* BOOKING */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Select Your Ride
                    </label>

                    {loadingBookings ? (
                      <div className="text-muted">
                        Loading your bookings...
                      </div>
                    ) : bookings.length === 0 ? (
                      <div className="alert alert-secondary mb-0">
                        You don't have any bookings available
                        for an accident report.
                      </div>
                    ) : (
                      <select
                        className="form-select"
                        value={selectedBooking}
                        onChange={(e) =>
                          setSelectedBooking(e.target.value)
                        }
                        required
                      >
                        <option value="">
                          Select a booking
                        </option>

                        {bookings
                          .filter(
                            (booking) =>
                              booking.status !== "cancelled"
                          )
                          .map((booking) => (
                            <option
                              key={booking._id}
                              value={booking._id}
                            >
                              {booking.ride?.from || "Unknown"} →{" "}
                              {booking.ride?.to || "Unknown"}{" "}
                              {booking.ride?.date
                                ? `• ${booking.ride.date}`
                                : ""}
                            </option>
                          ))}
                      </select>
                    )}
                  </div>

                  {/* DESCRIPTION */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      What happened?
                    </label>

                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Describe the incident..."
                      value={description}
                      onChange={(e) =>
                        setDescription(e.target.value)
                      }
                      required
                    ></textarea>
                  </div>

                  {/* SAFETY STATUS */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Are you currently safe?
                    </label>

                    <select
                      className="form-select"
                      value={safetyStatus}
                      onChange={(e) =>
                        setSafetyStatus(e.target.value)
                      }
                      required
                    >
                      <option value="">
                        Select an option
                      </option>

                      <option value="safe">
                        Yes, I am safe
                      </option>

                      <option value="need-help">
                        No, I need immediate help
                      </option>
                    </select>
                  </div>

                  <small className="text-muted">
                    Your report will be securely submitted to
                    Lifty and can be reviewed by the platform
                    administrator.
                  </small>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      setShowAccidentForm(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-danger"
                    disabled={
                      submittingReport ||
                      loadingBookings ||
                      bookings.length === 0
                    }
                  >
                    {submittingReport
                      ? "Submitting..."
                      : "Submit Accident Report"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Safety;