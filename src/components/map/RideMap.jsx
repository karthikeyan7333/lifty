import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function MapUpdater({ locations }) {
  const map = useMap();

  useEffect(() => {
    if (locations.length === 2) {
      const bounds = locations.map((location) => [
        location.lat,
        location.lon,
      ]);

      map.fitBounds(bounds, {
        padding: [50, 50],
      });
    }
  }, [locations, map]);

  return null;
}

function RideMap({ searchFrom, searchTo }) {
 const [locations, setLocations] = useState([]);
const [route, setRoute] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
  const defaultPosition = [10.8505, 76.2711];

  useEffect(() => {
    const getLocations = async () => {
      if (!searchFrom || !searchTo) {
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/rides/geocode?from=${encodeURIComponent(
            searchFrom
          )}&to=${encodeURIComponent(searchTo)}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Could not find locations"
          );
        }

        setLocations([
          data.from,
          data.to,
        ]);
        setRoute(data.route || []);
      } catch (error) {
        console.error("MAP ERROR:", error);
        setError(error.message);
        setLocations([]);
        setRoute([]);
      } finally {
        setLoading(false);
      }
    };

    getLocations();
  }, [searchFrom, searchTo]);

  return (
    <div className="mt-4">

      <h4 className="fw-bold mb-3">
        🗺️ Ride Location
      </h4>

      {loading && (
        <p className="text-secondary">
          Finding locations...
        </p>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <MapContainer
        center={defaultPosition}
        zoom={7}
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "12px",
        }}
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater locations={locations} />

        {route.length > 0 && (
  <Polyline
    positions={route}
    pathOptions={{
      weight: 5,
    }}
  />
)}
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[
              location.lat,
              location.lon,
            ]}
          >
            <Popup>
              📍 {location.name}
            </Popup>
          </Marker>
        ))}

      </MapContainer>

    </div>
  );
}

export default RideMap;