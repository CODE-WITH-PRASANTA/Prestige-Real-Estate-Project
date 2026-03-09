import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.webp";
import { useNavigate } from "react-router-dom";

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
    options: [
      { name: "Home 1", path: "/" },
      { name: "Home 2", path: "/" },
      { name: "Home 3", path: "/" },
    ],
  },
  {
    title: "Listing",
    options: [
      { name: "Grid View", path: "/listing-grid" },
      { name: "List View", path: "/listing-list" },
      { name: "Map View", path: "/listing-map" },
    ],
  },
  {
    title: "Agent",
    options: [
      { name: "Agent Grid", path: "/agent-grid" },
      { name: "Agent List", path: "/agent-list" },
      { name: "Agent Details", path: "/agent-details" },
    ],
  },
  {
    title: "Agency",
    options: [
      { name: "Agency Grid", path: "/agency-grid" },
      { name: "Agency List", path: "/agency-list" },
      { name: "Agency Grid with Sidebar", path: "/agency-grid-sidebar" },
      { name: "Agency List with Sidebar", path: "/agency-list-sidebar" },
      { name: "Agency Details", path: "/agency-details" },
    ],
  },
  {
    title: "Pages",
    options: [
      { name: "About", path: "/about" },
      { name: "FAQ", path: "/faq" },
      { name: "Pricing", path: "/pricing" },
    ],
  },
  {
    title: "Blog",
    options: [
      { name: "Blog List", path: "/blog-list" },
      { name: "Blog Grid", path: "/blog-grid" },
      { name: "Blog Details", path: "/blog-details" },
    ],
  },
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMobileDropdown = (index) => {
    if (window.innerWidth <= 992) {
      setActiveDropdown(activeDropdown === index ? null : index);
    }
  };

  const handleOptionClick = (path) => {
    navigate(path);
    setActiveDropdown(null);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar" ref={navbarRef}>
      
      {/* Logo */}
      <div className="logo-section" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" className="logo-img" />
      </div>

      {/* Mobile Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>

      {/* Menu */}
      <ul className={`nav-menu ${menuOpen ? "show" : ""}`}>
        {menuItems.map((menu, index) => (
          <li
            key={index}
            className="nav-item"
            onClick={() => handleMobileDropdown(index)}
            onMouseEnter={() =>
              window.innerWidth > 992 && setActiveDropdown(index)
            }
            onMouseLeave={() =>
              window.innerWidth > 992 && setActiveDropdown(null)
            }
          >
            <div className="nav-link">
              {menu.title}
              <FiChevronDown className="arrow-icon" />
            </div>

            <ul className={`dropdown ${activeDropdown === index ? "open" : ""}`}>
              {menu.options.map((option, i) => (
                <li
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOptionClick(option.path);
                  }}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* Right Side Buttons */}
      <div className="nav-right">
        <button className="icon-btn">
          <FiSearch />
        </button>

        <button
          className="icon-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FiMoon /> : <FiSun />}
        </button>

        <button
          className="signin-btn"
          onClick={() => navigate("/login")}
        >
          <FiUser className="btn-icon" />
          Sign In
        </button>

        <button
          className="register-btn"
          onClick={() => navigate("/register")}
        >
          <FiLock className="btn-icon" />
          Register
        </button>
      </div>
    </nav>
  );
}