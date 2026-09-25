import { useEffect, useState } from "react";
import axios from "axios";

function ProviderBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProviderBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/bookings/provider",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Unable to load bookings");
      }
    };

    fetchProviderBookings();
  }, []);

  return (
    <div className="container-fluid">
      <h2 className="fw-bold mb-4">Bookings</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Passenger</th>
                  <th>Ride Route</th>
                  <th>Date</th>
                  <th>Seats Booked</th>
                  <th>Booking Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.user?.fullName || "Unknown"}</td>
                      <td>
                        {booking.ride?.from || "-"} to {booking.ride?.to || "-"}
                      </td>
                      <td>{booking.ride?.date || "-"}</td>
                      <td>{booking.seatsBooked}</td>
                      <td>
                        <span className="badge text-bg-secondary text-capitalize">
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderBookings;
