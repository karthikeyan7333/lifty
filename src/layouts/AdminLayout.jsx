import { NavLink, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `nav-link text-white mb-2 ${isActive ? "bg-primary rounded" : ""}`;

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-md-2 bg-dark text-white min-vh-100 p-3">
          <h4 className="fw-bold mb-4">
            <i className="bi bi-person-badge me-2"></i>
            Admin
          </h4>

          <nav className="nav flex-column">
            <NavLink to="/admin" end className={linkClass}>
              <i className="bi bi-house-door me-2"></i>
              Dashboard
            </NavLink>

            <NavLink to="/admin/users" className={linkClass}>
              <i className="bi bi-people me-2"></i>
              Users
            </NavLink>

            <NavLink to="/admin/rides" className={linkClass}>
              <i className="bi bi-car-front me-2"></i>
              Rides
            </NavLink>

            <NavLink to="/admin/bookings" className={linkClass}>
              <i className="bi bi-calendar-check me-2"></i>
              Bookings
            </NavLink>
            <NavLink to="/admin/accidents" className={linkClass}>
              <i className="bi bi-shield-exclamation me-2"></i>
              Accident Reports
            </NavLink>

            <hr className="border-secondary" />

            {/* Back to Website */}
            <NavLink to="/" className="nav-link text-white mb-2">
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
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-0 bg-light min-vh-100">
          {/* Topbar */}
          <header className="d-flex justify-content-between align-items-center bg-white shadow-sm px-4 py-3">
            <div>
              <h4 className="fw-bold mb-0">Admin Dashboard</h4>

              <small className="text-secondary">
                Manage your Lifty platform
              </small>
            </div>

            <div className="d-flex align-items-center gap-3">
              <span className="fw-semibold">Admin</span>

              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              >
                AD
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
