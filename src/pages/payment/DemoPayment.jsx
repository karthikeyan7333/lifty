import { API_URL } from "../config/api.js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DemoPayment() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [razorpayReady, setRazorpayReady] = useState(false);

  // Load Razorpay Checkout
  useEffect(() => {
    const loadRazorpay = () => {
      if (window.Razorpay) {
        setRazorpayReady(true);
        return;
      }

      const script = document.createElement("script");

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        setRazorpayReady(true);
      };

      script.onerror = () => {
        console.error("Failed to load Razorpay Checkout");
        setRazorpayReady(false);
      };

      document.body.appendChild(script);
    };

    loadRazorpay();
  }, []);

  // Fetch booking
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/api/bookings/my-bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const foundBooking = response.data.find(
          (item) => item._id === bookingId
        );

        if (!foundBooking) {
          alert("Booking not found");
          navigate("/dashboard/my-bookings");
          return;
        }

        setBooking(foundBooking);
      } catch (error) {
        console.error(error);

        alert("Unable to load booking");

        navigate("/dashboard/my-bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, navigate]);

  // =====================================================
  // DEMO PAYMENT
  // =====================================================

  const handleDemoPayment = async () => {
    try {
      setPaying(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/api/payments/${bookingId}/pay`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      navigate("/dashboard/my-bookings");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Demo payment failed"
      );
    } finally {
      setPaying(false);
    }
  };

  // =====================================================
  // RAZORPAY PAYMENT
  // =====================================================

  const handleRazorpayPayment = async () => {
    try {
      if (!razorpayReady || !window.Razorpay) {
        alert(
          "Razorpay Checkout is still loading. Please try again."
        );
        return;
      }

      setPaying(true);

      const token = localStorage.getItem("token");

      // 1. Create Razorpay order
      const orderResponse = await axios.post(
        `${API_URL}/api/payments/${bookingId}/razorpay/order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const {
        orderId,
        amount,
        currency,
        keyId,
      } = orderResponse.data;

      // Get logged-in user details if available
      let loggedInUser = {};

      try {
        loggedInUser =
          JSON.parse(
            localStorage.getItem("user")
          ) || {};
      } catch {
        loggedInUser = {};
      }

      // 2. Razorpay Checkout options
      const options = {
        key: keyId,

        amount: amount,

        currency: currency,

        name: "Lifty",

        description: `Ride booking payment - ${bookingId}`,

        order_id: orderId,

        handler: async function (response) {
          try {
            // 3. Send payment details to backend
            const verifyResponse = await axios.post(
              `${API_URL}/api/payments/razorpay/verify`,
              {
                bookingId,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            alert(verifyResponse.data.message);

            navigate("/dashboard/my-bookings");
          } catch (error) {
            console.error(
              "Razorpay verification error:",
              error
            );

            alert(
              error.response?.data?.message ||
                "Payment verification failed"
            );

            setPaying(false);
          }
        },

        prefill: {
          name:
            loggedInUser.fullName || "",

          email:
            loggedInUser.email || "",

          contact:
            loggedInUser.phone || "",
        },

        notes: {
          bookingId: bookingId,
        },

        theme: {
          color: "#0d6efd",
        },

        modal: {
          confirm_close: true,

          ondismiss: function () {
            setPaying(false);
          },
        },
      };

      // 4. Open Razorpay Checkout
      const razorpay = new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Razorpay payment failed:",
            response.error
          );

          alert(
            response.error?.description ||
              "Razorpay payment failed"
          );

          setPaying(false);
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Razorpay payment error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to start Razorpay payment"
      );

      setPaying(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading payment...</h4>
      </div>
    );
  }

  if (!booking) {
    return null;
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">

          <div className="card border-0 shadow-sm rounded-4 p-4">

            <h2 className="fw-bold text-center mb-4">
              Payment
            </h2>

            {/* Booking Details */}
            <div className="bg-light rounded-3 p-3 mb-4">

              <div className="d-flex justify-content-between mb-2">
                <span>From</span>

                <strong>
                  {booking.ride?.from}
                </strong>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>To</span>

                <strong>
                  {booking.ride?.to}
                </strong>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Date</span>

                <strong>
                  {booking.ride?.date}
                </strong>
              </div>

              <div className="d-flex justify-content-between">
                <span>Seats</span>

                <strong>
                  {booking.seatsBooked}
                </strong>
              </div>

            </div>

            {/* Amount */}
            <div className="text-center mb-4">

              <small className="text-secondary">
                Amount to pay
              </small>

              <h1 className="fw-bold text-primary">
                ₹{booking.amount}
              </h1>

            </div>

            {/* Demo Payment */}
            <button
              type="button"
              className="btn btn-primary btn-lg w-100"
              onClick={handleDemoPayment}
              disabled={paying}
            >
              {paying
                ? "Processing..."
                : `🧪 Demo Payment ₹${booking.amount}`}
            </button>

            {/* Divider */}
            <div className="d-flex align-items-center my-3">

              <hr className="flex-grow-1" />

              <span className="px-3 text-muted">
                OR
              </span>

              <hr className="flex-grow-1" />

            </div>

            {/* Razorpay */}
            <button
              type="button"
              className="btn btn-success btn-lg w-100"
              onClick={handleRazorpayPayment}
              disabled={
                paying || !razorpayReady
              }
            >
              {!razorpayReady
                ? "Loading Razorpay..."
                : paying
                ? "Processing..."
                : `💳 Pay ₹${booking.amount} with Razorpay`}
            </button>

            {/* Cancel */}
            <button
              type="button"
              className="btn btn-outline-secondary w-100 mt-3"
              onClick={() =>
                navigate("/dashboard/my-bookings")
              }
              disabled={paying}
            >
              Cancel
            </button>

            <p className="text-center text-secondary small mt-3 mb-0">
              Razorpay is running in Test Mode.
              No real money will be charged.
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default DemoPayment;