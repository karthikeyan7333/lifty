import { API_URL } from "../../config/api.js";
import { useEffect, useState } from "react";
import axios from "axios";

function ProviderEarnings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/bookings/provider`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookings(response.data);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load earnings");
      }
    };

    fetchBookings();
  }, []);

  const totalPassengers = bookings.reduce(
    (total, booking) => total + Number(booking.seatsBooked || 0),
    0
  );
  const totalEarnings = bookings.reduce(
    (total, booking) => total + Number(booking.seatsBooked || 0) * Number(booking.ride?.price || 0),
    0
  );

  return (
    <div className="container-fluid">
      <h2 className="fw-bold mb-1">Earnings</h2>
      <p className="text-secondary mb-4">Revenue calculated from passenger bookings for your rides.</p>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100"><div className="card-body p-4">
            <small className="text-secondary text-uppercase">Total earnings</small>
            <h2 className="fw-bold mt-2 mb-0">Rs. {totalEarnings}</h2>
          </div></div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100"><div className="card-body p-4">
            <small className="text-secondary text-uppercase">Passengers served</small>
            <h2 className="fw-bold mt-2 mb-0">{totalPassengers}</h2>
          </div></div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Booking revenue</h5>
          <div className="table-responsive"><table className="table align-middle mb-0">
            <thead><tr><th>Ride</th><th>Passenger</th><th>Seats</th><th>Fare</th><th>Amount</th></tr></thead>
            <tbody>{bookings.length > 0 ? bookings.map((booking) => {
              const fare = Number(booking.ride?.price || 0);
              const seats = Number(booking.seatsBooked || 0);
              return <tr key={booking._id}><td>{booking.ride?.from || "-"} to {booking.ride?.to || "-"}</td><td>{booking.user?.fullName || "Unknown"}</td><td>{seats}</td><td>Rs. {fare}</td><td className="fw-semibold">Rs. {fare * seats}</td></tr>;
            }) : <tr><td colSpan="5" className="text-center text-secondary py-4">No passenger bookings yet.</td></tr>}</tbody>
          </table></div>
        </div>
      </div>
    </div>
  );
}

export default ProviderEarnings;
