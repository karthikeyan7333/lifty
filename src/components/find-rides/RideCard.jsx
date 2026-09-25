import { Link } from "react-router-dom";

function RideCard({ ride }) {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
        <div className="row align-items-center">

          <div className="col-lg-8">

            <div className="d-flex justify-content-between mb-3">

              <h5 className="fw-bold mb-0">
                👤 {ride.driver?.fullName}
              </h5>

              <span className="badge bg-success">
                💺 {ride.availableSeats} Seats
              </span>

            </div>

            <p>📍 {ride.from} → {ride.to}</p>

            <p>📅 {ride.date}</p>

            <p>🕒 {ride.time}</p>

            <p>📞 {ride.driver?.phone}</p>

          </div>

          <div className="col-lg-4 text-lg-end">

            <h4 className="text-primary fw-bold">
              ₹{ride.price}
            </h4>

            <Link
              to={`/ride-details/${ride._id}`}
              className="btn btn-primary"
            >
              View Details
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

export default RideCard;