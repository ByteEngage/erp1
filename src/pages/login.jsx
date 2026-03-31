import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const API = import.meta.env.VITE_API_URL;

function Login() {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${API}/auth/login`, form);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            window.location.href = "/dashboard";
        } catch (err) {
            setError("Invalid username or password");
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