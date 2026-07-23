import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, User, X } from "lucide-react";

export default function TopHeader({ toggleSidebar, title }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  // Helper function to read profile data from LocalStorage
  const getUserFromStorage = () => {
    const savedProfile = localStorage.getItem("user_profile");
    if (savedProfile) return JSON.parse(savedProfile);

    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : { user_name: "Doctor" };

  };

  const [user, setUser] = useState(getUserFromStorage);

  // Helper for Initial
  const getInitial = (name) => {
    if(!name) return "";
    return name.trim().charAt(0).toUpperCase();
  };


  // Listen for profile changes
  useEffect(() => {
    const handleProfileUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      if (updatedUser) setUser(updatedUser);
    };

    window.addEventListener("profileUpdate", handleProfileUpdate);
    window.addEventListener("storage", handleProfileUpdate);

    return () => {
      window.removeEventListener("profileUpdate", handleProfileUpdate);
      window.removeEventListener("storage", handleProfileUpdate);
    };
  }, []);

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
      <div className="flex items-center gap-4 ">
        <div className="relative mr-1" ref={dropdownRef}>
    <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center border-2 border-white shadow-md overflow-hidden"
          >
            {(user.picture_url || user.user_pic) ? (
              <img 
                src={user.picture_url || user.user_pic} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <span className="text-white font-bold text-lg">
                {user.user_name ? getInitial(user.user_name) : <User className="w-5 h-5" />}
              </span>
            )}
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white border rounded-md shadow-xl z-50 overflow-hidden">
              {/* User */}
               <div className="px-4 py-2.5 border-b bg-gray-50/70">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Logged in as</p>
                  <p className="font-semibold text-gray-800 text-sm truncate">{user.user_name || "Doctor"}</p>
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
             <div className="px-4 py-3 border-t border-b border-gray-400 bg-gray-50/30 space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between items-center">
                    <span className=" text-[15px] font-bold">Total</span>
                    <span className="text-red-500 font-bold text-[15px]  bg-red-50 px-1.5 py-0.5 rounded">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[15px] font-bold">New</span>
                    <span className="text-green-600 text-[15px] font-bold  bg-green-50 px-1.5 py-0.5 rounded">0/0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[15px] font-bold">Old</span>
                    <span className="text-orange-500 text-[15px] font-bold bg-orange-50 px-1.5 py-0.5 rounded">0/0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[15px] font-bold">Cancel</span>
                    <span className="text-red-500 text-[15px] font-bold bg-red-50 px-1.5 py-0.5 rounded">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[15px] font-bold">Review</span>
                    <span className="text-cyan-600 text-[15px] font-bold bg-cyan-50 px-1.5 py-0.5 rounded">0</span>
                  </div>
                </div>  
                    <button
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-red-50 cursor-pointer text-red-600 font-semibold transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
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