import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PharmacySidebar from "./PharmacySidebar";
import Header from "./Header";


function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (

    <div className="flex h-screen w-full overflow-hidden bg-white">
      <PharmacySidebar isCollapsed={isCollapsed} />
      
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-2 lg:p-4">
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}

export default Layout;