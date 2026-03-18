import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import PharmacyApp from "../Pharmacy/PharmacyApp";

function Layout() {
  return (

<div className="flex h-screen w-full overflow-hidden bg-white">      
 
      <Sidebar />


      <div className="flex flex-col flex-1 h-full overflow-hidden">
  
        <Header />

    
   <main className="flex-1 overflow-y-auto bg-gray-50 p-2 lg:p-4">
  <div className="w-full"> 
    <PharmacyApp />
  </div>
</main>
      </div>
      
    </div>
  );
}

export default Layout;