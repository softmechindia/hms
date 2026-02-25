import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Doctor/Navbar";
import Sidebar from "../Doctor/DoctorSidebar/SideBar";

export default function Layout() {
  const location = useLocation();
  const path = location.pathname.toLowerCase(); 


  const isDashboard = path === "/" || path.includes("dashboard");
  const isPatientPage = path.includes("patient");
  const isUpcomingPage = path.includes("upcoming");

  const shouldShowSidebar = isDashboard || isPatientPage || isUpcomingPage;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <Navbar />

      <div className="flex flex-1">
      
        {shouldShowSidebar && (
          <aside className="w-64 bg-white shadow-md">
            <Sidebar />
          </aside>
        )}

        <main className={`flex-1 p-4 ${shouldShowSidebar ? "" : "w-full"}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}