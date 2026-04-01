import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <main className="d-flex w-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">Welcome back!</h1>
                <p className="lead">Sign in to your account to continue</p>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="m-sm-3">
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control form-control-lg"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <small>
                        <a href="#">Forgot password?</a>
                      </small>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                      <button className="btn btn-lg btn-primary" onClick={handleSubmit}>
                        Sign in
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mb-3">
                Don't have an account? <a href="/sign-up">Sign up</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
