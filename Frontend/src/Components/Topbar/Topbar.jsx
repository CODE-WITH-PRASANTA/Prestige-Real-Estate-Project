import React, { useState } from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";

const Topbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ SAME PATH AS NAVBAR
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Rent Property", path: "/rent/property" },
    { name: "Properties", path: "/buyproperties" },
    { name: "FAQ", path: "/faq" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <div className="Topbar">
        <div className="Topbar__container">

          {/* LEFT */}
          <div className="Topbar__left">
            <a href="mailto:info@example.com" className="Topbar__info">
              ✉ info@example.com
            </a>

            <a href="tel:+919876543210" className="Topbar__info">
              ☎ +91 98765 43210
            </a>
          </div>

          {/* RIGHT */}
          <div className="Topbar__right">
            <button className="Topbar__contactBtn">Contact Us</button>

            <button
              className={`Topbar__menuBtn ${isSidebarOpen ? "active" : ""}`}
              onClick={() => setIsSidebarOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

        </div>
      </div>

      {/* OVERLAY */}
      <div
        className={`Topbar__overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={closeSidebar}
      />

      {/* SIDEBAR */}
      <div className={`Topbar__sidebar ${isSidebarOpen ? "active" : ""}`}>
        
        <div className="Topbar__sidebarHeader">
          <h3>Menu</h3>
          <button onClick={closeSidebar}>×</button>
        </div>

        <div className="Topbar__sidebarContent">

          <ul className="Topbar__sidebarList">
            {navItems.map((item, i) => (
              <li key={i}>
                {/* ✅ USE LINK (IMPORTANT) */}
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className="Topbar__sidebarLink"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* EXTRA INFO (OPTIONAL) */}
          <div className="Topbar__sidebarBox">
            <h4>Contact Details</h4>
            <p>Email: support@example.com</p>
            <p>Phone: +91 91234 56789</p>
            <p>Location: Bhubaneswar</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Topbar;