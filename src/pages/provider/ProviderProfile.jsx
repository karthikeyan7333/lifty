import { API_URL } from "../config/api.js";
import { useEffect, useState } from "react";
import axios from "axios";

function ProviderProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load profile");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="container-fluid">
      <h2 className="fw-bold mb-1">Provider Profile</h2>
      <p className="text-secondary mb-4">Your account details used for your ride offers.</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card shadow-sm border-0"><div className="card-body p-4"><div className="row g-4">
        <div className="col-md-6"><label className="form-label">Full Name</label><input className="form-control" value={user?.fullName || ""} readOnly /></div>
        <div className="col-md-6"><label className="form-label">Email</label><input className="form-control" value={user?.email || ""} readOnly /></div>
        <div className="col-md-6"><label className="form-label">Phone</label><input className="form-control" value={user?.phone || ""} readOnly /></div>
        <div className="col-md-6"><label className="form-label">Account Role</label><input className="form-control text-capitalize" value={user?.role || "provider"} readOnly /></div>
      </div></div></div>
    </div>
  );
}

export default ProviderProfile;
