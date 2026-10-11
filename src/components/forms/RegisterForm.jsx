import { API_URL } from "../../config/api.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [captchaId, setCaptchaId] = useState("");
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // =====================================================
  // LOAD CAPTCHA
  // =====================================================

  const loadCaptcha = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/auth/captcha`
      );

      setCaptchaId(response.data.captchaId);
      setCaptchaQuestion(response.data.question);
      setCaptchaAnswer("");
    } catch (error) {
      console.error("CAPTCHA ERROR:", error);

      alert("Unable to load CAPTCHA.");
    }
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  // =====================================================
  // GENERATE OTP
  // =====================================================

  const handleGenerateOtp = async () => {
    if (!fullName || !email || !phone || !password) {
      alert("Please fill in all fields.");
      return;
    }
const passwordRegex =
  /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

if (!passwordRegex.test(password)) {
  alert(
    "Password must be at least 8 characters and contain at least one number and one special character."
  );
  return;
}
    if (!captchaAnswer) {
      alert("Please solve the CAPTCHA.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/auth/register/request-otp`,
        {
          fullName,
          email,
          phone,
          password,
          captchaId,
          captchaAnswer,
        }
      );

      // DEMO OTP
      alert(
        `DEMO OTP\n\nYour OTP is: ${response.data.otp}\n\nThis OTP is valid for 5 minutes.`
      );

      setOtpSent(true);

      // Generate a new CAPTCHA
      loadCaptcha();
    } catch (error) {
      console.error("OTP ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Unable to generate OTP."
      );

      // Refresh CAPTCHA after failed attempt
      loadCaptcha();
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // VERIFY OTP
  // =====================================================

  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/auth/register/verify-otp`,
        {
          email,
          otp,
        }
      );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      console.error("VERIFY OTP ERROR:", error);

      alert(
        error.response?.data?.message ||
          "OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (otpSent) {
          handleVerifyOtp();
        } else {
          handleGenerateOtp();
        }
      }}
    >
      {/* FULL NAME */}

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
          disabled={otpSent}
        />
      </div>

      {/* EMAIL */}

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
          disabled={otpSent}
        />
      </div>

      {/* PHONE */}

      <div className="mb-3">
        <label className="form-label">
          Phone Number
        </label>

        <input
          type="tel"
          className="form-control"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          disabled={otpSent}
        />
      </div>

      {/* PASSWORD */}

      <div className="mb-3">
        <label className="form-label">
          Password
        </label>

        <input
          type="password"
          className="form-control"
          placeholder="Create a password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          disabled={otpSent}
        />
        <small className="text-muted">
  Minimum 8 characters, including at least one number
  and one special character.
</small>
      </div>

      {/* CAPTCHA */}

      {!otpSent && (
        <div className="mb-3">
          <label className="form-label">
            CAPTCHA
          </label>

          <div className="d-flex gap-2 align-items-center mb-2">
            <div
              className="border rounded px-3 py-2 bg-light fw-bold"
              style={{
                minWidth: "150px",
              }}
            >
              {captchaQuestion || "Loading..."}
            </div>

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={loadCaptcha}
              title="Refresh CAPTCHA"
            >
              ↻
            </button>
          </div>

          <input
            type="text"
            className="form-control"
            placeholder="Enter CAPTCHA answer"
            value={captchaAnswer}
            onChange={(e) =>
              setCaptchaAnswer(e.target.value)
            }
          />
        </div>
      )}

      {/* OTP */}

      {otpSent && (
        <div className="mb-3">
          <label className="form-label">
            Enter OTP
          </label>

          <input
            type="text"
            className="form-control text-center"
            placeholder="Enter 6-digit OTP"
            maxLength="6"
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value.replace(/\D/g, "")
              )
            }
          />

          <small className="text-muted">
            Demo OTP is valid for 5 minutes.
          </small>
        </div>
      )}

      {/* MAIN BUTTON */}

      {!otpSent ? (
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading
            ? "Generating OTP..."
            : "Generate OTP"}
        </button>
      ) : (
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading
            ? "Verifying..."
            : "Verify OTP & Create Account"}
        </button>
      )}

      {/* LOGIN */}

      <p className="text-center mt-4 mb-0">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-decoration-none"
        >
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;