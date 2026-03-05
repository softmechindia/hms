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
   <div className="flex h-screen overflow-hidden bg-gray-50">
  {shouldShowSidebar && (
    <aside className="w-64 h-full flex-shrink-0 border-r border-slate-200 bg-white">
      <Sidebar />
    </aside>
  )}

  <div className="flex flex-col flex-1 min-w-0">
    <Navbar />

    <main className="flex-1 overflow-y-auto ">
      <Outlet />
    </main>
  </div>
</div>
  );
}