import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

export default function TopHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const [profile, setProfile] = useState({
    user_name: "User",
    picture_url: ""
  });

  // Helper function to get first letter
  const getInitial = (name) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  };

  const syncProfileData = () => {
    const storedProfile = localStorage.getItem("user_profile");
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      setProfile({
        user_name: parsed.user_name || parsed.name || "User",
        picture_url: parsed.picture_url || parsed.user_pic || ""
      });
    }
  };

  useEffect(() => {
    syncProfileData();
    window.addEventListener("storage", syncProfileData);
    window.addEventListener("profileUpdate", syncProfileData);
    return () => {
      window.removeEventListener("storage", syncProfileData);
      window.removeEventListener("profileUpdate", syncProfileData);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  const getHeading = () => {
    const path = location.pathname;
    if (path.endsWith("/total-app")) return "Total Appointments";
    if (path.endsWith("/pending")) return "Pending Appointments";
    if (path.endsWith("/today-conf")) return "Today's Confirmed";
    if (path.endsWith("/cancel")) return "Cancelled Appointments";
    if (path.endsWith("/collections")) return "Collections";
    if (path.endsWith("/my-profile")) return "My Profile";
    if (path.endsWith("/change-password")) return "Change Password";
    return "Appointments";
  };

  return (
    <div className="flex items-center justify-between bg-white px-6 py-3 border-b border-gray-200 w-full h-[60px]">
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-800 transition-colors focus:outline-none">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-[19px] font-semibold text-gray-800">{getHeading()}</h1>
      </div>

      {/* Right Side - Header Avatar Only */}
      <div className="flex items-center">
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center overflow-hidden border-2 border-white shadow-md focus:outline-none"
          >
            {profile.picture_url ? (
              <img 
                src={profile.picture_url} 
                alt="Avatar" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
            ) : null}
            
            <div 
              style={{ display: profile.picture_url ? 'none' : 'flex' }}
              className="w-full h-full items-center justify-center text-white font-bold text-sm"
            >
              {getInitial(profile.user_name)}
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-44 bg-white rounded-md shadow-xl border border-gray-100 overflow-hidden z-50">
              <div className="px-3 py-2 border-b border-gray-100 bg-gray-50/50">
                <p className="text-sm font-bold text-gray-800 truncate">{profile.user_name}</p>
              </div>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50 text-gray-700" onClick={() => { navigate("/billing/my-profile"); setProfileOpen(false); }}>My Profile</button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50 text-gray-700" onClick={() => { navigate("/billing/change-password"); setProfileOpen(false); }}>Change Password</button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50 text-red-600 font-semibold border-t" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}