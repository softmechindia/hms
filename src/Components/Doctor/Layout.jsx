import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "../Doctor/DoctorSidebar/SideBar";

export default function Layouts() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sirf in routes par sidebar aur navbar dikhega
  const sidebarRoutes = ["/doctor/dashboard", "/doctor/patient", "/doctor/upcoming"];
  const showSidebar = sidebarRoutes.includes(location.pathname);

  return (
    <div className="w-full h-screen bg-gray-100 overflow-hidden flex">
      {showSidebar ? (
        <>
          {/* Sidebar ko state aur toggle function dena zaroori hai */}
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          
          <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
            {/* Navbar ko toggle function pass kiya taaki menu button chale */}
            <Navbar setIsOpen={setIsSidebarOpen} />
            <main className="p-4">
              <Outlet />
            </main>
          </div>
        </>
      ) : (
        <main className="w-full h-screen overflow-y-auto">
          <Outlet />
        </main>
      )}
    </div>
  );
}