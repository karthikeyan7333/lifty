import { useNavigate } from "react-router-dom";
// import providerIllustration from "../../../assets/images/lifty-hero.png";
import liftyAnimation from "../../../assets/videos/lifty-ride-animation.mp4";
function BecomeProvider() {
  const navigate = useNavigate();

  const handleProviderNavigation = () => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  // Not logged in → Provider Login
  if (!token) {
    navigate("/provider-login");
    return;
  }

  const user = storedUser ? JSON.parse(storedUser) : null;

  // Already a provider → Provider Dashboard
  if (user?.role === "provider") {
    navigate("/provider");
    return;
  }

  // Logged-in normal user → Provider Login
  navigate("/provider-login");
};

  return (
    <section className="section-padding">
      <div className="container">
        <div className="row align-items-center gy-5">

          {/* Left Content */}
          <div className="col-lg-6">

            <span className="badge bg-primary px-3 py-2 mb-3">
              🚗 Become a Lift Provider
            </span>

            <h2 className="fw-bold mb-3">
              Share Your Ride.
              <br />
              Earn While You Travel.
            </h2>

            <p className="text-secondary mb-4">
              Have empty seats on your journey? Publish your ride,
              help fellow travelers, and recover your travel costs
              while making every trip more meaningful.
            </p>

            <button
              type="button"
              className="btn btn-primary btn-lg px-4"
              onClick={handleProviderNavigation}
            >
              Start Sharing Rides
            </button>

          </div>

          {/* Right Side - Provider Illustration
          <div className="col-lg-6">
            <div className="provider-image-wrapper">
              <img
                src={providerIllustration}
                alt="Lifty ride provider helping travelers"
                className="img-fluid provider-illustration"
              />
            </div>
          </div> */}

          {/* Right Side - Provider Animation */}
<div className="col-lg-6">
  <div className="provider-image-wrapper">
    <video
      src={liftyAnimation}
      autoPlay
      loop
      muted
      playsInline
      className="img-fluid provider-illustration"
      aria-label="Lifty ride sharing animation"
    />
  </div>
</div>

        </div>
      </div>
    </section>
  );
}

export default BecomeProvider;