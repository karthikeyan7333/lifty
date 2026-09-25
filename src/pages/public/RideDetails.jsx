import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function RideDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

const [ride, setRide] = useState(null);

useEffect(() => {
  const fetchRide = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/rides/${id}`
      );

      setRide(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchRide();
}, [id]);
if (!ride) {
  return <h3 className="text-center mt-5">Loading...</h3>;
}
const handleBooking = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:5000/api/bookings",
      {
        rideId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message);

    const bookingId = response.data.booking._id;

    navigate(`/dashboard/payment/${bookingId}`);
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Booking failed"
    );
  }
};
  return (
    <section className="section-padding">
      <div className="container">
        <div className="row g-4">
          {/* Driver Details */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h2 className="fw-bold mb-4">Ride Details</h2>

              <div className="row gy-3">
                <div className="col-md-6">
                  <strong>Driver</strong>
                  <p>{ride.driver?.fullName}</p>
                </div>

                <div className="col-md-6">
                  <strong>Rating</strong>
                  <p>⭐ 4.8</p>
                </div>

                <div className="col-md-6">
                  <strong>From</strong>
                  <p>{ride.from}</p>
                </div>

                <div className="col-md-6">
                  <strong>To</strong>
                  <p>{ride.to}</p>
                </div>

                <div className="col-md-6">
                  <strong>Date</strong>
                  <p>{ride.date}</p>
                </div>

                <div className="col-md-6">
                  <strong>Time</strong>
                  <p>{ride.time}</p>
                </div>

                <div className="col-md-6">
                  <strong>Vehicle</strong>
                  <p>Swift Dzire</p>
                </div>

                <div className="col-md-6">
                  <strong>Seats Available</strong>
                 <p>{ride.availableSeats}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4">
             <h3 className="fw-bold text-primary">
  ₹{ride.price}
</h3>

              <p className="text-secondary">Per Seat</p>

             <button
  className="btn btn-primary w-100 mb-3"
  onClick={handleBooking}
>
  Book Ride
</button>

              <Link
                to="/find-rides"
                className="btn btn-outline-secondary w-100"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RideDetails;
