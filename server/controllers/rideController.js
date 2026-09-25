const Ride = require("../models/Ride");

const createRide = async (req, res) => {
  
  try {
    const {
      from,
      to,
      date,
      time,
      availableSeats,
      price,
    } = req.body;

    const newRide = await Ride.create({
      driver: req.user.id,
      from,
      to,
      date,
      time,
      availableSeats,
      price,
    });

    res.status(201).json({
      message: "Ride created successfully",
      ride: newRide,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getMyRides = async (req, res) => {
  try {
    const rides = await Ride.find({
      driver: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find()
      .populate("driver", "fullName phone")
      .sort({ createdAt: -1 });

    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
const adminDeleteRide = async (req, res) => {
  try {
    await Ride.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Ride deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getRideById = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id)
      .populate("driver", "fullName phone email");

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
const deleteRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    if (ride.driver.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await Ride.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Ride deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
const geocodeRideLocations = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        message: "From and To locations are required",
      });
    }

    const geocode = async (place) => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=${encodeURIComponent(
          place + ", India"
        )}`,
        {
          headers: {
            "User-Agent": "Lifty-Ride-Sharing-App/1.0",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Location service unavailable");
      }

      const data = await response.json();

      if (data.length === 0) {
        return null;
      }

      return {
        name: place,
        lat: Number(data[0].lat),
        lon: Number(data[0].lon),
      };
    };

    // Find starting location
    const fromLocation = await geocode(from);

    // Nominatim asks public API users to keep requests to at most
    // one request per second.
    await new Promise((resolve) => setTimeout(resolve, 1100));

    // Find destination
    const toLocation = await geocode(to);

    if (!fromLocation || !toLocation) {
      return res.status(404).json({
        message: "Could not find one or both locations",
      });
    }

    // Get actual driving route from OSRM
    const routeResponse = await fetch(
      `https://router.project-osrm.org/route/v1/driving/` +
        `${fromLocation.lon},${fromLocation.lat};` +
        `${toLocation.lon},${toLocation.lat}` +
        `?overview=full&geometries=geojson`
    );

    if (!routeResponse.ok) {
      throw new Error("Routing service unavailable");
    }

    const routeData = await routeResponse.json();

    if (
      routeData.code !== "Ok" ||
      !routeData.routes ||
      routeData.routes.length === 0
    ) {
      return res.status(404).json({
        message: "Could not find a driving route",
      });
    }

    const route = routeData.routes[0];

    // OSRM GeoJSON coordinates are [longitude, latitude].
    // Leaflet needs [latitude, longitude].
    const routeCoordinates = route.geometry.coordinates.map(
      ([lon, lat]) => [lat, lon]
    );

    res.status(200).json({
      from: fromLocation,
      to: toLocation,
      route: routeCoordinates,
      distance: route.distance,
      duration: route.duration,
    });
  } catch (error) {
    console.error("GEOCODE / ROUTE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createRide,
  getMyRides,
  getAllRides,
  getRideById,
  deleteRide,
  adminDeleteRide,
  geocodeRideLocations,

};