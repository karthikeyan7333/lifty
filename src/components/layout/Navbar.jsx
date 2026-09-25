import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const dashboardPath =
    user?.role === "provider"
      ? "/provider"
      : user?.role === "admin"
      ? "/admin"
      : "/dashboard";

  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Apply theme
  useEffect(() => {
    const theme = darkMode ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container">

        {/* Logo */}
        <Link
  className="navbar-brand fw-bold text-primary d-flex align-items-center"
  to="/"
>
  <img
    src="/logo.png"
    alt="Lifty"
    style={{
      width: "42px",
      height: "42px",
      objectFit: "contain",
      marginRight: "8px",
    }}
  />

  <span>Lifty</span>
</Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/find-rides">
                Find Rides
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/safety">
                Safety
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to={isLoggedIn ? "/provider" : "/login"}
              >
                Provider
              </Link>
            </li>

          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-2">

            {/* Theme Toggle */}
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setDarkMode((prev) => !prev)}
              title={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <i className="bi bi-sun-fill"></i>
              ) : (
                <i className="bi bi-moon-fill"></i>
              )}
            </button>

            {/* Authentication */}
            {isLoggedIn ? (
              <>
                <Link
                  to={dashboardPath}
                  className="btn btn-outline-primary"
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-primary"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn btn-primary"
                >
                  Sign Up
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;