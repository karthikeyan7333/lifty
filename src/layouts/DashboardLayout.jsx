import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/layout/Topbar";


import "./dashboard.css";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout d-flex min-vh-100">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="dashboard-overlay"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {/* Main Content */}
      <div className="dashboard-main flex-grow-1 bg-light min-vh-100">

        <Topbar
          onMenuClick={toggleSidebar}
        />

        <main className="dashboard-content p-4">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;