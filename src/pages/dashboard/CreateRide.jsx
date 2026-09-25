import { useState } from "react";
import axios from "axios";

function CreateRide() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    availableSeats: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/rides",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      setFormData({
        from: "",
        to: "",
        date: "",
        time: "",
        availableSeats: "",
        price: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <h2 className="fw-bold mb-4">Create Ride</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow">

        <input
          className="form-control mb-3"
          placeholder="From"
          name="from"
          value={formData.from}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="To"
          name="to"
          value={formData.to}
          onChange={handleChange}
        />

        <input
          type="date"
          className="form-control mb-3"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type="time"
          className="form-control mb-3"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Available Seats"
          name="availableSeats"
          value={formData.availableSeats}
          onChange={handleChange}
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <button className="btn btn-primary">
          Create Ride
        </button>

      </form>
    </div>
  );
}

export default CreateRide;