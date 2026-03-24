import { FaBars, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "animate.css";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {

  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // close when click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    }

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
      `
    },

    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
    }

  }).then((result) => {

    if (result.isConfirmed) {

      Swal.fire({
        title: "Logged out!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });

      // logout logic here
      // navigate("/login")
      // localStorage.removeItem("token")

    }

  });
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
>
  <FaBars />
</button>

<h2 className="text-sm md:text-lg font-semibold text-gray-800">
  Admin Dashboard
</h2>

</div>



{/* RIGHT */}

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
  onClick={() => setOpenProfile(!openProfile)}
/>



{/* DROPDOWN */}

<div
  className={`
  absolute right-0 mt-3 w-52
  bg-white border border-gray-200
  rounded-xl shadow-lg
  overflow-hidden
  transform transition-all duration-200 origin-top-right
  ${openProfile
    ? "opacity-100 scale-100 visible"
    : "opacity-0 scale-95 invisible"}
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
>
  <FaUser className="text-gray-500" />
  Profile
</button>


<button
  onClick={() => {
    navigate("/admin/settings");
    setOpenProfile(false);
  }}
  className="
  flex items-center gap-3 w-full
  px-4 py-3
  hover:bg-gray-100
  text-sm
  "
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
>
  <FaSignOutAlt />
  Logout
</button>

</div>


</div>


</header>

  );
}