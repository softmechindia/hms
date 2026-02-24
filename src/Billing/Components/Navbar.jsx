import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {
  FaCalendarCheck,
  FaHourglassHalf,
  FaTimesCircle,
  FaCoins,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    cancel: 0,
    today: 0,
    collections: 0,
  });

  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Total Appointments",
      icon: <FaCalendarCheck />,
      path: "/total-app",
      count: counts.total,
    },
    {
      name: "Pending Appointments",
      icon: <FaHourglassHalf />,
      path: "/pending",
      count: counts.pending,
    },
    {
      name: "Today’s Confirmed",
      icon: <FaHourglassHalf />,
      path: "/today-conf",
      count: counts.today,
    },
    {
      name: "Cancel Appointments",
      icon: <FaTimesCircle />,
      path: "/cancel",
      count: counts.cancel,
    },
    {
      name: "Collections",
      icon: <FaCoins />,
      path: "/collections",
      count: counts.collections,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white  sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO — ONLY DASHBOARD */}
        {location.pathname === "/" && (
          <NavLink to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10" />
          </NavLink>
        )}

        {/* CENTER MENU */}
        <div className="hidden lg:flex flex-1 justify-center gap-4 xl:gap-8">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-1 rounded-md shadow-sm transition text-[13px] font-medium min-w-[110px] ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-100"
                }`
              }
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="whitespace-nowrap">{item.name}</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-white">
                {item.count}
              </span>
            </NavLink>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4"> 
          {/* PROFILE */}
          <div className="hidden md:block relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 focus:outline-none"
            >
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">Dr. Admin</p>
             
              </div>
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600
                text-white font-bold flex items-center justify-center shadow-md border-2 border-white">
                DR
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                <p
                  className="px-4 py-3 text-sm hover:bg-orange-50 cursor-pointer"
                  onClick={() => navigate("/my-profile")}
                >
                  My Profile
                </p>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 hover:bg-orange-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-orange-500">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </div>
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-full">
                {item.count}
              </span>
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Nav;
