import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Register.css"; // New CSS file for register-specific styles

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });
      navigate("/"); // Redirect to login after successful registration
    } catch (error) {
      setError(error.response.data.message); // Set error message
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
        <div className="login-link">
          <a href="/" className="login-link-text">
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
