import { Routes } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import DashboardRoutes from "./DashboardRoutes";
import AdminRoutes from "./AdminRoutes";
import ProviderRoutes from "./ProviderRoutes";

function AppRoutes() {
  return (
    <Routes>
      {PublicRoutes()}
      {DashboardRoutes()}
      {AdminRoutes()}
      {ProviderRoutes()}
    </Routes>
  );
}

export default AppRoutes;
