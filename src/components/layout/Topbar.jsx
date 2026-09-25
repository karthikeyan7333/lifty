function Topbar({ onMenuClick }) {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const fullName = user?.fullName || "User";

  return (
    <header className="dashboard-topbar d-flex justify-content-between align-items-center bg-white shadow-sm px-4 py-3">

      {/* Left Side */}
      <div className="d-flex align-items-center gap-3">

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="btn btn-outline-primary mobile-menu-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <i className="bi bi-list"></i>
        </button>

        <div>
          <h4 className="fw-bold mb-0">
            Dashboard
          </h4>

          <small className="text-secondary">
            Welcome back to Lifty 🚗
          </small>
        </div>

      </div>


      {/* Right Side */}
      <div className="d-flex align-items-center gap-3">

        <span className="fw-semibold dashboard-user-name">
          {fullName}
        </span>

        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            fullName
          )}&background=0D6EFD&color=fff`}
          alt="User profile"
          width="40"
          height="40"
          className="rounded-circle"
        />

      </div>

    </header>
  );
}

export default Topbar;