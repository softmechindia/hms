import React from "react";
import { FaKey, FaPrescriptionBottleAlt, FaUser } from "react-icons/fa";
import { FiLayout } from "react-icons/fi";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menu = [
    { label: "Dashboard", icon: <FiLayout size={20} />, path: "/dashboard" },
    { label: "Prescription", icon: <FaPrescriptionBottleAlt size={20} />, path: "/upcoming" },
    { label: "MyPatient", icon: <FaUser size={20} />, path: "/patient" },
    { label: "ChangePassword", icon: <FaKey size={20} />, path: "/change-password" },
    { label: "Logout", icon: null, path: "/logout" }
  ];

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-[#4F6EEA] to-[#6FA8FF] text-white p-4 flex flex-col">
      {/* Profile */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 p-0.5">
            <div className="w-full h-full rounded-full bg-[#111827] flex items-center justify-center">
              <FaUser size={24} className="text-orange-500" />
            </div>
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#111827] rounded-full"></span>
        </div>
        <h3 className="text-sm font-bold tracking-wide">Admin User</h3>
        <p className="text-[10px] uppercase font-bold tracking-tighter mt-1">Super Admin</p>
      </div>

      {/* Menu items */}
      <nav className="flex-1 mt-4">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md mb-2 hover:bg-white/20 transition-colors ${
                isActive ? "bg-white/30" : ""
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