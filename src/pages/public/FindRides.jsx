import { useState } from "react";

import SearchBar from "../../components/find-rides/SearchBar";
import RideList from "../../components/find-rides/RideList";
import RideMap from "../../components/map/RideMap";

function FindRides() {
  // What the user is typing
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // What the user actually searched
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");

  const handleSearch = () => {
    if (!from || !to) {
      alert("Please enter both pickup and destination.");
      return;
    }

    setSearchFrom(from);
    setSearchTo(to);
  };

  return (
    <section className="section-padding">
      <div className="container">

        <div className="text-center mb-5">
          <h1 className="fw-bold">
            Find Your Ride
          </h1>

          <p className="text-secondary">
            Search for available rides across Kerala.
          </p>
        </div>

        <SearchBar
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
          onSearch={handleSearch}
        />

        <RideMap
          searchFrom={searchFrom}
          searchTo={searchTo}
        />

        <RideList
          from={searchFrom}
          to={searchTo}
        />

      </div>
    </section>
  );
}

export default FindRides;