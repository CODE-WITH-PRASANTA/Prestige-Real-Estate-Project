import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.webp";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
} from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-page">
      <div className="auth-overlay">
        <div className="auth-wrapper">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft />
          </button>

          <div className="auth-logo">
            <img src={logo} alt="Dreams Estate" />
          </div>

          <div className="auth-card">
            <h1>Sign In To Your Account</h1>

            <form className="auth-form">
              <label>
                Email <span>*</span>
              </label>
              <div className="input-group">
                <FiMail className="input-icon" />
                <input type="email" placeholder="Enter your email" />
              </div>

              <label>
                Password <span>*</span>
              </label>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>

              <div className="remember-row login-row">
                <div className="remember-left">
                  <input type="checkbox" id="rememberLogin" />
                  <label htmlFor="rememberLogin" className="remember-label">
                    Remember Me
                  </label>
                </div>

                <a href="/" onClick={(e) => e.preventDefault()} className="forgot-link">
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="submit-btn">
                Sign In
              </button>

              <p className="switch-text">
                Don&apos;t have an account? <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;