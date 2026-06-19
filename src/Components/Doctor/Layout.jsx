// import React, { useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import Sidebar from "../Doctor/DoctorSidebar/SideBar";
// import TopHeader from "../Doctor/Header"; 

// export default function Layouts() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const location = useLocation();

 
//   const sidebarRoutes = ["/doctor/dashboard", "/doctor/patient", "/doctor/upcoming"];
//   const showLayout = sidebarRoutes.includes(location.pathname);

 
//   const getTitle = () => {
//     switch (location.pathname) {
//       case "/doctor/dashboard": return "Dashboard";
//       case "/doctor/patient": return "Patients";
//       case "/doctor/upcoming": return "Upcoming";
//       default: return "";
//     }
//   };

//   return (
//     <div className="w-full h-screen bg-gray-100 flex overflow-hidden">
//       {showLayout ? (
//         <>
     
//           {isSidebarOpen && <Sidebar />}
          
//           <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
//             <TopHeader 
//               toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
//               title={getTitle()} 
//             />
//             <main className="p-4">
//               <Outlet />
//             </main>
//           </div>
//         </>
//       ) : (
       
//         <main className="w-full h-screen overflow-y-auto">
//           <Outlet />
//         </main>
//       )}
//     </div>
//   );
// }



import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./DoctorSidebar/SideBar"; 
import TopHeader from "./Header"; 

export default function Layouts() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const sidebarRoutes = ["/doctor/dashboard", "/doctor/patient", "/doctor/upcoming", "/doctor/change-password","/doctor/profile"];
  const showLayout = sidebarRoutes.includes(location.pathname);

  // 1. Move the function definition outside of any other declarations
  const getTitle = () => {
    switch (location.pathname) {
      case "/doctor/dashboard": return "Dashboard";
      case "/doctor/patient": return "Patients";
      case "/doctor/upcoming": return "Upcoming";
      case "/doctor/change-password": return "Change Password";
      case "/doctor/profile":  return "MyProfile";
      default: return "";
    }
  };


  const pageTitle = getTitle();

  return (
    <div className="w-full h-screen bg-gray-100 flex overflow-hidden">
      {showLayout ? (
        <>
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
            <TopHeader 
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
              title={pageTitle} 
            />
            <main className="p-4">
              <Outlet />
            </main>
          </div>
        </>
      ) : (
        <main className="w-full h-screen overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      )}
    </div>
  );
}