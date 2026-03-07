import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import {
  LayoutGrid, CalendarDays, Hourglass, CheckCircle,
  XCircle, Wallet, User, LogOut, Menu, X
} from "lucide-react";
import { useNavigate, useLocation,NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [  
    { label: "Dashboard", icon: LayoutGrid, path: "/" },
    { label: "Total Appointments", icon: CalendarDays, path: "/total-app" },
    { label: "Pending Appointments", icon: Hourglass, path: "/pending" },
    { label: "Today's Confirmed", icon: CheckCircle, path: "/today-conf" },
    { label: "Cancelled Appointments", icon: XCircle, path: "/cancel" },
    { label: "Collections", icon: Wallet, path: "/collections" },
    { label: "My Profile", icon: User, path: "/my-profile" },
    { label: "Logout", icon: LogOut, path: "/Logout" },
  ];


  return (
   <div className="w-64 min-h-screen bg-gradient-to-b from-[#4F6EEA] to-[#6FA8FF] text-white p-4 flex flex-col">
            <div className="flex mx justify-center items-center gap-3">
                <img
                  src={logo}
                  alt="HMS Logo"
                  className="h-9 w-auto hover:opacity-80 transition cursor-pointer"
                />
              </div>
    
      <div className="flex flex-col items-center mt-6">
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
  {menu.map((item) => {

    const Icon = item.icon; 

    return (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-md mb-2 transition-colors ${
            isActive 
              ? "bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF] text-white shadow-md" 
              : "text-white hover:bg-white/10"
          }`
        }
      >
   
        <Icon size={20} /> 
        
        <span>{item.label}</span>
      </NavLink>
    );
  })}
</nav>
    </div>
     
  );
}