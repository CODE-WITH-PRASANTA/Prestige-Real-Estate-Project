import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "./Sidebar.css";

import {
  FaTimes,
  FaHome,
  FaNewspaper,
  FaImages,
} from "react-icons/fa";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },

    {
      name: "Property Management",
      icon: <FaNewspaper />,
      submenu: [
        { name: "Property Posting", path: "/admin/saleproperty" },
        { name: "Property View", path: "/admin-property-view" },
      ],
    },

    {
      name: "Rent Property",
      icon: <FaNewspaper />,
      submenu: [
        { name: "Rent Posting", path: "/admin/Rent-property" },
        { name: "Rent View", path: "/admin-Rent-view" },
      ],
    },

    { name: "Pricing", path: "/admin/pricing", icon: <FaNewspaper /> },
    { name: "Testimonial", path: "/admin/testimonial", icon: <FaNewspaper /> },
    { name: "FAQ Posting", path: "/admin/faqposting", icon: <FaNewspaper /> },
    { name: "Blog Posting", path: "/admin/blogposting", icon: <FaNewspaper /> },
    { name: "Main Gallery", path: "/admin/gallery", icon: <FaImages /> },
    { name: "Contact", path: "/admin/contact", icon: <FaNewspaper /> },
  ];

  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        
        {/* HEADER */}
        <div className="sidebar-header">
          <h2 className="logo-text">
            {sidebarOpen ? "Admin Panel" : "AP"}
          </h2>

          <button
            className="close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* MENU */}
        <nav className="sidebar-menu">
          {menu.map((item) => (
            <div key={item.name}>

              {item.submenu ? (
                <>
                  <button
                    className="menu-item"
                    onClick={() => toggleMenu(item.name)}
                  >
                    <div className="menu-left">
                      {item.icon}
                      {sidebarOpen && <span>{item.name}</span>}
                    </div>

                    {sidebarOpen && (
                      <span className="arrow">
                        {openMenu === item.name ? "▾" : "▸"}
                      </span>
                    )}
                  </button>

                  {openMenu === item.name && sidebarOpen && (
                    <div className="submenu">
                      {item.submenu.map((sub) => (
                        <NavLink
                          key={sub.path}
                          to={sub.path}
                          onClick={handleNavClick}
                          className={({ isActive }) =>
                            `submenu-item ${isActive ? "active-sub" : ""}`
                          }
                        >
                          {sub.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `menu-item ${isActive ? "active" : ""}`
                  }
                >
                  <div className="menu-left">
                    {item.icon}
                    {sidebarOpen && <span>{item.name}</span>}
                  </div>
                </NavLink>
              )}

            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}