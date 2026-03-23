import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "./Sidebar.css";

import {
  FaTimes,
  FaHome,
  FaBuilding,
  FaKey,
  FaPlusSquare,
  FaDollarSign,
  FaCommentDots,
  FaQuestionCircle,
  FaBlog,
  FaImages,
  FaPhoneAlt,
  FaChevronDown,
} from "react-icons/fa";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },

    {
      name: "Property Management",
      icon: <FaBuilding />,
      submenu: [
        { name: "Property Posting", path: "/admin/saleproperty" },
        { name: "Property View", path: "/admin-property-view" },
      ],
    },

    {
      name: "Rent Property",
      icon: <FaKey />,
      submenu: [
        { name: "Rent Posting", path: "/admin/Rent-property" },
        { name: "Rent View", path: "/admin-Rent-view" },
      ],
    },

    // {
    //   name: "Add Property",
    //   path: "/admin-add-property",
    //   icon: <FaPlusSquare />,
    // },
    {
      name: "Pricing",
      path: "/admin/pricing",
      icon: <FaDollarSign />,
    },
    {
      name: "Testimonial",
      path: "/admin/testimonial",
      icon: <FaCommentDots />,
    },
    {
      name: "FAQ Posting",
      path: "/admin/faqposting",
      icon: <FaQuestionCircle />,
    },
    {
      name: "Blog Posting",
      path: "/admin/blogposting",
      icon: <FaBlog />,
    },
    {
      name: "Main Gallery",
      path: "/admin/gallery",
      icon: <FaImages />,
    },
    {
      name: "Contact",
      path: "/admin/contact",
      icon: <FaPhoneAlt />,
    },
  ];

  const [openMenu, setOpenMenu] = useState(null);

  const SidebarToggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const SidebarHandleNavClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="Sidebar__overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`Sidebar ${sidebarOpen ? "Sidebar--open" : ""}`}>
        <div className="Sidebar__header">
          <h2 className="Sidebar__logo">
            {sidebarOpen ? "Admin Panel" : "AP"}
          </h2>

          <button
            className="Sidebar__closeButton"
            onClick={() => setSidebarOpen(false)}
            type="button"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="Sidebar__menu">
          {menu.map((item) => (
            <div key={item.name} className="Sidebar__group">
              {item.submenu ? (
                <>
                  <button
                    className={`Sidebar__item Sidebar__itemButton ${
                      openMenu === item.name ? "Sidebar__item--opened" : ""
                    }`}
                    onClick={() => SidebarToggleMenu(item.name)}
                    type="button"
                  >
                    <div className="Sidebar__itemLeft">
                      <span className="Sidebar__icon">{item.icon}</span>
                      {sidebarOpen && (
                        <span className="Sidebar__text">{item.name}</span>
                      )}
                    </div>

                    {sidebarOpen && (
                      <span
                        className={`Sidebar__arrow ${
                          openMenu === item.name ? "Sidebar__arrow--open" : ""
                        }`}
                      >
                        <FaChevronDown />
                      </span>
                    )}
                  </button>

                  {openMenu === item.name && sidebarOpen && (
                    <div className="Sidebar__submenu">
                      {item.submenu.map((sub) => (
                        <NavLink
                          key={sub.path}
                          to={sub.path}
                          onClick={SidebarHandleNavClick}
                          className={({ isActive }) =>
                            `Sidebar__submenuItem ${
                              isActive ? "Sidebar__submenuItem--active" : ""
                            }`
                          }
                        >
                          <span className="Sidebar__submenuDot"></span>
                          <span>{sub.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path}
                  onClick={SidebarHandleNavClick}
                  className={({ isActive }) =>
                    `Sidebar__item ${isActive ? "Sidebar__item--active" : ""}`
                  }
                >
                  <div className="Sidebar__itemLeft">
                    <span className="Sidebar__icon">{item.icon}</span>
                    {sidebarOpen && (
                      <span className="Sidebar__text">{item.name}</span>
                    )}
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