import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar-Page/Sidebar";
import TopHeader from "./TopHeader";

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

        <div className="shadow-lg">
          <main className="p-1">
            <Outlet context={{ refreshTrigger, triggerRefresh }} />
          </main>
        </div>
      ) : (

        <div className="flex min-h-screen">
          <Sidebar />


          <div className="flex-1 flex flex-col shadow-lg overflow-hidden">
            <TopHeader />


            <main className="flex-1 p-4 overflow-y-auto">
              <Outlet context={{ refreshTrigger, triggerRefresh }} />
            </main>

          </div>
        </div>
      )}
    </div>
  );
}