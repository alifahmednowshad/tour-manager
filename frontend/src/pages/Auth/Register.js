// src/pages/Register.js

import React, { useState } from "react";
import { createData } from "../../api";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // Add this CSS file for common styling

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user", // Default role
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createData("users", formData); // POST request to create a new user
      setSuccess("User registered successfully!");
      setError(null);
      setTimeout(() => navigate("/login"), 2000); // Redirect to login page after 2 seconds
    } catch (err) {
      setError("Failed to register user. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
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
            Register
          </button>
        </form>
        <p className="switch-text">
          Already have an account?{" "}
          <button className="btn-link" onClick={() => navigate("/login")}>
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
