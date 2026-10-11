import { API_URL } from "../../config/api.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import StatsCard from "../../components/ui/StatsCard";

function ProviderDashboard() {
  const [rides, setRides] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const fullName = user?.fullName || "Provider";

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [ridesResponse, bookingsResponse] = await Promise.all([
          axios.get(`${API_URL}/api/rides/my-rides`, config),
          axios.get(`${API_URL}/api/bookings/provider`, config),
        ]);

        setRides(ridesResponse.data);
        setBookings(bookingsResponse.data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Unable to load provider dashboard"
        );
      }
    };

    fetchProviderData();
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const upcomingRides = rides
    .filter((ride) => ride.date >= today)
    .sort((firstRide, secondRide) => {
      const firstDate = `${firstRide.date}T${firstRide.time || "00:00"}`;
      const secondDate = `${secondRide.date}T${secondRide.time || "00:00"}`;

      return new Date(firstDate) - new Date(secondDate);
    });
  const bookedSeatsByRide = bookings.reduce((totals, booking) => {
    const rideId = booking.ride?._id;

    if (rideId) {
      totals[rideId] = (totals[rideId] || 0) + Number(booking.seatsBooked || 0);
    }

    return totals;
  }, {});
  const totalPassengers = bookings.reduce(
    (total, booking) => total + Number(booking.seatsBooked || 0),
    0
  );
  const totalEarnings = bookings.reduce(
    (total, booking) =>
      total + Number(booking.seatsBooked || 0) * Number(booking.ride?.price || 0),
    0
  );
  const recentRides = [...rides].slice(0, 5);

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold">Welcome, {fullName}</h2>
        <p className="text-secondary mb-0">
          Here is an overview of the rides you offer and the passengers you serve.
        </p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4">
        <div className="col-lg-3 col-md-6">
          <StatsCard
            title="Total Rides"
            value={rides.length}
            icon={<i className="bi bi-car-front"></i>}
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <StatsCard
            title="Active / Upcoming Rides"
            value={upcomingRides.length}
            icon={<i className="bi bi-calendar-event"></i>}
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <StatsCard
            title="Total Passengers"
            value={totalPassengers}
            icon={<i className="bi bi-people"></i>}
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <StatsCard
            title="Total Earnings"
            value={`Rs. ${totalEarnings}`}
            icon={<i className="bi bi-cash-stack"></i>}
          />
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3 gap-3">
        <div>
          <h4 className="fw-bold mb-1">Upcoming rides</h4>
          <p className="text-secondary mb-0">Your next scheduled trips and current passenger demand.</p>
        </div>
        <Link to="/provider/create-ride" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Create Ride
        </Link>
      </div>

      <div className="card shadow-sm border-0 mb-5">
        <div className="card-body p-0">
          {upcomingRides.length > 0 ? (
            <div className="list-group list-group-flush">
              {upcomingRides.slice(0, 5).map((ride) => {
                const bookedSeats = bookedSeatsByRide[ride._id] || 0;

                return (
                  <div key={ride._id} className="list-group-item p-4">
                    <div className="d-flex flex-wrap justify-content-between gap-3">
                      <div>
                        <h5 className="mb-1">
                          {ride.from} <i className="bi bi-arrow-right mx-1"></i> {ride.to}
                        </h5>
                        <span className="text-secondary">
                          <i className="bi bi-calendar3 me-2"></i>{ride.date}
                          <i className="bi bi-clock ms-3 me-2"></i>{ride.time}
                        </span>
                      </div>
                      <div className="text-md-end">
                        <div className="fw-semibold">Rs. {ride.price} per seat</div>
                        <small className="text-secondary">
                          {ride.availableSeats} available · {bookedSeats} booked
                        </small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-5">
              <i className="bi bi-car-front fs-1 text-secondary"></i>
              <h5 className="mt-3">No upcoming rides</h5>
              <p className="text-secondary">Offer a ride to start receiving passenger bookings.</p>
              <Link to="/provider/create-ride" className="btn btn-primary">Create your first ride</Link>
            </div>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1">Recent rides</h4>
          <p className="text-secondary mb-0">Your most recently created ride offers.</p>
        </div>
        <Link to="/provider/my-rides" className="btn btn-outline-primary btn-sm">View all rides</Link>
      </div>

      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th className="ps-4">Route</th>
                <th>Date & time</th>
                <th>Seats</th>
                <th className="pe-4">Fare</th>
              </tr>
            </thead>
            <tbody>
              {recentRides.length > 0 ? (
                recentRides.map((ride) => (
                  <tr key={ride._id}>
                    <td className="ps-4">{ride.from} to {ride.to}</td>
                    <td>{ride.date} · {ride.time}</td>
                    <td>{ride.availableSeats} available · {bookedSeatsByRide[ride._id] || 0} booked</td>
                    <td className="pe-4">Rs. {ride.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-secondary py-4">No rides created yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProviderDashboard;
