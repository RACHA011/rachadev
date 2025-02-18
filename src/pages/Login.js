// Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/FirebseConfig"; 
import { useNavigate } from "react-router-dom";
import "../assets/css/Login.css"; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth(), email, password);
      navigate("/dashboard"); // Redirect to private dashboard
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-heading">Portfolio Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="login-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;