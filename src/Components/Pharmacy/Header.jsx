import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Bell, Menu } from "lucide-react"; // Added Bell for the notification

// Mock Notification component
const Notification = () => (
  <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
    <Bell size={20} />
    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
  </button>
);

function Header({ onToggleSidebar }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();


  //Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white h-16 border-b border-gray-100 shadow-sm px-6 w-full flex-shrink-0">
      <div className="flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex-1 flex items-center">
          <button
            onClick={onToggleSidebar}
            className=" rounded-lg text-gray-600 hover:bg-gray-100 hover:text-orange-600 transition-colors focus:outline-none"
            aria-label="Open Sidebar"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <Notification />

          {/* PROFILE DROPDOWN */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 focus:outline-none group p-1 rounded-lg hover:bg-gray-50 transition-colors"
            >

              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 
                text-white text-xs font-bold flex items-center justify-center shadow-md border-2 border-white 
                transition-transform group-hover:scale-105">
                User
              </div>
            </button>

            {/* DROPDOWN MENU */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-36 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in duration-150">
                {/* My Profile */}
                <div
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 cursor-pointer transition-colors"
                  onClick={() => {
                    navigate("/my-profile");
                    setProfileOpen(false);
                  }}
                >
                  <User size={18} className="text-gray-400" />
                  <span className="font-medium">My Profile</span>
                </div>

                {/* Logout */}
                <div
                  className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors border-t border-gray-50"
                  onClick={() => {
                    setProfileOpen(false);
                    console.log("Logout clicked");

                  }}
                >
                  <LogOut size={18} className="text-red-500" />
                  <span className="font-medium">Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;