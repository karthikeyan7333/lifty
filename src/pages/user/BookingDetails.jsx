import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/bookings/my-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const foundBooking = response.data.find(
          (item) => item._id === id
        );

        if (!foundBooking) {
          alert("Booking not found");
          navigate("/dashboard/my-bookings");
          return;
        }

        setBooking(foundBooking);
      } catch (error) {
        console.error(error);
        alert("Unable to load booking");
        navigate("/dashboard/my-bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id, navigate]);

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancelling(true);

      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/bookings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      navigate("/dashboard/my-bookings");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Cancellation failed"
      );
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container text-center py-5">
          <h4>Loading booking...</h4>
        </div>
      </section>
    );
  }

  if (!booking) {
    return null;
  }

  return (
    <section className="section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">

            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5">

              <div className="text-center mb-4">
                <h2 className="fw-bold">
                  Booking Details
                </h2>

                <span
                  className={`badge ${
                    booking.status === "confirmed"
                      ? "bg-success"
                      : booking.status === "cancelled"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="row gy-4">

                <div className="col-md-6">
                  <strong>Passenger</strong>
                  <p className="mb-0">
                    {booking.user?.fullName || "You"}
                  </p>
                </div>

                <div className="col-md-6">
                  <strong>Driver</strong>
                  <p className="mb-0">
                    {booking.ride?.driver?.fullName ||
                      "Provider"}
                  </p>
                </div>

                <div className="col-md-6">
                  <strong>From</strong>
                  <p className="mb-0">
                    {booking.ride?.from}
                  </p>
                </div>

                <div className="col-md-6">
                  <strong>To</strong>
                  <p className="mb-0">
                    {booking.ride?.to}
                  </p>
                </div>

                <div className="col-md-6">
                  <strong>Date</strong>
                  <p className="mb-0">
                    {booking.ride?.date}
                  </p>
                </div>

                <div className="col-md-6">
                  <strong>Time</strong>
                  <p className="mb-0">
                    {booking.ride?.time}
                  </p>
                </div>

                <div className="col-md-6">
                  <strong>Seats</strong>
                  <p className="mb-0">
                    {booking.seatsBooked}
                  </p>
                </div>

                <div className="col-md-6">
                  <strong>Amount</strong>
                  <p className="mb-0 text-primary fw-bold">
                    ₹{booking.amount}
                  </p>
                </div>

                <div className="col-md-6">
                  <strong>Payment</strong>
                  <p className="mb-0">
                    {booking.paymentStatus === "paid"
                      ? "✅ Paid"
                      : "⏳ Pending"}
                  </p>
                </div>

                <div className="col-md-6">
                  <strong>Booking ID</strong>
                  <p className="mb-0 small">
                    {booking._id}
                  </p>
                </div>

              </div>

              <hr className="my-4" />

              <div className="d-grid gap-3">

  {booking.paymentStatus !== "paid" &&
    booking.status !== "cancelled" && (
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={() => navigate(`/dashboard/payment/${booking._id}`)}
      >
        Pay ₹{booking.amount}
      </button>
    )}

  {booking.status === "confirmed" && (
    <button
      type="button"
      className="btn btn-danger btn-lg"
      onClick={handleCancel}
      disabled={cancelling}
    >
      {cancelling
        ? "Cancelling..."
        : "Cancel Booking"}
    </button>
  )}

  <Link
    to="/dashboard/my-bookings"
    className="btn btn-outline-secondary"
  >
    Back to My Bookings
  </Link>

</div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingDetails;