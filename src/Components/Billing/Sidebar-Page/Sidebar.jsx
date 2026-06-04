import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import {
  LayoutGrid, CalendarDays, Hourglass, CheckCircle,
  XCircle, Wallet, User, LogOut, Menu, X
} from "lucide-react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false)

  const menu = [
    { label: "Dashboard", icon: LayoutGrid, path: "/billing" },
    { label: "Total Appointments", icon: CalendarDays, path: "/billing/total-app" },
    { label: "Pending Appointments", icon: Hourglass, path: "/billing/pending" },
    { label: "Today's Confirmed", icon: CheckCircle, path: "/billing/today-conf" },
    { label: "Cancelled Appointments", icon: XCircle, path: "/billing/cancel" },
    { label: "Collections", icon: Wallet, path: "/billing/collections" },
  ];

  const currentPage = menu.find(item => item.path === location.pathname)?.label || "HMS";


  return (
    <>
      <div className="lg:hidden fixed top-0 right-0 left-0 h-16 bg-[#4F6EEA] flex items-center justify-between px-4 z-[50] shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(true)} className=" text-white bg-white/10">
            <Menu size={24} />
          </button>
          <span className="text-white font-bold">{currentPage}</span></div>
        <div className="w-9 h-9  bg-white/20 flex items-center justify-center border border-white/30">
          <FaUser size={16} className="text-white" />
        </div></div>
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 min-h-screen   bg-[#082cbb] text-white p-4 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>

        <div className="flex justify-center items-center w-full">
          <img
            src={logo}
            alt="HMS Logo"
            className="h-auto w-[80%]"
          />
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center py-10 ">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 p-0.5 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#111827] flex items-center justify-center">
              <FaUser size={20} className="text-orange-500" />
            </div>
          </div>
          <h3 className="mt-4 font-bold text-lg">Dr. John Doe</h3>
          <p className="text-white/60 text-xs tracking-widest uppercase">Cardiologist</p>
        </div>

        <nav className="px-1 space-y-2">
          {menu.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/billing"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-md transition-all ${isActive
                    ? "bg-white text-[#4F6EEA]"
                    : "text-white hover:bg-white/10"
                  }`
                }
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>

  );
}




