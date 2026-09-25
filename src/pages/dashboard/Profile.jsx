import { useEffect, useState } from "react";
import axios from "axios";
function Profile() {
    const [user, setUser] = useState(null);
    useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchProfile();
}, []);
  return (
    <div className="container-fluid">

      <h2 className="fw-bold mb-4">
        👤 My Profile
      </h2>

      <div className="card shadow-sm border-0">
        <div className="card-body">

          <div className="row g-4">

            <div className="col-md-6">
              <label className="form-label">
                Full Name
              </label>

              <input
                type="text"
                className="form-control"
                value={user?.fullName || ""}
                readOnly
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
               value={user?.email || ""}
                readOnly
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Phone
              </label>

              <input
                type="text"
                className="form-control"
               value={user?.phone || ""}
                readOnly
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Role
              </label>

              <input
                type="text"
                className="form-control"
                value={user?.role || ""}
                readOnly
              />
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

export default Profile;