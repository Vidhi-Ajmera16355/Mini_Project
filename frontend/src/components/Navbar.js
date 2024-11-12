import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Navbar.css"; // Import the CSS file

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in by checking for token in localStorage
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token on logout
    setShowLogoutMessage(true); // Show logout message

    // Navigate to the login page after a short delay
    setTimeout(() => {
      setShowLogoutMessage(false); // Hide logout message after 3 seconds
      navigate("/"); // Redirect to login page
    }, 3000);
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Navbar Brand */}
        <div className="brand">
          <Link to={isLoggedIn ? "/home" : "/"} className="brand-title">
            Seizure Detection App
          </Link>
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div
          className={`menu-icon ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
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
          {isLoggedIn ? (
            <>
              <Link to="/screening" className="nav-item">
                Input
              </Link>
              <button onClick={handleLogout} className="nav-item logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="nav-item">
                Login
              </Link>
              <Link to="/register" className="nav-item">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Logout Confirmation Message */}
      {showLogoutMessage && (
        <div className="logout-message">
          <p>Successfully logged out!</p>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
