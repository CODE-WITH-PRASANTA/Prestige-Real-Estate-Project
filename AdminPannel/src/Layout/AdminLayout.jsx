import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";

export default function AdminLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex w-full">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        className={`flex-1 transition-all duration-300 w-full
        ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}
      >

        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-20 bg-gray-100 min-h-screen w-full">
          <Outlet />
        </main>

      </div>

    </div>
  );
}