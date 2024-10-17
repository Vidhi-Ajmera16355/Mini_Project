import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token on logout
    window.location.href = "/"; // Redirect to login
  };

  return (
    <nav className="bg-blue-500 p-4 sticky">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-white text-xl font-bold">
            Seizure Detection App
          </h1>
        </div>
        <div>
          <Link to="/" className="text-white px-4">
            Login
          </Link>
          <Link to="/register" className="text-white px-4">
            Register
          </Link>
          <button onClick={handleLogout} className="text-white px-4">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
