// src/pages/Login.js

import React, { useState } from "react";
import { fetchData } from "../../api";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const users = await fetchData("users"); // Fetch all users
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        setError(null);
        alert("Login successful!");

        // Check role and navigate accordingly
        if (user.role === "admin") {
          navigate("/admin"); // Redirect to Admin Dashboard
        } else {
          navigate("/"); // Redirect to Home page for other roles
        }
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("Failed to log in. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <p className="switch-text">
          Don't have an account?{" "}
          <button className="btn-link" onClick={() => navigate("/register")}>
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
