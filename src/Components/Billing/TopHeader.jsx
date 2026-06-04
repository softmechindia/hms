import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, User } from "lucide-react";

export default function TopHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // User data from localStorage
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Dynamic Heading Logic
  const getHeading = () => {
    const path = location.pathname;

    if (path.endsWith("/total-app")) return "Total Appointments";
    if (path.endsWith("/pending")) return "Pending Appointments";
    if (path.endsWith("/today-conf")) return "Today's Confirmed";
    if (path.endsWith("/cancel")) return "Cancelled Appointments";
    if (path.endsWith("/collections")) return "Collections";
    if (path.endsWith("/my-profile")) return "My Profile";

    return "Appointments";
  };

  return (
    <div className="flex items-center justify-between bg-white px-6 py-3 border-b border-gray-200 w-full h-[60px]">
      
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-800 transition-colors focus:outline-none">
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-[19px] font-semibold text-gray-800">
          {getHeading()}
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center">
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-white font-bold flex items-center justify-center shadow-md border-2 border-white">
              <User />
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-44 bg-white rounded-md shadow-xl border border-gray-100 overflow-hidden z-50">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-sm font-bold text-gray-800">
                  {user?.user_name || "User"}
                </p>
              </div>

              <button
                className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50"
                onClick={() => {
                  navigate("/billing/my-profile");
                  setProfileOpen(false);
                }}
              >
                My Profile
              </button>

              <button
                className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50"
                onClick={() => {
                  setProfileOpen(false);
                  // Change Password route here
                  // navigate("/billing/change-password");
                }}
              >
                Change Password
              </button>

              <button
                className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50 text-red-600 font-semibold border-t border-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}