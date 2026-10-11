import { API_URL } from "../config/api.js";
import { useEffect, useState } from "react";
import axios from "axios";
import RideCard from "./RideCard";

function RideList({ from, to }) {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/rides`
        );

        setRides(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRides();
  }, []);

  const filteredRides = rides.filter((ride) => {
    return (
      ride.from.toLowerCase().includes(from.toLowerCase()) &&
      ride.to.toLowerCase().includes(to.toLowerCase())
    );
  });

  return (
    <section className="py-5">
      <div className="container">

        <h2 className="fw-bold mb-4">
          Available Rides
        </h2>

        {filteredRides.length > 0 ? (
          filteredRides.map((ride) => (
            <RideCard
              key={ride._id}
              ride={ride}
            />
          ))
        ) : (
          <div className="text-center">

            <h3 className="fw-bold mt-3">
              No rides found
            </h3>

            <p className="text-secondary">
              Try changing your pickup or destination.
            </p>

          </div>
        )}

      </div>
    </section>
  );
}

export default RideList;