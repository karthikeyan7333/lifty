import { API_URL } from "../config/api.js";
import { useEffect, useState } from "react";
import axios from "axios";

function MyRides() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchMyRides = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/api/rides/my-rides`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRides(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyRides();
  }, []);
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this ride?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `${API_URL}/api/rides/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message);

    setRides(rides.filter((ride) => ride._id !== id));
  } catch (error) {
    alert(error.response?.data?.message || "Delete failed");
  }
};

  return (
    <div>
      <h2 className="fw-bold mb-4">🚗 My Rides</h2>

      {rides.length === 0 ? (
        <div className="alert alert-info">
          No rides found.
        </div>
      ) : (
        rides.map((ride) => (
          <div key={ride._id} className="card shadow-sm border-0 mb-3">
            <div className="card-body">
              <h5>
                {ride.from} → {ride.to}
              </h5>

              <p className="mb-1">
                <strong>Date:</strong> {ride.date}
              </p>

              <p className="mb-1">
                <strong>Time:</strong> {ride.time}
              </p>

              <p className="mb-1">
                <strong>Seats:</strong> {ride.availableSeats}
              </p>

              <p className="mb-3">
                <strong>Price:</strong> ₹{ride.price}
              </p>

              <button className="btn btn-primary btn-sm me-2">
                Edit
              </button>

              <button
  className="btn btn-danger btn-sm"
  onClick={() => handleDelete(ride._id)}
>
  Delete
</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyRides;