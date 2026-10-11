import { API_URL } from "../../config/api.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ProviderLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      const user = response.data.user;

      // Only providers can use this login
      if (user.role !== "provider") {
        alert("This account is not a provider account.");
        return;
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Provider login successful");

      navigate("/provider");
    } catch (error) {
      console.log("PROVIDER LOGIN ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Provider login failed"
      );
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">

          <div className="card border-0 shadow rounded-4 p-4">

            <div className="text-center mb-4">
              <h2 className="fw-bold">
                🚗 Provider Login
              </h2>

              <p className="text-secondary">
                Login to manage and share your rides.
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Login as Provider
              </button>

            </form>

            <p className="text-center mt-4 mb-0">
              New provider?{" "}

              <Link
                to="/provider-register"
                className="text-decoration-none"
              >
                Create Provider Account
              </Link>
            </p>

            <p className="text-center mt-2 mb-0">
              <Link
                to="/"
                className="text-decoration-none"
              >
                Back to Lifty
              </Link>
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProviderLogin;