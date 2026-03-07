import React, { useState } from "react";
import { NavLink, useLocation,Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Menu,
  X,
ChevronDown,
  

} from "lucide-react";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");
  
  const location = useLocation();

const showLogo = location.pathname.includes("prescription");

const navLinks = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/doctor/dashboard" },
  { name: "Patients", icon: <Users size={20} />, path: "/doctor/patient" },
  { name: "Upcoming", icon: <Calendar size={20} />, path: "/doctor/upcoming" },
{ name: "Prescription", icon: <FileText size={20} />, path: "/doctor/add-prescription" },
];

  return (
<nav className="sticky top-0  max-w-[1920px] w-full bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">    
  <div className="mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
 
      <div className="w-48">
       
          {showLogo && (
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="HMS Logo"
                className="h-9 w-auto hover:opacity-80 transition cursor-pointer"
              />
            </div>
          )}
        </div>

   
{/* CENTER: Desktop Navigation */}
<div className="hidden lg:flex items-center gap-4 justify-center">
{navLinks.map((link) => (
  <NavLink
    key={link.name}
    to={link.path}
    onClick={() => setIsOpen(false)}
    className={({ isActive }) =>
      `w-full flex items-center gap-3 mx-2 px-4 py-3 rounded-md text-sm font-semibold transition ${
        isActive
          ? "bg-orange-500 text-white"
          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-100"
      }`
    }
  >
    {link.icon}
    {link.name}
  </NavLink>
))}
</div>
  {/* Profile */}
          <div className="flex items-center gap-2 bg-slate-50 px-2 py-1.5 rounded-full border border-slate-100 hover:border-orange-200 cursor-pointer transition group">
            <img
              src="https://ui-avatars.com/api/?name=Doc+User&background=334155&color=fff"
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover shadow-sm group-hover:ring-2 group-hover:ring-orange-300"
            />
            <div className="hidden sm:block leading-tight">
              <p className="text-xs font-bold text-slate-800">
                Dr. Watson
              </p>
              <p className="text-[10px] text-slate-400 font-semibold">
                Surgeon
              </p>
            </div>
            <ChevronDown
              size={14}
              className="text-slate-400 group-hover:text-orange-500"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
  

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                setActive(link.name);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                active === link.name
                  ? "bg-orange-50 text-orange-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {link.icon}
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;