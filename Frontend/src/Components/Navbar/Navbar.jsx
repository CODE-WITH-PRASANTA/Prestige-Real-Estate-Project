import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/Main-Logo.png";
import { Link } from "react-router-dom";

import {
  FiMenu,
  FiX,
  FiPhone,
  FiHome,
} from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">

        {/* GLOW */}
        <div className="navbar-glow"></div>

        <div className="navbar-inner">

          {/* LOGO */}
          <div className="logo-section">
            <Link to="/" onClick={closeMenu}>
              <img
                src={logo}
                alt="logo"
                className="logo-img"
              />
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <ul className="nav-menu-desktop">
            <li>
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" onClick={closeMenu}>
                About
              </Link>
            </li>

            <li>
              <Link to="/rent/property" onClick={closeMenu}>
                Rent Property
              </Link>
            </li>

            <li>
              <Link to="/buyproperties" onClick={closeMenu}>
                Properties
              </Link>
            </li>

            <li>
              <Link to="/faq" onClick={closeMenu}>
                FAQ
              </Link>
            </li>

            <li>
              <Link to="/blog" onClick={closeMenu}>
                Blog
              </Link>
            </li>

            <li>
              <Link to="/contact" onClick={closeMenu}>
                Contact
              </Link>
            </li>
          </ul>

          {/* RIGHT */}
          <div className="nav-right">

            {/* CALL */}
            <a
              href="tel:+919876543210"
              className="call-btn"
              aria-label="Call"
            >
              <FiPhone />
            </a>

            {/* POST */}
            <Link
              to="/property"
              className="post-btn"
              onClick={closeMenu}
            >
              <FiHome />
              <span>Post Property</span>
            </Link>

            {/* HAMBURGER */}
            <button
              className="hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              type="button"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className={`mobile-overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
      />

      {/* MOBILE MENU */}
      <aside
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
      >
        {/* TOP */}
        <div className="mobile-top">

          <Link to="/" onClick={closeMenu}>
            <img
              src={logo}
              alt="logo"
              className="mobile-logo"
            />
          </Link>

          <button
            className="close-icon-btn"
            onClick={closeMenu}
            aria-label="Close menu"
            type="button"
          >
            <FiX className="close-icon" />
          </button>
        </div>

        {/* SEARCH */}
        <div className="mobile-search-wrap">
          <input
            type="text"
            placeholder="Search..."
            className="mobile-search"
          />
        </div>

        {/* MOBILE LINKS */}
        <ul className="mobile-links">

          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/about" onClick={closeMenu}>
              About
            </Link>
          </li>

          <li>
            <Link to="/rent/property" onClick={closeMenu}>
              Rent Property
            </Link>
          </li>

          <li>
            <Link to="/buyproperties" onClick={closeMenu}>
              Properties
            </Link>
          </li>

          <li>
            <Link to="/faq" onClick={closeMenu}>
              FAQ
            </Link>
          </li>

          <li>
            <Link to="/blog" onClick={closeMenu}>
              Blog
            </Link>
          </li>

          <li>
            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </li>

          <li>
            <Link to="/pricing" onClick={closeMenu}>
              Pricing
            </Link>
          </li>

          <li>
            <Link to="/testimonial" onClick={closeMenu}>
              Testimonial
            </Link>
          </li>
        </ul>

        {/* MOBILE BUTTONS */}
        <div className="mobile-bottom-actions">

          <a
            href="tel:+919876543210"
            className="mobile-call-btn"
          >
            <FiPhone />
            <span>Call Now</span>
          </a>

          <Link
            to="/property"
            className="mobile-post-btn"
            onClick={closeMenu}
          >
            <FiHome />
            <span>Post Property</span>
          </Link>

        </div>
      </aside>
    </>
  );
}