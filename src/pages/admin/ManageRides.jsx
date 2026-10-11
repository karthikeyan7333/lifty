import { API_URL } from "../config/api.js";
import { useEffect, useState } from "react";
import axios from "axios";

function ManageRides() {
  const [rides, setRides] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_URL}/api/admin/rides`,
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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_URL}/api/admin/rides/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRides((prev) =>
        prev.filter((ride) => ride._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredRides = rides.filter((ride) => {
    const searchText = search.toLowerCase();

    return (
      ride.driver?.fullName
        ?.toLowerCase()
        .includes(searchText) ||
      ride.from?.toLowerCase().includes(searchText) ||
      ride.to?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="container-fluid">

      <h2 className="fw-bold mb-4">
        🚗 Manage Rides
      </h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by driver, pickup or destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">

          <div className="table-responsive">
            <table className="table table-hover align-middle">

              <thead>
                <tr>
                  <th>Driver</th>
                  <th>Route</th>
                  <th>Date</th>
                  <th>Seats</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRides.length > 0 ? (
                  filteredRides.map((ride) => (
                    <tr key={ride._id}>

                      <td>
                        {ride.driver?.fullName || "Unknown"}
                      </td>

                      <td>
                        {ride.from} → {ride.to}
                      </td>

                      <td>{ride.date}</td>

                      <td>{ride.availableSeats}</td>

                      <td>₹{ride.price}</td>

                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(ride._id)
                          }
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-4"
                    >
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

export default ManageRides;