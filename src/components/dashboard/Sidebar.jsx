import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    onClose();

    navigate("/login");
  };

  const handleNavigation = () => {
    // Close sidebar automatically on mobile
    onClose();
  };

  const linkClass = ({ isActive }) =>
    `nav-link text-white mb-2 dashboard-nav-link ${
      isActive ? "bg-primary rounded" : ""
    }`;

  return (
    <aside
      className={`dashboard-sidebar bg-dark text-white p-3 ${
        isOpen ? "sidebar-open" : ""
      }`}
    >

      {/* Logo */}
      <div className="fs-3 fw-bold mb-4">
        🚗 Lifty
      </div>

      {/* Close button - Mobile only */}
      <button
        type="button"
        className="btn btn-outline-light sidebar-close-btn"
        onClick={onClose}
      >
        <i className="bi bi-x-lg"></i>
      </button>

      <nav className="nav flex-column">

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          end
          className={linkClass}
          onClick={handleNavigation}
        >
          <i className="bi bi-house-door me-2"></i>
          Dashboard
        </NavLink>

        {/* My Rides */}
        <NavLink
          to="/dashboard/my-rides"
          className={linkClass}
          onClick={handleNavigation}
        >
          <i className="bi bi-car-front me-2"></i>
          My Rides
        </NavLink>

        {/* My Bookings */}
        <NavLink
          to="/dashboard/my-bookings"
          className={linkClass}
          onClick={handleNavigation}
        >
          <i className="bi bi-calendar-check me-2"></i>
          My Bookings
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/dashboard/profile"
          className={linkClass}
          onClick={handleNavigation}
        >
          <i className="bi bi-person-circle me-2"></i>
          Profile
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/dashboard/settings"
          className={linkClass}
          onClick={handleNavigation}
        >
          <i className="bi bi-gear me-2"></i>
          Settings
        </NavLink>

        {/* Create Ride */}
        <NavLink
          to="/dashboard/create-ride"
          className={linkClass}
          onClick={handleNavigation}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Create Ride
        </NavLink>

        <hr className="border-secondary" />

        {/* Website */}
        <NavLink
          to="/"
          className="nav-link text-white mb-2 dashboard-nav-link"
          onClick={handleNavigation}
        >
          <i className="bi bi-globe2 me-2"></i>
          Back to Website
        </NavLink>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="btn btn-outline-light btn-sm w-100"
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>

      </nav>
    </aside>
  );
}

export default Sidebar;