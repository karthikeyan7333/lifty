import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-light pt-4 pb-3 mt-auto border-top">
      <div className="container">

        <div className="row">

          {/* Brand */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold text-primary">
              🚗 Lifty
            </h5>

            <p className="text-muted mb-0">
              Share your ride. Save together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold">
              Quick Links
            </h6>

            <ul className="list-unstyled">

              <li className="mb-1">
                <Link
                  to="/"
                  className="text-decoration-none"
                >
                  Home
                </Link>
              </li>

              <li className="mb-1">
                <Link
                  to="/find-rides"
                  className="text-decoration-none"
                >
                  Find Rides
                </Link>
              </li>

              <li className="mb-1">
                <Link
                  to="/about"
                  className="text-decoration-none"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/safety"
                  className="text-decoration-none"
                >
                  Safety
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold">
              Contact
            </h6>

            <p className="mb-1">
              support@lifty.com
            </p>

            <p className="mb-0">
              Kerala, India
            </p>
          </div>

        </div>

        <hr />

        <div className="text-center text-muted">
          © {new Date().getFullYear()} Lifty. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;