import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/Logo-1.png";
import { Link } from "react-router-dom";

import { FiMenu, FiX, FiPhone, FiHome } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        {/* LOGO */}
        <div className="logo-section">
          <Link to="/">
            <img src={logo} alt="logo" className="logo-img" />
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <ul className="nav-menu-desktop">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
         
          <li><Link to="/rentproperty">Rent Property</Link></li>
          <li><Link to="/properties">Properties</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* RIGHT */}
        <div className="nav-right">
          <button className="call-btn">
            <FiPhone />
          </button>

          <Link to="/property" className="post-btn">
  <FiHome />
  Post Property
</Link>
          <div className="hamburger" onClick={() => setMenuOpen(true)}>
            <FiMenu size={26} />
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className={`mobile-overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
      />

      {/* MOBILE DRAWER */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {/* HEADER */}
        <div className="mobile-top">
          <img src={logo} alt="logo" className="mobile-logo" />
          <FiX className="close-icon" onClick={closeMenu} />
        </div>

        {/* SEARCH */}
        <input type="text" placeholder="Search..." className="mobile-search" />

        {/* MOBILE MENU */}
        <ul className="mobile-links">
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
         
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          <li><Link to="/faq" onClick={closeMenu}>FAQ</Link></li>
          <li><Link to="/pricing" onClick={closeMenu}>Pricing</Link></li>
          <li><Link to="/testimonial" onClick={closeMenu}>Testimonial</Link></li>
          <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>
        </ul>
      </div>
    </>
  );
}