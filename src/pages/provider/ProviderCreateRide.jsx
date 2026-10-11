import { API_URL } from "../../config/api.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProviderCreateRide() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    availableSeats: "",
    price: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/api/rides`,
        {
          from: formData.from,
          to: formData.to,
          date: formData.date,
          time: formData.time,
          availableSeats: Number(formData.availableSeats),
          price: Number(formData.price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      navigate("/provider/my-rides");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="fw-bold mb-4">Create Ride</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">From</label>
            <input
              className="form-control"
              name="from"
              value={formData.from}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">To</label>
            <input
              className="form-control"
              name="to"
              value={formData.to}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Available Seats</label>
            <input
              type="number"
              min="1"
              className="form-control"
              name="availableSeats"
              value={formData.availableSeats}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              min="0"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Ride
        </button>
      </form>
    </div>
  );
}

export default ProviderCreateRide;
