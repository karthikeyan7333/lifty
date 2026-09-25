import { Route } from "react-router-dom";

import ProviderLayout from "../layouts/ProviderLayout";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import ProviderBookings from "../pages/provider/ProviderBookings";
import ProviderCreateRide from "../pages/provider/ProviderCreateRide";
import ProviderDashboard from "../pages/provider/ProviderDashboard";
import ProviderEarnings from "../pages/provider/ProviderEarnings";
import ProviderMyRides from "../pages/provider/ProviderMyRides";
import ProviderProfile from "../pages/provider/ProviderProfile";
import ProviderSettings from "../pages/provider/ProviderSettings";

function ProviderRoutes() {
  return (
    <Route
      path="/provider"
      element={
        <ProtectedRoute allowedRoles={["provider"]}>
          <ProviderLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<ProviderDashboard />} />
      <Route path="create-ride" element={<ProviderCreateRide />} />
      <Route path="my-rides" element={<ProviderMyRides />} />
      <Route path="bookings" element={<ProviderBookings />} />
      <Route path="earnings" element={<ProviderEarnings />} />
      <Route path="profile" element={<ProviderProfile />} />
      <Route path="settings" element={<ProviderSettings />} />
    </Route>
  );
}

export default ProviderRoutes;
