import { API_URL } from "../config/api.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

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
        console.log(error);
      }
    };

    fetchBookings();
  }, []);
  const handleCancel = async (bookingId) => {
  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmCancel) return;

  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `${API_URL}/api/bookings/${bookingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message);

    setBookings(
      bookings.filter((booking) => booking._id !== bookingId)
    );
  } catch (error) {
    alert(error.response?.data?.message || "Cancel failed");
  }
};

  return (
    <div className="container-fluid">
      <h2 className="fw-bold mb-4">📅 My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="alert alert-info">
          No bookings found.
        </div>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="card shadow-sm border-0 mb-3"
          >
            <div className="card-body">
              <div className="row">

                <div className="col-md-3">
  <strong>Provider</strong>

  <p className="mb-1">
    {booking.ride?.driver?.fullName ||
      "Provider unavailable"}
  </p>

  {booking.ride?.driver?.phone ? (
    <a
      href={`tel:${booking.ride.driver.phone}`}
      className="text-decoration-none"
    >
      📞 {booking.ride.driver.phone}
    </a>
  ) : (
    <small className="text-muted">
      Phone unavailable
    </small>
  )}
</div>
                <div className="col-md-3">
                  <strong>Route</strong>
                  <p>
                    {booking.ride.from} → {booking.ride.to}
                  </p>
                </div>

                <div className="col-md-2">
                  <strong>Date</strong>
                  <p>{booking.ride.date}</p>
                </div>

                <div className="col-md-2">
                  <strong>Fare</strong>
                  <p>₹{booking.amount}</p>
                </div>

                <div className="col-md-2">
                  <strong>Seats</strong>
                  <p>{booking.seatsBooked}</p>
                </div>

              </div>

             <button
  className="btn btn-outline-danger btn-sm"
  onClick={() => handleCancel(booking._id)}
>
  Cancel Booking
</button>
<Link
  to={`/dashboard/booking/${booking._id}`}
  className="btn btn-primary btn-sm ms-2"
>
  View Details
</Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;