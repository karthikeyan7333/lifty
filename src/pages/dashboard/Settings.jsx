import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2 className="fw-bold mb-4">⚙️ Settings</h2>

      <div className="card shadow-sm border-0">
        <div className="card-body">

          <div className="mb-4">
            <h5>Change Password</h5>

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Current Password"
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="New Password"
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Confirm New Password"
            />

            <button className="btn btn-primary">
              Update Password
            </button>
          </div>

          <hr />

          <div className="mt-4">
            <h5>Account</h5>

            <button
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;