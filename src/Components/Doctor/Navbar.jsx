import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Menu,
  X,
  User,
} from "lucide-react";

import Dashboardlogo from "../../assets/images/Dashboardlogo.png";

const Navbar = ({ setAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();

    if (typeof setAuth === "function") {
      setAuth(false);
    }

    window.location.href = "/login";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isPrescriptionPage = location.pathname === "/doctor/add-prescription";

  const hideLogoPaths = [
    "/doctor/dashboard",
    "/doctor/patient",
    "/doctor/upcoming",
  ];

  const showLogo = !hideLogoPaths.includes(location.pathname);

  const navLinks = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/doctor/dashboard",
    },
    {
      name: "Patients",
      icon: <Users size={18} />,
      path: "/doctor/patient",
    },
    {
      name: "Upcoming",
      icon: <Calendar size={18} />,
      path: "/doctor/upcoming",
    },
    {
      name: "Prescription",
      icon: <FileText size={18} />,
      path: "/doctor/add-prescription",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">

        {/* Left Side: Logo */}
        {showLogo && (
          <div className={`items-center shrink-0 md:ml-0 lg:-ml-10 ${isPrescriptionPage ? "flex" : "hidden md:flex"}`}>
            <Link to="/doctor/dashboard" className="block py-1">
              <img
                src={Dashboardlogo}
                alt="Logo"
                className="h-8 md:h-9 w-auto object-contain block"
              />
            </Link>
          </div>
        )}


        <div className="hidden md:flex items-center gap-x-2 lg:gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-2.5 py-3 rounded-md text-xs lg:text-sm font-semibold transition-all ${isActive
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Right Side: Profile & Mobile Toggle */}
        <div className="flex items-center gap-2 md:gap-3">

          {/* Profile Dropdown */}
          <div className="relative py-1" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center border-2 border-white shadow-md hover:scale-105 transition-transform"            >
              <User className="text-white w-4 h-4" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden ring-1 ring-black ring-opacity-5">
                {/* User info */}
                <div className="px-4 py-2.5 border-b bg-gray-50/70">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Logged in as</p>
                  <p className="font-semibold text-gray-800 text-sm truncate">Doctor Name</p>
                </div>

                {/* Profile Links */}
                <div className="py-1">
                  <Link
                    to="/doctor/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 transition-colors"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/doctor/change-password"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 transition-colors"
                  >
                    Change Password
                  </Link>
                </div>

                {/* Stats Grid */}
                <div className="px-4 py-3 border-t border-b border-gray-100 bg-gray-50/30 space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total</span>
                    <span className="text-red-500 font-bold bg-red-50 px-1.5 py-0.5 rounded">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">New</span>
                    <span className="text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded">0/0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Old</span>
                    <span className="text-orange-500 font-bold bg-orange-50 px-1.5 py-0.5 rounded">0/0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Cancel</span>
                    <span className="text-red-500 font-bold bg-red-50 px-1.5 py-0.5 rounded">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Review</span>
                    <span className="text-cyan-600 font-bold bg-cyan-50 px-1.5 py-0.5 rounded">0</span>
                  </div>
                </div>

                {/* Action */}
                <button
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-red-50 cursor-pointer text-red-600 font-semibold transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Hamburger Menu Icon (Visible on mobile/tablet screens when rules require it) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile & Small Tablet Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1.5 shadow-inner">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                  ? "bg-orange-50 text-orange-600 font-semibold"
                  : "hover:bg-gray-50 text-gray-700"
                }`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;