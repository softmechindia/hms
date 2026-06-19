import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, User, X } from "lucide-react";

export default function TopHeader({ toggleSidebar, title }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPrescriptionPage = location.pathname === "/doctor/add-prescription";

  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 border-b border-gray-200 w-full h-[60px] shadow-sm">
      {/* Left Side: Hamburger & Title */}
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="text-gray-600 hover:text-black mr-4 transition-colors p-1 rounded hover:bg-gray-100"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          {title}
        </h1>
      </div>

      {/* Right Side: Profile */}
      <div className="flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center border-2 border-white shadow-md"
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
           
                           <Link
                             to="/logout"
                             onClick={() => setProfileOpen(false)}
                             className="block  px-3 py-2 hover:bg-red-50 text-red-600 text-sm"
                           >
                             Logout
                           </Link>
                         </div>
          )}
        </div>

        {/* Mobile Menu Toggle (Only for specific pages) */}
        {isPrescriptionPage && (
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>
    </div>
  );
}