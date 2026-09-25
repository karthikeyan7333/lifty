import { useEffect, useState } from "react";
import axios from "axios";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/admin/bookings",
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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/admin/bookings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings((prev) =>
        prev.filter((booking) => booking._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const searchText = search.toLowerCase();

    return (
      booking.user?.fullName
        ?.toLowerCase()
        .includes(searchText) ||
      booking.ride?.driver?.fullName
        ?.toLowerCase()
        .includes(searchText) ||
      booking.ride?.from
        ?.toLowerCase()
        .includes(searchText) ||
      booking.ride?.to
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  return (
    <div className="container-fluid">

      <h2 className="fw-bold mb-4">
        📅 Manage Bookings
      </h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by passenger, driver, pickup or destination..."
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
                  <th>Passenger</th>
                  <th>Driver</th>
                  <th>Route</th>
                  <th>Date</th>
                  <th>Seats</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking._id}>

                      <td>
                        {booking.user?.fullName || "Unknown"}
                      </td>

                      <td>
                        {booking.ride?.driver?.fullName || "Unknown"}
                      </td>

                      <td>
                        {booking.ride?.from || "-"} →{" "}
                        {booking.ride?.to || "-"}
                      </td>

                      <td>
                        {booking.ride?.date || "-"}
                      </td>

                      <td>
                        {booking.seatsBooked || 0}
                      </td>

                      <td>
                        ₹{booking.ride?.price || 0}
                      </td>

                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(booking._id)
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
                      colSpan="7"
                      className="text-center py-4"
                    >
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

export default ManageBookings;