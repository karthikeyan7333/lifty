import { Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardHome from "../pages/dashboard/DashboardHome";
import MyRides from "../pages/dashboard/MyRides";
import MyBookings from "../pages/dashboard/MyBookings";
import Profile from "../pages/dashboard/Profile";
import Settings from "../pages/dashboard/Settings";
import CreateRide from "../pages/dashboard/CreateRide";
import DemoPayment from "../pages/payment/DemoPayment";

import ProtectedRoute from "../pages/auth/ProtectedRoute";
import BookingDetails from "../pages/user/BookingDetails";

function DashboardRoutes() {
  return (
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute allowedRoles={["user"]}>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<DashboardHome />} />

      <Route path="my-rides" element={<MyRides />} />

      <Route path="my-bookings" element={<MyBookings />} />

      <Route path="create-ride" element={<CreateRide />} />

      <Route path="profile" element={<Profile />} />
      <Route
  path="payment/:bookingId"
  element={<DemoPayment />}
/>

      <Route path="settings" element={<Settings />} />

      <Route
        path="booking/:id"
        element={<BookingDetails />}
      />
    </Route>
  );
}

export default DashboardRoutes;