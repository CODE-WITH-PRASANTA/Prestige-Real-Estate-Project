import {
  FaBars,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaEnvelope,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "animate.css";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const [openMessage, setOpenMessage] = useState(false);
  const messageRef = useRef(null);
  const [openNotification, setOpenNotification] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }

      if (messageRef.current && !messageRef.current.contains(e.target)) {
        setOpenMessage(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setOpenNotification(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged out!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        // navigate("/login");
        // localStorage.removeItem("token");
      }
    });
  };

  const toggleMessage = () => {
    setOpenMessage(!openMessage);
    setOpenNotification(false);
    setOpenProfile(false);
  };

  const toggleNotification = () => {
    setOpenNotification(!openNotification);
    setOpenMessage(false);
    setOpenProfile(false);
  };

  const toggleProfile = () => {
    setOpenProfile(!openProfile);
    setOpenMessage(false);
    setOpenNotification(false);
  };

  return (
    <header
      className={`
        fixed top-0 right-0 z-40 h-16 bg-white
        border-b border-gray-200
        flex items-center justify-between
        px-4 md:px-6 lg:px-8
        transition-all duration-300
        ${sidebarOpen ? "lg:left-72" : "lg:left-20"} left-0
      `}
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          className="text-xl text-gray-600 hover:text-blue-600 transition"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          type="button"
        >
          <FaBars />
        </button>

        <h2 className="text-sm md:text-lg font-semibold text-gray-800">
          Admin Dashboard
        </h2>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* MESSAGE ICON */}
        <div className="relative" ref={messageRef}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleMessage();
            }}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition"
          >
            <FaEnvelope className="text-sm" />

            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-semibold shadow">
              3
            </span>
          </button>

          {/* DROPDOWN */}
          <div
            className={`
      absolute right-0 mt-3 w-96
      bg-white/90 backdrop-blur-xl
      border border-gray-200
      rounded-2xl
      shadow-2xl
      transition-all duration-200 origin-top-right
      ${
        openMessage
          ? "opacity-100 scale-100 visible"
          : "opacity-0 scale-95 invisible"
      }
    `}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50 rounded-t-2xl">
              <span className="font-semibold text-gray-700">Messages</span>

              <button className="text-xs text-indigo-600 hover:underline">
                View All
              </button>
            </div>

            {/* LIST */}
            <div className="max-h-80 overflow-y-auto">
              {/* ITEM */}
              <div className="flex gap-3 px-4 py-3 hover:bg-gray-50 transition cursor-pointer">
                <img
                  src="https://i.pravatar.cc/40?1"
                  className="w-10 h-10 rounded-full shadow"
                />

                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-semibold text-sm text-gray-800">
                      Emma Brown
                    </span>

                    <span className="text-xs text-gray-400">2m</span>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    Hi, could you share details for the 3BHK apartment?
                  </p>

                  <span className="inline-block mt-1 text-[10px] px-2 py-1 rounded-full bg-emerald-100 text-emerald-600">
                    New Inquiry
                  </span>
                </div>
              </div>

              {/* ITEM */}
              <div className="flex gap-3 px-4 py-3 hover:bg-gray-50 transition cursor-pointer">
                <img
                  src="https://i.pravatar.cc/40?2"
                  className="w-10 h-10 rounded-full shadow"
                />

                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-semibold text-sm text-gray-800">
                      David Miller
                    </span>

                    <span className="text-xs text-gray-400">10m</span>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    I’m interested in the villa listed last week.
                  </p>

                  <span className="inline-block mt-1 text-[10px] px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                    Follow Up
                  </span>
                </div>
              </div>

              {/* ITEM */}
              <div className="flex gap-3 px-4 py-3 hover:bg-gray-50 transition cursor-pointer">
                <img
                  src="https://i.pravatar.cc/40?3"
                  className="w-10 h-10 rounded-full shadow"
                />

                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-semibold text-sm text-gray-800">
                      Sophia Turner
                    </span>

                    <span className="text-xs text-gray-400">45m</span>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    Can we schedule a visit tomorrow?
                  </p>

                  <span className="inline-block mt-1 text-[10px] px-2 py-1 rounded-full bg-yellow-100 text-yellow-600">
                    Appointment
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NOTIFICATION ICON */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleNotification();
            }}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition"
          >
            <FaBell className="text-sm" />

            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-semibold">
              4
            </span>
          </button>

          {/* DROPDOWN */}
          <div
            className={`
      absolute right-0 mt-3 w-96
      bg-white/95 backdrop-blur-xl
      border border-gray-200
      rounded-2xl
      shadow-2xl
      transition-all duration-200 origin-top-right
      ${
        openNotification
          ? "opacity-100 scale-100 visible"
          : "opacity-0 scale-95 invisible"
      }
    `}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50 rounded-t-2xl">
              <span className="font-semibold text-gray-700">
                Notification (4)
              </span>

              <FaCog className="text-gray-400 cursor-pointer" />
            </div>

           <div
  className="max-h-80 overflow-y-auto"
  style={{
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }}
>
              {/* ITEM */}
              <div className="flex gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg m-2">
                <img
                  src="https://i.pravatar.cc/40?4"
                  className="w-10 h-10 rounded-full"
                />

                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    <b>Donna Berlin</b> wants to edit Evohus Admin & Dashboard
                  </p>

                  <span className="text-xs text-gray-400">5 min ago</span>
                </div>
              </div>

              {/* ITEM */}
              <div className="flex gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg m-2">
                <img
                  src="https://i.pravatar.cc/40?5"
                  className="w-10 h-10 rounded-full"
                />

                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    <b>Michael Adams</b> completed task Create Analytics Report
                  </p>

                  <span className="text-xs text-gray-400">12 min ago</span>
                </div>
              </div>

              {/* ITEM */}
              <div className="flex gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg m-2">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold">
                  !
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    System Alert: High CPU usage
                  </p>

                  <span className="text-xs text-gray-400">30 min ago</span>
                </div>
              </div>

              {/* ITEM */}
              <div className="flex gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg m-2">
                <img
                  src="https://i.pravatar.cc/40?6"
                  className="w-10 h-10 rounded-full"
                />

                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    Sarah Miller sent a new message
                  </p>

                  <span className="text-xs text-gray-400">1 hr ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROFILE */}

        <div className="relative" ref={profileRef}>
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="
              w-9 h-9 rounded-full border
              cursor-pointer
              hover:ring-2 hover:ring-blue-500
              transition
            "
            onClick={(e) => {
              e.stopPropagation();
              toggleProfile();
            }}
          />

          {/* DROPDOWN */}
          <div
            className={`
              absolute right-0 mt-3 w-52
              bg-white border border-gray-200
              rounded-xl shadow-lg
              overflow-hidden
              transform transition-all duration-200 origin-top-right
              ${
                openProfile
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
              }
            `}
          >
            <button
              onClick={() => {
                navigate("/admin/profile");
                setOpenProfile(false);
              }}
              className="
                flex items-center gap-3 w-full
                px-4 py-3
                hover:bg-gray-100
                text-sm
              "
              type="button"
            >
              <FaUser className="text-gray-500" />
              Profile
            </button>

            <button
              onClick={() => {
                navigate("admin/settings");
                setOpenProfile(false);
              }}
              className="
                flex items-center gap-3 w-full
                px-4 py-3
                hover:bg-gray-100
                text-sm
              "
              type="button"
            >
              <FaCog className="text-gray-500" />
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="
                flex items-center gap-3 w-full
                px-4 py-3
                text-red-500
                hover:bg-red-50
                text-sm
              "
              type="button"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
