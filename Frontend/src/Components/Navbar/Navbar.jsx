import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";

import { FiMenu, FiX, FiPhone, FiHome, FiChevronDown } from "react-icons/fi";

const menuItems = ["Home", "Listing", "Agent", "Agency", "Pages", "Blog"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        {/* LOGO */}
        <div className="logo-section">
          <img src={logo} alt="logo" className="logo-img" />
        </div>

        {/* DESKTOP MENU */}
        <ul className="nav-menu-desktop">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>

          <Link to="/news">
            <li>News</li>
          </Link>
          <Link to="/pricing">
            <li>Pricing</li>
          </Link>
          <Link to="/faq">
            <li>FAQ</li>
          </Link>
          <Link to="blog-list">
            <li>Blog</li>
          </Link>
        </ul>

        {/* RIGHT BUTTONS */}
        <div className="nav-right">
          <button className="call-btn">
            <FiPhone />
          </button>

          <button className="post-btn">
            <FiHome />
            Post Property
          </button>

          <div className="hamburger" onClick={() => setMenuOpen(true)}>
            <FiMenu size={26} />
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className={`mobile-overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* MOBILE DRAWER */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {/* HEADER */}
        <div className="mobile-top">
          <img src={logo} alt="" className="mobile-logo" />

          <FiX className="close-icon" onClick={() => setMenuOpen(false)} />
        </div>

        {/* SEARCH */}
        <input type="text" placeholder="Search" className="mobile-search" />

        {/* MENU */}
        <ul className="mobile-links">
          {menuItems.map((item, i) => (
            <li key={i}>
              <span>{item}</span>
              <FiChevronDown />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
