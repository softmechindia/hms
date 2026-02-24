import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar-Page/Sidebar";

export default function Layouts() {
  const location = useLocation();
  const isDashboard = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gray-100">

      {isDashboard ? (
        <>
          <Navbar/>
          <main className="p-1">
            <Outlet />
          </main>
        </>
      ) : (
        <div className="flex">
          <Sidebar/>
          <div className="flex-1">
            <Navbar />
            <main className="p-1">
              <Outlet />
            </main>
          </div>
        </div>
      )}

    </div>
  );
}
