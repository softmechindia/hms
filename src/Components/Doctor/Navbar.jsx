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

const Navbar = () => {
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

  const isPrescriptionPage =
    location.pathname === "/doctor/add-prescription";

  const hideLogoPaths = [
    "/doctor/dashboard",
    "/doctor/patient",
    "/doctor/upcoming",
  ];

  const showLogo = !hideLogoPaths.includes(location.pathname);

  const navLinks = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/doctor/dashboard",
    },
    {
      name: "Patients",
      icon: <Users size={20} />,
      path: "/doctor/patient",
    },
    {
      name: "Upcoming",
      icon: <Calendar size={20} />,
      path: "/doctor/upcoming",
    },
    {
      name: "Prescription",
      icon: <FileText size={20} />,
      path: "/doctor/add-prescription",
    },
  ];

  const responsiveVisibility = !isPrescriptionPage
    ? "hidden lg:flex"
    : "flex";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className={`w-48 ${responsiveVisibility} items-center`}>
          {showLogo && (
            <img
              src={Dashboardlogo}
              alt="Logo"
              className="h-9 w-auto cursor-pointer"
            />
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition ${isActive
                  ? "bg-orange-500 text-white"
                  : "bg-white border text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1">
          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center border-2 border-white shadow-md"
            >
              <User className="text-white w-5 h-5" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-white border rounded-md shadow-xl z-50 overflow-hidden">
                {/* User */}
                <div className="px-3 py-2 border-b bg-gray-50">
                  <p className="text-xs text-gray-500">Logged in as</p>
                  <p className="font-semibold text-gray-800">
                    Doctor Name
                  </p>
                </div>


                {/* Menu */}

                <Link
                  to="/doctor/profile"
                  onClick={() => setProfileOpen(false)}
                  className="block px-3 py-2 hover:bg-gray-100 text-sm"
                >
                  My Profile
                </Link>

                <Link
                  to="/doctor/change-password"
                  onClick={() => setProfileOpen(false)}
                  className="block px-3 py-2 hover:bg-gray-100 text-sm"
                >
                  Change Password
                </Link>


                {/* Stats */}
                <div className="px-4 py-3 border-b  space-y-2 hover:bg-red-50 text-black text-sm">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="text-red-500 font-semibold">0</span>
                  </div>

                  <div className="flex justify-between">
                    <span>New</span>
                    <span className="text-green-600 font-semibold">
                      0/0
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Old</span>
                    <span className="text-orange-500 font-semibold">
                      0/0
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Cancel</span>
                    <span className="text-red-500 font-semibold">0</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Review</span>
                    <span className="text-cyan-600 font-semibold">0</span>
                  </div>
                </div>

                <p
                  className="px-3 py-2 text-sm hover:bg-orange-50 cursor-pointer text-red-600 font-semibold border-t border-gray-100 transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          {isPrescriptionPage && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && isPrescriptionPage && (
        <div className="lg:hidden border-t bg-white p-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${isActive
                  ? "bg-orange-100 text-orange-600"
                  : "hover:bg-gray-100 text-gray-700"
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