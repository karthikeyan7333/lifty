const steps = [
  {
    icon: "bi-search",
    title: "Search a Ride",
    description:
      "Search for available rides based on your destination, date, and time.",
  },
  {
    icon: "bi-calendar-check",
    title: "Book Your Seat",
    description:
      "Choose your preferred ride, reserve your seat, and complete the booking.",
  },
  {
    icon: "bi-car-front-fill",
    title: "Travel Together",
    description:
      "Meet your lift provider and enjoy a safe, comfortable, and affordable journey.",
  },
];

function HowItWorks() {
  return (
    <section className="section-padding bg-light">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">How Lifty Works</h2>
          <p className="text-secondary">
            Start your journey in just three simple steps.
          </p>
        </div>

        <div className="row g-4">

          {steps.map((step, index) => (
            <div className="col-lg-4" key={index}>
              <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center">

                <div className="mb-3">
                  <span className="badge bg-primary rounded-circle p-3 fs-5">
                    {index + 1}
                  </span>
                </div>

                <div className="mb-3">
                  <i className={`${step.icon} fs-1 text-primary`}></i>
                </div>

                <h4 className="fw-bold">
                  {step.title}
                </h4>

                <p className="text-secondary mb-0">
                  {step.description}
                </p>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;