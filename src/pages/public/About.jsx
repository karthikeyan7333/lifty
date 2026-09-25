import aboutIllustration from "../../assets/images/lifty-about-illustration.png";

function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-light py-5">
        <div className="container py-5">
          <div className="row align-items-center g-5">

            {/* Left Side */}
            <div className="col-lg-6">
              <span className="badge bg-primary mb-3">
                🚗 About Lifty
              </span>

              <h1 className="display-4 fw-bold text-dark">
                Share the ride.
                <br />
                Save together.
              </h1>

              <p className="lead text-secondary mt-3">
                Lifty is a simple ride-sharing platform that helps
                people find and share rides conveniently while
                reducing travel costs.
              </p>
            </div>

            {/* Right Side - Illustration */}
<div className="col-lg-6 text-center">
  <img
    src={aboutIllustration}
    alt="Lifty ride sharing illustration"
    className="img-fluid"
    style={{
      width: "100%",
      maxWidth: "560px",
      height: "auto",
      display: "block",
      margin: "0 auto",
    }}
  />
</div>

          </div>
        </div>
      </section>

      {/* About Lifty */}
      <section className="py-5">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold">
              What is Lifty?
            </h2>

            <p
              className="text-secondary mx-auto"
              style={{ maxWidth: "700px" }}
            >
              Lifty connects passengers and ride providers,
              making everyday travel more affordable,
              convenient, and community-driven.
            </p>
          </div>

          <div className="row g-4">

            {/* Connect */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 text-center">
                <div style={{ fontSize: "45px" }}>
                  🤝
                </div>

                <h5 className="fw-bold mt-3">
                  Connect
                </h5>

                <p className="text-muted mb-0">
                  Find people travelling along the same
                  route and share the journey.
                </p>
              </div>
            </div>

            {/* Save Money */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 text-center">
                <div style={{ fontSize: "45px" }}>
                  💰
                </div>

                <h5 className="fw-bold mt-3">
                  Save Money
                </h5>

                <p className="text-muted mb-0">
                  Share travel expenses and make your
                  everyday journeys more affordable.
                </p>
              </div>
            </div>

            {/* Travel Smarter */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 text-center">
                <div style={{ fontSize: "45px" }}>
                  🌱
                </div>

                <h5 className="fw-bold mt-3">
                  Travel Smarter
                </h5>

                <p className="text-muted mb-0">
                  Fewer cars on the road means more
                  efficient and sustainable travel.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How Lifty Works */}
      <section className="bg-light py-5">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold">
              How Lifty Works
            </h2>

            <p className="text-secondary">
              Sharing a ride is simple.
            </p>
          </div>

          <div className="row g-4 text-center">

            {/* Step 1 */}
            <div className="col-md-3">
              <div className="fw-bold text-primary fs-3">
                1
              </div>

              <h5 className="fw-bold mt-2">
                Find a Ride
              </h5>

              <p className="text-muted">
                Search for rides based on your
                pickup and destination.
              </p>
            </div>

            {/* Step 2 */}
            <div className="col-md-3">
              <div className="fw-bold text-primary fs-3">
                2
              </div>

              <h5 className="fw-bold mt-2">
                Choose
              </h5>

              <p className="text-muted">
                Select a ride that matches your
                schedule and requirements.
              </p>
            </div>

            {/* Step 3 */}
            <div className="col-md-3">
              <div className="fw-bold text-primary fs-3">
                3
              </div>

              <h5 className="fw-bold mt-2">
                Book
              </h5>

              <p className="text-muted">
                Reserve your seat and complete
                the booking process.
              </p>
            </div>

            {/* Step 4 */}
            <div className="col-md-3">
              <div className="fw-bold text-primary fs-3">
                4
              </div>

              <h5 className="fw-bold mt-2">
                Travel
              </h5>

              <p className="text-muted">
                Meet your ride partner and enjoy
                the journey.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-5">
        <div className="container">

          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-5 text-center">

              <div style={{ fontSize: "50px" }}>
                ❤️
              </div>

              <h2 className="fw-bold mt-3">
                Our Mission
              </h2>

              <p
                className="text-secondary mx-auto mt-3"
                style={{ maxWidth: "750px" }}
              >
                Our goal is to make shared travel easier,
                safer, and more accessible by connecting
                people who are heading in the same direction.
              </p>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default About;