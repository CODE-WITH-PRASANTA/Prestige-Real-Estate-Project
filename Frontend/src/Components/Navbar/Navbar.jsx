import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.webp";

import {
  FiSearch,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiMenu,
  FiX,
  FiUser,
  FiLock,
} from "react-icons/fi";

const menuItems = [
  {
    title: "Home",
    options: ["Home 1", "Home 2", "Home 3"],
  },
  {
    title: "Listing",
    options: ["Grid View", "List View", "Map View"],
  },
  {
    title: "Agent",
    options: ["Agent Grid", "Agent List", "Agent Details"],
  },
  {
    title: "Agency",
    options: [
      "Agency Grid",
      "Agency List",
      "Agency Grid with Sidebar",
      "Agency List with Sidebar",
      "Agency Details",
    ],
  },
  {
    title: "Pages",
    options: ["About", "FAQ", "Pricing"],
  },
  {
    title: "Blog",
    options: ["Blog Grid", "Blog List", "Blog Details"],
  },
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navbarRef = useRef(null);

  /* Dark Mode Toggle */
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMobileDropdown = (index) => {
    if (window.innerWidth <= 992) {
      setActiveDropdown(activeDropdown === index ? null : index);
    }
  };

  return (
    <nav className="navbar" ref={navbarRef}>
      {/* Logo */}
      <div className="logo-section">
        <img src={logo} alt="logo" className="logo-img" />
      </div>

      {/* Hamburger */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>

      {/* Menu */}
      <ul className={`nav-menu ${menuOpen ? "show" : ""}`}>
        {menuItems.map((menu, index) => (
          <li
            key={index}
            className="nav-item"
            onClick={() => handleMobileDropdown(index)}
          >
            <div className="nav-link">
              {menu.title}
              <FiChevronDown className="arrow-icon" />
            </div>

            <ul
              className={`dropdown ${
                activeDropdown === index ? "open" : ""
              }`}
            >
              {menu.options.map((option, i) => (
                <li key={i}>{option}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* Right Section */}
      <div className="nav-right">
        <button className="icon-btn">
          <FiSearch />
        </button>

        {/* Dark Mode Button */}
        <button
          className="icon-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FiMoon /> : <FiSun />}
        </button>

        <button className="signin-btn">
          <FiUser className="btn-icon" />
          Sign In
        </button>

        <button className="register-btn">
          <FiLock className="btn-icon" />
          Register
        </button>
      </div>
    </nav>
  );
}