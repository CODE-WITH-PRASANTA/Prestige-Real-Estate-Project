import React, { useState } from "react";
import "./Topbar.css";

const Topbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    "Home",
    "About Us",
    "Our Services",
    "Portfolio",
    "Testimonials",
    "Contact Info",
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className="Topbar">
        <div className="Topbar__container">
          <div className="Topbar__left">
            <a href="mailto:info@example.com" className="Topbar__info">
              <span className="Topbar__icon">✉</span>
              <span className="Topbar__text">info@example.com</span>
            </a>

            <a href="tel:+919876543210" className="Topbar__info">
              <span className="Topbar__icon">☎</span>
              <span className="Topbar__text">+91 98765 43210</span>
            </a>
          </div>

          <div className="Topbar__right">
            <button className="Topbar__contactBtn">Contact Us</button>

            <button
              className={`Topbar__menuBtn ${isSidebarOpen ? "active" : ""}`}
              onClick={toggleSidebar}
              aria-label="Open menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`Topbar__overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={closeSidebar}
      ></div>

      <div className={`Topbar__sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="Topbar__sidebarHeader">
          <h3 className="Topbar__sidebarTitle">Menu</h3>
          <button className="Topbar__closeBtn" onClick={closeSidebar}>
            ×
          </button>
        </div>

        <div className="Topbar__sidebarContent">
          <ul className="Topbar__sidebarList">
            {sidebarItems.map((item, index) => (
              <li key={index} className="Topbar__sidebarItem">
                <a href="#" className="Topbar__sidebarLink">
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="Topbar__sidebarBox">
            <h4>Contact Details</h4>
            <p>Email: support@example.com</p>
            <p>Phone: +91 91234 56789</p>
            <p>Location: Bhubaneswar, Odisha</p>
          </div>

          <div className="Topbar__sidebarBox">
            <h4>Office Hours</h4>
            <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;