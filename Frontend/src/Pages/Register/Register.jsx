import React, { useState } from "react";
import "./Register.css";
import logo from "../../assets/logo.webp";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
} from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            <h1>Sign Up! For New Account</h1>

            <form className="auth-form">
              <label>
                Name <span>*</span>
              </label>
              <div className="input-group">
                <FiUser className="input-icon" />
                <input type="text" placeholder="Enter Name" />
              </div>

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

              <label>
                Confirm Password <span>*</span>
              </label>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>

              <div className="remember-row">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className="remember-label">
                  Remember Me
                </label>
              </div>

              <button type="submit" className="submit-btn">
                Sign Up
              </button>

              <p className="switch-text">
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;