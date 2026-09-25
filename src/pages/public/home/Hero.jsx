import { Link, useNavigate } from "react-router-dom";
import heroIllustration from "../../../assets/images/lifty-hero-illustration.png";

function Hero() {
  const navigate = useNavigate();

  const handleProviderNavigation = () => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!token) {
    navigate("/provider-login");
    return;
  }

  const user = storedUser ? JSON.parse(storedUser) : null;

  if (user?.role === "provider") {
    navigate("/provider");
    return;
  }

  navigate("/provider-login");
};

  return (
    <section className="section-padding">
      <div className="container">
        <div className="row align-items-center gy-5">

          {/* Left Content */}
          <div className="col-lg-6">

            <span className="badge bg-primary px-3 py-2 mb-3">
              🚗 Ride Sharing Platform
            </span>

            <h1 className="display-3 fw-bold mb-3">
              Share a Lift.
              <br />
              <span className="text-primary">
                Save Together.
              </span>
            </h1>

            <p className="lead text-secondary mb-4">
              Find trusted ride partners, reduce travel costs, and
              enjoy a smarter, safer way to travel with Lifty.
            </p>

            <div className="d-flex flex-wrap gap-3 mb-5">

              <Link
                to="/find-rides"
                className="btn btn-primary btn-lg px-4"
              >
                Find a Ride
              </Link>

              <button
                type="button"
                className="btn btn-outline-primary btn-lg px-4"
                onClick={handleProviderNavigation}
              >
                Become a Provider
              </button>

            </div>

            {/* Value Points */}
            <div className="row mt-4 gy-3">

              <div className="col-md-4">
                <div className="text-center">
                  <i className="bi bi-piggy-bank-fill fs-2 text-primary"></i>

                  <h6 className="fw-bold mt-2">
                    Save Money
                  </h6>

                  <small className="text-secondary">
                    Share travel costs with others.
                  </small>
                </div>
              </div>

              <div className="col-md-4">
                <div className="text-center">
                  <i className="bi bi-shield-check fs-2 text-primary"></i>

                  <h6 className="fw-bold mt-2">
                    Verified Users
                  </h6>

                  <small className="text-secondary">
                    Travel with trusted members.
                  </small>
                </div>
              </div>

              <div className="col-md-4">
                <div className="text-center">
                  <i className="bi bi-credit-card-2-front fs-2 text-primary"></i>

                  <h6 className="fw-bold mt-2">
                    Secure Payments
                  </h6>

                  <small className="text-secondary">
                    Fast and secure online booking.
                  </small>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side - Hero Illustration */}
          <div className="col-lg-6">

            <div className="hero-image-wrapper">

              <img
                src={heroIllustration}
                alt="Lifty ride sharing"
                className="img-fluid hero-illustration"
              />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;