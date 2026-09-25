import { Link, useNavigate } from "react-router-dom";

function CTA() {
  const navigate = useNavigate();

  const handleProviderNavigation = () => {
    navigate(localStorage.getItem("token") ? "/provider" : "/login");
  };

  return (
    <section className="section-padding">
      <div className="container">
        <div className="card border-0 shadow rounded-4 bg-primary text-white p-5 text-center">

          <h2 className="fw-bold mb-3">
            Ready to Start Your Journey?
          </h2>

          <p className="mb-4">
            Join Lifty today to find affordable rides or share your own journey
            with fellow travelers.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link
              to="/find-rides"
              className="btn btn-light btn-lg px-4"
            >
              Find a Ride
            </Link>

            <button
              type="button"
              className="btn btn-outline-light btn-lg px-4"
              onClick={handleProviderNavigation}
            >
              Become a Provider
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CTA;
