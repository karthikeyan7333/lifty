import LoginForm from "../../components/forms/LoginForm";

function Login() {
  return (
    <section className="section-padding">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card shadow p-4" style={{ maxWidth: "450px", width: "100%" }}>
          <h2 className="text-center fw-bold mb-2">Welcome Back</h2>

          <p className="text-center text-secondary mb-4">
            Login to your Lifty account
          </p>

          <LoginForm />
        </div>
      </div>
    </section>
  );
}

export default Login;