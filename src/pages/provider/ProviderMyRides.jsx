import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProviderMyRides() {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyRides = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/rides/my-rides",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRides(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Unable to load rides");
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
        `http://localhost:5000/api/rides/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      setRides((currentRides) =>
        currentRides.filter((ride) => ride._id !== id)
      );
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="fw-bold mb-4">My Rides</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Available Seats</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {rides.length > 0 ? (
                  rides.map((ride) => (
                    <tr key={ride._id}>
                      <td>{ride.from}</td>
                      <td>{ride.to}</td>
                      <td>{ride.date}</td>
                      <td>{ride.time}</td>
                      <td>{ride.availableSeats}</td>
                      <td>Rs. {ride.price}</td>
                      <td>
                        <Link
                          to={`/ride-details/${ride._id}`}
                          className="btn btn-outline-primary btn-sm me-2"
                        >
                          View
                        </Link>

                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(ride._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No rides found.
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

export default ProviderMyRides;
