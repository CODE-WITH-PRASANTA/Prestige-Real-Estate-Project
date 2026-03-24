import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import {
  FaHome,
  FaBuilding,
  FaKey,
  FaRupeeSign,
  FaQuestionCircle,
  FaBlog,
  FaImages,
  FaCalendarAlt,
  FaStar,
  FaTimes,
  FaPhoneAlt, 
  FaUserPlus
} from "react-icons/fa";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {

const menu = [
  { name: "Dashboard", path: "dashboard", icon: <FaHome /> },

  { name: "Property Management", path: "/admin/saleproperty", icon: <FaBuilding /> },

  { name: "Rent Properties", path: "/admin/rentproperty", icon: <FaKey /> },

  { name: "Testimonial", path: "/admin/testimonial", icon: <FaStar /> },

  { name: "FAQ Posting", path: "/admin/faqposting", icon: <FaQuestionCircle /> },

  { name: "Blog Posting", path: "/admin/blogposting", icon: <FaBlog /> },

  {
    name: "Add Property",
    icon: <FaImages />,
    submenu: [
      { name: "Property View", path: "/admin/Property-view" },
      { name: "Add Property", path: "/admin/add-property" },
      { name: "Property Details", path: "/admin/property-details" },

    ],
  },

  { name: "Add Customer" ,path: "/add/customer" , icon: <FaUserPlus />},

  { name: "Main Gallery", path: "/admin/event", icon: <FaCalendarAlt /> },

  { name: "Contact", path: "/admin/contact", icon: <FaPhoneAlt /> },
];

  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  <style>
{`
nav::-webkit-scrollbar {
  display: none;
}
`}
</style>

return (
  <>
    {/* OVERLAY */}
    {sidebarOpen && (
      <div
        className="fixed inset-0 bg-black/40 lg:hidden z-40"
        onClick={() => setSidebarOpen(false)}
      />
    )}

    {/* SIDEBAR */}
    <div
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white
      transition-all duration-300 z-50
      ${sidebarOpen ? "w-72 translate-x-0" : "w-20 -translate-x-full"}
      lg:translate-x-0`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">

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
      <nav
  className="p-3 space-y-2 overflow-y-auto h-[calc(100vh-64px)]"
  style={{
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }}
>

        {menu.map((item) => (
          <div key={item.name}>

            {/* MAIN MENU */}
            {item.submenu ? (

              <button
                onClick={() => toggleMenu(item.name)}
                className="flex items-center justify-between w-full p-3 rounded hover:bg-gray-800 transition"
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


            {/* SUBMENU */}
            {item.submenu &&
              openMenu === item.name &&
              sidebarOpen && (

                <div className="ml-8 mt-1 space-y-1">

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
    </div>
  </>
);
}
