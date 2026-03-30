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
      <div className=" w-full overflow-y-auto gap-2 h-[100vh] bg-gray-100">
      <div className="">
        {showSidebar ? (
       
          <div className="flex">
            <Sidebar /> 
            <div className="flex-1">
              <Navbar />
              <main className=" ">
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