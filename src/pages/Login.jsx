import React, { useState } from "react";
import { loginUser } from "../api/auth";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  console.log(import.meta.env.VITE_API_URL);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    try {
      const res = await loginUser(form);

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Save user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Redirect
      window.location.href = "/dashboard";

    } catch (err) {
      setError("Invalid username or password",err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>ERP Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={handleLogin}>Login</button>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
