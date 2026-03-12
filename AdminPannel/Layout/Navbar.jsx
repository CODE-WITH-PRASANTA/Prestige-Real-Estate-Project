import { FaBars, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {

  const [openProfile,setOpenProfile] = useState(false);

  const handleLogout = () => {
    alert("Logout Clicked");
  };

  return (

<header
  className={`fixed top-0 right-0 z-40 h-16 bg-white
  border-b flex items-center justify-between px-4 md:px-6 lg:px-8
  transition-all duration-300
  ${sidebarOpen ? "lg:left-72" : "lg:left-20"} left-0`}
>

{/* LEFT */}

<div className="flex items-center gap-3">

<button
  className="text-xl text-gray-600 hover:text-blue-600"
  onClick={() => setSidebarOpen(!sidebarOpen)}
>
  <FaBars />
</button>

<h2 className="text-sm md:text-lg font-semibold text-gray-800">
  Admin Dashboard
</h2>

</div>


{/* RIGHT PROFILE */}

<div className="relative">

<img
  src="https://i.pravatar.cc/40"
  alt="user"
  className="w-9 h-9 rounded-full border cursor-pointer"
  onClick={()=>setOpenProfile(!openProfile)}
/>


{openProfile && (

<div className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-lg overflow-hidden">

<button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100">
  <FaUser />
  Profile
</button>

<button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100">
  <FaCog />
  Settings
</button>

<button
  onClick={handleLogout}
  className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-gray-100"
>
  <FaSignOutAlt />
  Logout
</button>

</div>

)}

</div>

</header>

  );
}