import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaUserTie,
  FaTable,
  FaBuilding,
  FaPlusSquare,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaQuoteLeft,
  FaQuestionCircle,
  FaNewspaper,
  FaImages,
  FaChalkboardTeacher,
  FaEnvelope,
  FaInbox,
  FaChevronDown,
} from "react-icons/fa";

import "./Sidebar.css";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const menu = [
    //////**************DASHBOARD*************/////
    { name: "Dashboard", path: "/", icon: <FaHome /> },

    //////**************COLD LEAD*************/////
    {
      name: "Cold Lead",
      path: "/admin/cold-lead",
      icon: <FaUserTie />, // 👔 lead/person
    },
    {
      name: "Cold Lead Table",
      path: "/admin/cold-lead-table",
      icon: <FaTable />, // 📊 table view
    },

    //////**************PROPERTY MANAGEMENT*************/////
    {
      name: "Property Management",
      icon: <FaBuilding />, // 🏢
      submenu: [
        {
          name: "Flat Posting",
          path: "/flat/post",
          icon: <FaBuilding />, // 🏢 (consistent property icon)
        },
        {
          name: "Property Posting",
          path: "/property/post",
          icon: <FaPlusSquare />, // ➕
        },
        {
          name: "All Details Review",
          path: "/property/review",
          icon: <FaClipboardCheck />, // ✅
        },
      ],
    },

    //////**************RENT MANAGEMENT*************/////
    {
      name: "Rent Management",
      icon: <FaMoneyBillWave />, // 💸
      submenu: [
        {
          name: "Post Rent Property",
          path: "/rent/post",
          icon: <FaPlusSquare />, // ➕ rent listing
        },
        {
          name: "Rent Details",
          path: "/rent/details",
          icon: <FaFileInvoiceDollar />, // 📄
        },
      ],
    },

    //////**************CONTENT*************/////
    {
      name: "Testimonial",
      path: "/admin/testimonial",
      icon: <FaQuoteLeft />, // 💬
    },

    // {
    //   name: "FAQ Posting",
    //   path: "/admin/faq",
    //   icon: <FaQuestionCircle />, // ❓
    // },

    {
      name: "Blog Posting",
      path: "/admin/blogposting",
      icon: <FaNewspaper />, // 📰
      submenu: [
        {
          name: "Blog Post",
          path: "/blog/post",
          icon: <FaPlusSquare />, // ➕
        },
        {
          name: "Blog Management",
          path: "/blog/post",
          icon: <FaClipboardCheck />, // 📋
        },
      ],
    },

    {
      name: "Main Gallery",
      path: "/admin/gallery",
      icon: <FaImages />, // 🖼️
    },

   

    //////**************COMMUNICATION*************/////
    {
      name: "Contact Management",
      path: "/admin/contact",
      icon: <FaEnvelope />, // ✉️
    },

    {
      name: "Enquiry Management",
      path: "/admin/enquiry",
      icon: <FaInbox />, // 📥
    },
  ];

  const [openMenu, setOpenMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const handleMenuClick = () => {
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <>
      {sidebarOpen && isMobile && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "close"}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-brand-icon">A</div>

            {sidebarOpen && (
              <div className="sidebar-brand-text">
                <h2>Admin Panel</h2>
                <p>Management System</p>
              </div>
            )}
          </div>
        </div>

        <nav className="sidebar-menu">
          {menu.map((item, index) => {
            if (item.type === "section") {
              return sidebarOpen ? (
                <div className="sidebar-section" key={`${item.label}-${index}`}>
                  {item.label}
                </div>
              ) : null;
            }

            return (
              <div className="sidebar-menu-item" key={item.name}>
                {item.submenu ? (
                  <>
                    <button
                      type="button"
                      className={`menu-btn ${openMenu === item.name ? "expanded" : ""}`}
                      onClick={() => toggleMenu(item.name)}
                    >
                      <div className="menu-main">
                        <span className="menu-icon">{item.icon}</span>
                        {sidebarOpen && (
                          <span className="menu-text">{item.name}</span>
                        )}
                      </div>

                      {sidebarOpen && (
                        <span
                          className={`menu-arrow ${openMenu === item.name ? "rotate" : ""}`}
                        >
                          <FaChevronDown />
                        </span>
                      )}
                    </button>

                    {openMenu === item.name && sidebarOpen && (
                      <div className="submenu">
                        {item.submenu.map((sub) => (
                          <NavLink
                            key={sub.path}
                            to={sub.path}
                            onClick={handleMenuClick}
                            className={({ isActive }) =>
                              `submenu-link ${isActive ? "active" : ""}`
                            }
                          >
                            <span className="submenu-icon">{sub.icon}</span>
                            <span className="submenu-text">{sub.name}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={handleMenuClick}
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active" : ""}`
                    }
                  >
                    <div className="menu-main">
                      <span className="menu-icon">{item.icon}</span>
                      {sidebarOpen && (
                        <span className="menu-text">{item.name}</span>
                      )}
                    </div>
                  </NavLink>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
