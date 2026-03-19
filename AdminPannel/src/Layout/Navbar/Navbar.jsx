import { FaBars, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const [openProfile, setOpenProfile] = useState(false);

  const handleLogout = () => {
    alert("Logout Clicked");
  };

  return (
    <header className={`navbar ${sidebarOpen ? "sidebar-open" : ""}`}>
      
      {/* LEFT */}
      <div className="navbar-left">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>

        <h2 className="navbar-title">Admin Dashboard</h2>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <div className="profile-wrapper">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="profile-img"
            onClick={() => setOpenProfile(!openProfile)}
          />

          {openProfile && (
            <div className="profile-dropdown">
              <button className="dropdown-item">
                <FaUser /> <span>Profile</span>
              </button>

              <button className="dropdown-item">
                <FaCog /> <span>Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="dropdown-item logout"
              >
                <FaSignOutAlt /> <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}