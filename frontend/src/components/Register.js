// components/Register.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Register.css"; // Optional: Create a new CSS file for register-specific styles

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, phoneNumber, password }
      );
      alert("Registration successful");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      setError(error.response.data.message);
      console.error("Registration error:", error.response.data.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Create Your Account</h2>
        {error && <p className="register-error">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="register-input"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="register-input"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <div className="login-redirect">
          <p>
            Already have an account? <a href="/">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
