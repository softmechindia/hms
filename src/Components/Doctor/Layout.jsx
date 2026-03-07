import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "../Doctor/DoctorSidebar/SideBar";

export default function Layouts() {
  const location = useLocation();

  // 1. Define the paths where the Sidebar SHOULD be visible
  const sidebarRoutes = ["/doctor/dashboard", "/doctor/patient", "/doctor/upcoming"];

  // 2. Check if the current path matches any of those routes
  const showSidebar = sidebarRoutes.includes(location.pathname);

  return (
    <div className="min-h-full max-w-[1920px] mx-auto bg-gray-200 overflow-x-hidden shadow-lg">
      <div className="min-h-screen">
        {showSidebar ? (
       
          <div className="flex">
            <Sidebar />
            <div className="flex-1">
              <Navbar />
              <main className="p-1">
                <Outlet />
              </main>
            </div>
          </div>
        ) : (
        
          <main className="p-1">
            <Outlet />
          </main>
        )}
      </div>
    </div>
  );
}