import { Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageRides from "../pages/admin/ManageRides";
import ManageBookings from "../pages/admin/ManageBookings";
import ManageAccidents from "../pages/admin/ManageAccidents";

function AdminRoutes() {
  return (
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
      <Route path="users" element={<ManageUsers />} />
      <Route path="rides" element={<ManageRides />} />
      <Route path="bookings" element={<ManageBookings />} />
      <Route path="accidents" element={<ManageAccidents />} />
    </Route>
  );
}

export default AdminRoutes;
