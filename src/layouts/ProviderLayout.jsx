import { NavLink, Outlet, useNavigate } from "react-router-dom";

function ProviderLayout() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const fullName = user?.fullName || "Provider";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `nav-link text-white mb-2 ${isActive ? "bg-primary rounded" : ""}`;

  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-md-2 bg-dark text-white min-vh-100 p-3">
          <h4 className="fw-bold mb-4">Provider</h4>

          <nav className="nav flex-column">
            <NavLink to="/provider" end className={linkClass}>
              <i className="bi bi-house-door me-2"></i>
              Dashboard
            </NavLink>

            <NavLink to="/provider/create-ride" className={linkClass}>
              <i className="bi bi-car-front me-2"></i>
              Create Ride
            </NavLink>

            <NavLink to="/provider/my-rides" className={linkClass}>
              <i className="bi bi-list-check me-2"></i>
              My Rides
            </NavLink>

            <NavLink to="/provider/bookings" className={linkClass}>
              <i className="bi bi-calendar-check me-2"></i>
              Passenger Bookings
            </NavLink>

            <NavLink to="/provider/earnings" className={linkClass}>
              <i className="bi bi-cash-stack me-2"></i>
              Earnings
            </NavLink>

            <NavLink to="/provider/profile" className={linkClass}>
              <i className="bi bi-person-circle me-2"></i>
              Profile
            </NavLink>

            <NavLink to="/provider/settings" className={linkClass}>
              <i className="bi bi-gear me-2"></i>
              Settings
            </NavLink>

            <hr className="border-secondary" />

            <NavLink to="/" className="nav-link text-white mb-2">
              <i className="bi bi-globe2 me-2"></i>
              Back to Website
            </NavLink>

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

        <div className="col-md-10 p-0 bg-light min-vh-100">
          <header className="d-flex justify-content-between align-items-center bg-white shadow-sm px-4 py-3">
            <div>
              <h4 className="fw-bold mb-0">Provider Dashboard</h4>
              <small className="text-secondary">Manage your Lifty rides</small>
            </div>

            <div className="d-flex align-items-center gap-3">
              <span className="fw-semibold">{fullName}</span>

              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  fullName
                )}&background=0D6EFD&color=fff`}
                alt="Provider profile"
                width="40"
                height="40"
                className="rounded-circle"
              />
            </div>
          </header>

          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProviderLayout;
