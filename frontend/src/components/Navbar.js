import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css"; // Import the CSS file

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token on logout
    window.location.href = "/"; // Redirect to login
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Navbar Brand */}
        <div className="brand">
          <Link to="/" className="brand-title">
            Seizure Detection App
          </Link>
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            className="menu-icon-svg"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </div>

        {/* Navbar Links */}
        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-item">
            Login
          </Link>
          <Link to="/register" className="nav-item">
            Register
          </Link>
          <button onClick={handleLogout} className="nav-item logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
