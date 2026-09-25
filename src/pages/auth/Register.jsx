import RegisterForm from "../../components/forms/RegisterForm";

function Register() {
  return (
    <section className="section-padding">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
          <h2 className="text-center fw-bold mb-2">Create Your Account</h2>

          <p className="text-center text-secondary mb-4">
            Join Lifty and start sharing rides
          </p>

          <RegisterForm />
        </div>
      </div>
    </section>
  );
}

export default Register;