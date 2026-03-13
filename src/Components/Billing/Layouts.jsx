import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar-Page/Sidebar";

export default function Layouts() {
  const location = useLocation();
  const isDashboard = location.pathname === "/";

  return (
  
   <div className=" min-h-screen max-w-[1920px] mx-auto bg-gray-100 overflow-x-hidden shadow-lg">
      {isDashboard ? (
        <div className="max-w-[1920px] mx-auto shadow-lg">
          <main className="p-1">
            <Outlet />
          </main>
        </div>
      ) : (
        <div className="flex">

          <Sidebar /> 
          
          <div className="flex-1 max-w-[1920px] mx-auto shadow-lg">
            <Navbar />
            <main >
              <Outlet />
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
