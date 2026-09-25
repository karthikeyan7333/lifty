import { Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import Login from "../pages/auth/Login";
import ProviderLogin from "../pages/auth/ProviderLogin";
import ProviderRegister from "../pages/auth/ProviderRegister";

import Home from "../pages/public/Home";
import Register from "../pages/auth/Register";
import FindRides from "../pages/public/FindRides";
import RideDetails from "../pages/public/RideDetails";
import About from "../pages/public/About";
import Safety from "../pages/public/Safety";

import BookingDetails from "../pages/user/BookingDetails";

function PublicRoutes() {
  return (
    <Route element={<PublicLayout />}>

      <Route path="/" element={<Home />} />

      <Route
        path="/find-rides"
        element={<FindRides />}
      />

      <Route
        path="/booking-details"
        element={<BookingDetails />}
      />

      <Route
        path="/ride-details/:id"
        element={<RideDetails />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />
<Route
  path="/provider-login"
  element={<ProviderLogin />}
/>

<Route
  path="/provider-register"
  element={<ProviderRegister />}
/>
      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/safety"
        element={<Safety />}
      />

    </Route>
  );
}

export default PublicRoutes;