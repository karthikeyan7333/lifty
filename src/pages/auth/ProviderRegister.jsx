import { API_URL } from "../../config/api.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ProviderRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [idProof, setIdProof] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !phone || !password || !idProof) {
      alert("Please fill in all fields and upload your ID proof.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
  alert("Phone number must be exactly 10 digits.");
  return;
}

    try {
      const formData = new FormData();

      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("idProof", idProof);

      const response = await axios.post(
        `${API_URL}/api/auth/register-provider`,
        formData
      );

      alert(response.data.message);

      navigate("/provider-login");

    } catch (error) {
      console.log("PROVIDER REGISTER ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Provider registration failed"
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
                🚗 Become a Lifty Provider
              </h2>

              <p className="text-secondary">
                Create your provider account and submit
                your ID for verification.
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                />
              </div>


              {/* Email */}
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


              {/* Phone */}
<div className="mb-3">
  <label className="form-label">
    Phone Number
  </label>

  <input
    type="tel"
    className="form-control"
    placeholder="Enter 10-digit phone number"
    value={phone}
    maxLength={10}
    inputMode="numeric"
    onChange={(e) =>
      setPhone(e.target.value.replace(/\D/g, ""))
    }
  />

  <small className="text-secondary">
    Phone number must contain exactly 10 digits.
  </small>
</div>


              <div className="mb-3">
  <label className="form-label">
    Password
  </label>

  <div className="input-group">
    <input
      type={showPassword ? "text" : "password"}
      className="form-control"
      placeholder="Create a password"
      value={password}
      onChange={(e) =>
        setPassword(e.target.value)
      }
    />

    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={() =>
        setShowPassword(!showPassword)
      }
    >
      {showPassword ? "🙈 " : "👁️"}
    </button>
  </div>
</div>


             {/* ID Proof */}
<div className="mb-4">
  <label className="form-label fw-semibold">
    ID Proof
  </label>

  <input
    type="file"
    className="form-control"
    accept=".jpg,.jpeg,.png,.pdf"
    onChange={(e) => setIdProof(e.target.files[0])}
  />

  <small className="text-secondary">
    Upload your government ID proof. JPG, PNG or PDF. Maximum 5MB.
  </small>
</div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Submit for Verification
              </button>

            </form>


            <div className="alert alert-warning mt-4 mb-0">
              <strong>🛡️ Verification Required</strong>

              <div className="small mt-1">
                Your provider account must be approved by
                Lifty administration before you can create
                rides.
              </div>
            </div>


            <p className="text-center mt-4 mb-0">
              Already a provider?{" "}

              <Link
                to="/provider-login"
                className="text-decoration-none"
              >
                Provider Login
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

export default ProviderRegister;