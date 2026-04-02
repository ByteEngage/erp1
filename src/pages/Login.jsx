import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axios } from "axios";
import API from "../api/auth"
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5148/Auth/login", {
  username,
  password,
});

localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));

// 🔥 IMPORTANT
window.dispatchEvent(new Event("userChanged"));

navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || err);
    }
  };

  return (
    <main className="d-flex w-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">

              <div className="text-center mt-4">
                <h1 className="h2">Welcome back!</h1>
                <p className="lead">Sign in to your account</p>
              </div>

              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit} className="m-sm-3">

                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="d-grid gap-2 mt-3">
                      <button className="btn btn-lg btn-primary" type="submit">
                        Sign in
                      </button>
                    </div>

                  </form>
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