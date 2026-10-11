import { API_URL } from "../config/api.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
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

      console.log("Response:", response.data);

      // Save token
      localStorage.setItem("token", response.data.token);

      // Save user data
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      const user = response.data.user;

      console.log("Logged in user:", user);
      console.log("User role:", user.role);

      alert(response.data.message);

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "provider") {
        navigate("/provider");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
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

      <div className="text-end mb-3">
        <Link
          to="/forgot-password"
          className="text-decoration-none"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
      >
        Login
      </button>

      <p className="text-center mt-4 mb-0">
        Don't have an account?{" "}

        <Link
          to="/register"
          className="text-decoration-none"
        >
          Register
        </Link>
      </p>

    </form>
  );
}

export default LoginForm;
