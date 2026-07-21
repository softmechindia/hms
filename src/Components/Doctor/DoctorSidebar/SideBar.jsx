import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { Calendar, FileText, LayoutDashboard, Users, Menu, X, LogOut } from "lucide-react";
import { FaUser } from "react-icons/fa";

// ACCEPT PROPS FROM PARENT LAYOUT
function Sidebar({ isOpen, setIsOpen }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : { user_name: "Dr. User" };

  });
  // Helper function for the initial
  const getInitial = (name) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  }

  useEffect(() => {
    const handleProfileUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      if (updatedUser) setUser(updatedUser);
    };

    // Listen for the custom event dispatched in MyProfile.js
    window.addEventListener("profileUpdate", handleProfileUpdate);

    // Also listen for storage changes (in case of multi-tab updates)
    window.addEventListener("storage", handleProfileUpdate);

    return () => {
      window.removeEventListener("profileUpdate", handleProfileUpdate);
      window.removeEventListener("storage", handleProfileUpdate);
    };
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/doctor/dashboard" },
    { label: "My Patients", icon: <Users size={20} />, path: "/doctor/patient" },
    { label: "Upcoming Appointment", icon: <Calendar size={20} />, path: "/doctor/upcoming" },
    { label: "Prescription", icon: <FileText size={20} />, path: "/doctor/add-prescription" },
    { label: "Logout", icon: <LogOut size={20} />, path: "/my-patient" },
  ];

  const currentPage = menu.find(item => item.path === location.pathname)?.label || "HMS";

  return (
    <>
      {/* --- MOBILE TOP BAR --- */}
      <div className="lg:hidden fixed top-0 right-0 left-0 h-16 bg-[#4F6EEA] flex items-center justify-between px-4 z-[50] shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="text-white bg-white/10 rounded-lg p-1.5"
          >
            <Menu size={24} />
          </button>
          <span className="text-white font-bold">{currentPage}</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
          <FaUser size={16} className="text-white" />
        </div>
      </div>

      {/* --- SIDEBAR MAIN --- */}
      {/* Updated conditional classes: handles hidden state cleanly for both Desktop & Mobile */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        min-h-screen bg-[#082cbb] text-white flex flex-col
        transition-all duration-300 ease-in-out
        ${isOpen
          ? "w-64 p-4 translate-x-0"
          : "w-0 p-0 overflow-hidden -translate-x-full lg:translate-x-0 lg:w-0 lg:p-0"
        }
      `}>

        {/* Mobile Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute right-4 top-4 text-white/70"
        >
          <X size={24} />
        </button>

        {/* Sidebar Content (Wrapped in visibility protection for clean collapses) */}
        <div className={`${isOpen ? "opacity-100 block" : "opacity-0 hidden"} transition-opacity duration-200 flex flex-col h-full w-full`}>
          <div className="flex justify-center items-center gap-3 mt-2">
            <img
              src={logo}
              alt="HMS Logo"
              className="h-9 w-auto hover:opacity-80 transition cursor-pointer"
              onClick={() => navigate("/doctor/dashboard")}
            />
          </div>

          <div className="flex flex-col items-center mt-6">
            <div className="relative mb-2">

              <div className="relative mb-2">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 p-0.5">


                  <div className="w-full h-full rounded-full bg-[#111827] flex items-center justify-center overflow-hidden">                    {(user.picture_url || user.user_pic) ? (
                    <img
                      src={user.picture_url || user.user_pic}
                      alt="Profile"

                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-orange-500 font-bold text-3xl">
                      {getInitial(user.user_name)}
                    </div>
                  )}
                  </div>
                </div>
              </div>

            </div>
            <span className="text-white font-semibold">{user.user_name || "Doctor"}</span>
            <span className="text-white/70 text-sm">{user.designation || "Cardiologist"}</span>          </div>

          <nav className="flex-1 mt-8 space-y-2 overflow-y-auto">
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  // Only auto-close on mobile screens when a link is clicked
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-md transition-all ${isActive
                    ? "bg-white text-[#4F6EEA] shadow-md border-l-4 border-white"
                    : "text-white hover:bg-white/10"
                  }`
                }
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* --- OVERLAY --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;