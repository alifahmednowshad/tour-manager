// src/pages/Home.js

import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Welcome to the Tourism Management System</h1>
        <p>Manage users, bookings, and more with ease.</p>
      </div>
      <div className="links">
        <Link to="/users" className="btn btn-primary">
          View Users
        </Link>
        <Link to="/bookings" className="btn btn-primary">
          View Bookings
        </Link>
        <Link to="/login" className="btn btn-secondary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
