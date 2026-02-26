import React from "react";
import { NavLink } from "react-router-dom";

import { Calendar, FileText, LayoutDashboard, LogOut, Users } from "lucide-react";


import { FaKey, FaUser } from "react-icons/fa";

function Sidebar() {
  const menu = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/doctor/dashboard" },
    { label: "Patients", icon: <Users size={20} />, path: "/doctor/patient" },
    { label: "Upcoming", icon: <Calendar size={20} />, path: "/doctor/upcoming" },
    { label: "Prescription", icon: <FileText size={20} />, path: "/doctor/add-prescription" },
    { label: "MyPatient", icon: <FaUser size={20} />, path: "/my-patient" },
    { label: "ChangePassword", icon: <FaKey size={20} />, path: "/change-password" },
    { label: "Logout", icon: <LogOut size={20} />, path: "/logout" },
  ];

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-[#4F6EEA] to-[#6FA8FF] text-white p-4 flex flex-col">
    
      <div className="flex flex-col items-center mb-3">
        <div className="relative mb-2">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 p-0.5">
            <div className="w-full h-full rounded-full bg-[#111827] flex items-center justify-center">
              <FaUser size={24} className="text-orange-500" />
            </div>
          </div>
        </div>
        <span className="text-white font-semibold">Dr. John Doe</span>
        <span className="text-white/70 text-sm">Cardiologist</span>
      </div>

      <nav className="flex-1 mt-4">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md mb-2  transition-colors ${
                isActive ? "bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF] text-white shadow-md" : "text-white"
              }`
            }
          >
            {item.icon}
            
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;