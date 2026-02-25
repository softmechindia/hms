import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Menu,
  X,
  Search,
  ChevronDown,

} from "lucide-react";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

const navLinks = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/doctor/dashboard" },
  { name: "Patients", icon: <Users size={20} />, path: "/doctor/patient" },
  { name: "Upcoming", icon: <Calendar size={20} />, path: "/doctor/upcoming" },
{ name: "Prescription", icon: <FileText size={20} />, path: "/doctor/add-prescription" },
];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* LEFT: Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="HMS Logo"
            className="h-9 w-auto hover:opacity-80 transition cursor-pointer"
          />
        </div>

   
{/* CENTER: Desktop Navigation */}
<div className="hidden lg:flex items-center gap-6 h-full">
{navLinks.map((link) => (
  <NavLink
    key={link.name}
    to={link.path}
    onClick={() => setIsOpen(false)}
    className={({ isActive }) =>
      `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
        isActive
          ? "bg-orange-50 text-orange-600"
          : "text-slate-600 hover:bg-slate-50"
      }`
    }
  >
    {link.icon}
    {link.name}
  </NavLink>
))}
</div>

<div className="flex items-center gap-2 sm:gap-4">
{/* Search */}
<div className="hidden xl:flex items-center bg-white border border-slate-200 rounded-md  shadow-sm px-5 py-3 transition-all duration-200 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100">



  {/* Input */}
  <div className="flex items-center">
    <Search size={18} className="text-slate-400 mr-8" />
    <input
      type="text"
      placeholder="Search Patient  ID or Mobile..."
      className="bg-transparent outline-none text-sm w-48 text-slate-700 placeholder:text-slate-400 font-medium"
    />
  </div>
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