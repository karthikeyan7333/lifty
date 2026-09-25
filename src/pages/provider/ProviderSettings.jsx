import { useNavigate } from "react-router-dom";

function ProviderSettings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <h2 className="fw-bold mb-1">Settings</h2>
      <p className="text-secondary mb-4">Manage your provider session.</p>
      <div className="card shadow-sm border-0"><div className="card-body p-4">
        <h5 className="fw-bold">Account</h5>
        <p className="text-secondary">Sign out of this provider account on this browser.</p>
        <button type="button" onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
      </div></div>
    </div>
  );
}

export default ProviderSettings;
