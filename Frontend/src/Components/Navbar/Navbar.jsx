import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/Logo-1.png";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiPhone, FiHome } from "react-icons/fi";

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
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="logo-section">
            <Link to="/" onClick={closeMenu}>
              <img src={logo} alt="logo" className="logo-img" />
            </Link>
          </div>

          <ul className="nav-menu-desktop">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/rent/property">Rent Property</Link></li>
            <li><Link to="/buyproperties">Properties</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          <div className="nav-right">
            <button className="call-btn" aria-label="Call">
              <FiPhone />
            </button>

            <Link to="/property" className="post-btn">
              <FiHome />
              <span>Post Property</span>
            </Link>

            <button
              className="hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`mobile-overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
      />

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-top">
          <img src={logo} alt="logo" className="mobile-logo" />
          <button
            className="close-icon-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <FiX className="close-icon" />
          </button>
        </div>

        <div className="mobile-search-wrap">
          <input
            type="text"
            placeholder="Search..."
            className="mobile-search"
          />
        </div>

        <ul className="mobile-links">
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
          <li><Link to="/rent/property" onClick={closeMenu}>Rent Property</Link></li>
          <li><Link to="/buyproperties" onClick={closeMenu}>Properties</Link></li>
          <li><Link to="/faq" onClick={closeMenu}>FAQ</Link></li>
          <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          <li><Link to="/pricing" onClick={closeMenu}>Pricing</Link></li>
          <li><Link to="/testimonial" onClick={closeMenu}>Testimonial</Link></li>
        </ul>

        <div className="mobile-bottom-actions">
          <button className="mobile-call-btn" type="button">
            <FiPhone />
            <span>Call Now</span>
          </button>

          <Link to="/property" className="mobile-post-btn" onClick={closeMenu}>
            <FiHome />
            <span>Post Property</span>
          </Link>
        </div>
      </div>
    </>
  );
}