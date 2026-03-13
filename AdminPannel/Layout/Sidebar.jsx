import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import {
  FaTimes,
  FaHome,
  FaNewspaper,
  FaImages,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaUserTie,
  FaCommentDots,
} from "react-icons/fa";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {

  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Properties", path: "/admin/saleproperty", icon: <FaNewspaper /> },
    { name: "Rent Properties", path: "/admin/rentproperty", icon: <FaNewspaper /> },
    { name: "Pricing", path: "/admin/pricing", icon: <FaNewspaper /> },
     { name: "Testimonial", path: "/admin/testimonial", icon: <FaNewspaper /> },
     { name: "FAQ Posting", path: "/admin/faqposting", icon: <FaNewspaper /> },
     { name: "Blog Posting", path: "/admin/blogposting", icon: <FaNewspaper /> },
    

    {
      name: "AddProperty",
      icon: <FaImages />,
      submenu: [
        { name: "Gallery Post", path: "/admin/gallery-post" },
        { name: "Gallery View", path: "/admin/gallery-view" },
      ],
    },

    { name: "Event", path: "/admin/event", icon: <FaCalendarAlt /> },
    { name: "Classes", path: "/admin/classes", icon: <FaChalkboardTeacher /> },
    { name: "Teacher Post", path: "/admin/teachers", icon: <FaUserTie /> },

    {
      name: "Testimonials Post",
      path: "/admin/testimonials",
      icon: <FaCommentDots />,
    },

    { name: "Contact", path: "/admin/contact", icon: <FaNewspaper /> },
    { name: "Admission", path: "/admin/admission", icon: <FaNewspaper /> },
    { name: "Fees", path: "/admin/fees", icon: <FaNewspaper /> },
  ];

  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white
        transition-all duration-300 z-50
        ${sidebarOpen ? "w-72 translate-x-0" : "w-20 -translate-x-full"}
        lg:translate-x-0`}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">

          <span className="font-bold text-lg">
            {sidebarOpen ? "Admin Panel" : "AP"}
          </span>

          <button
            className="text-xl lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>

        </div>


        {/* MENU */}
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-64px)]">

          {menu.map((item) => (
            <div key={item.name}>

              {item.submenu ? (

                <button
                  onClick={() => toggleMenu(item.name)}
                  className="flex items-center justify-between w-full p-3 rounded hover:bg-gray-800"
                >

                  <div className="flex items-center gap-3">
                    {item.icon}
                    {sidebarOpen && item.name}
                  </div>

                  {sidebarOpen && (
                    <span className="text-xs">
                      {openMenu === item.name ? "▲" : "▼"}
                    </span>
                  )}

                </button>

              ) : (

                <NavLink
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded transition
                    ${isActive ? "bg-blue-600" : "hover:bg-gray-800"}`
                  }
                >
                  {item.icon}
                  {sidebarOpen && item.name}
                </NavLink>

              )}

              {item.submenu && openMenu === item.name && sidebarOpen && (
                <div className="ml-7 mt-1 space-y-1">

                  {item.submenu.map((sub) => (

                    <NavLink
                      key={sub.path}
                      to={sub.path}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `block text-sm p-2 rounded
                        ${isActive ? "bg-blue-500" : "hover:bg-gray-800"}`
                      }
                    >
                      {sub.name}
                    </NavLink>

                  ))}

                </div>
              )}

            </div>
          ))}

        </nav>

      </aside>
    </>
  );
}