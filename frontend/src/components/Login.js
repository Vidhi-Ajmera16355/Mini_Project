import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Login.css"; // New CSS file for login-specific styles

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response.data.message);
      console.error("Login error:", error.response.data.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Welcome Back</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
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
              className="login-input"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="forgot-password">
          <a href="#" className="forgot-link">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
