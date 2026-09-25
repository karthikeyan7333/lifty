const features = [
  {
    icon: "bi-car-front-fill",
    title: "Easy Ride Sharing",
    description:
      "Publish your ride and share available seats with other travelers.",
  },
  {
    icon: "bi-search",
    title: "Smart Ride Search",
    description:
      "Find rides quickly based on your destination, date, and seat availability.",
  },
  {
    icon: "bi-shield-check",
    title: "Safe & Secure",
    description:
      "Travel confidently with verified users and secure online payments.",
  },
];

function Features() {
  return (
    <section className="section-padding">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">Why Choose Lifty?</h2>
          <p className="text-secondary">
            Everything you need for a comfortable and affordable ride-sharing experience.
          </p>
        </div>

        <div className="row g-4">

          {features.map((feature, index) => (
            <div className="col-md-4" key={index}>
              <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center">

                <div className="mb-3">
                  <i className={`${feature.icon} fs-1 text-primary`}></i>
                </div>

                <h4 className="fw-bold">
                  {feature.title}
                </h4>

                <p className="text-secondary mb-0">
                  {feature.description}
                </p>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;