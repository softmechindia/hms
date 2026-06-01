import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar-Page/Sidebar";

export default function Layouts({ setAuth }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const location = useLocation();
  
  // Strict condition mapping matching dashboard path state
  const isDashboard = location.pathname === "/billing" || location.pathname === "/billing/";

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="h-[100vh] bg-gray-100 overflow-x-hidden shadow-lg">
      {isDashboard ? (
        /* Full width layout without sidebar (image_0def3e.png view) */
        <div className="shadow-lg">
          <main className="p-1">
            <Outlet context={{ refreshTrigger, triggerRefresh }} />
          </main>
        </div>
      ) : (
        /* Standard layout with sidebar for inside configuration paths */
        <div className="flex">
          <Sidebar />

          <div className="flex-1 mx-auto shadow-lg"> 
            <main>
              <Outlet context={{ refreshTrigger, triggerRefresh }} />
            </main>
          </div>
        </div>
      )}
    </div>
  );
}