import React, { useState, useEffect } from "react";
import logo from "../../../assets/images/logo.png";
import {
  LayoutGrid, CalendarDays, Hourglass, CheckCircle,
  XCircle, Wallet, Menu
} from "lucide-react";
import { useLocation, NavLink } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // State to handle live profile sync (Image, Name, and Designation)
  const [profile, setProfile] = useState({
    user_name: "User",
    picture_url: "",
    designation: "Billing Executive"
  });

  // Sync profile data dynamically from storage
  const syncProfile = () => {
    const storedProfile = localStorage.getItem("user_profile");
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      setProfile({
        user_name: parsed.user_name || parsed.name || "User",
        picture_url: parsed.picture_url || parsed.user_pic || "",
        designation: parsed.designation || parsed.department || "Billing Executive"
      });
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setProfile({
          user_name: parsedUser.user_name || parsedUser.name || "User",
          picture_url: parsedUser.picture_url || parsedUser.user_pic || "",
          designation: parsedUser.designation || parsedUser.department || "Billing Executive"
        });
      }
    }
  };

  useEffect(() => {
    syncProfile();

    // Catch real-time update triggers from MyProfile without reloading the screen
    window.addEventListener("storage", syncProfile);
    window.addEventListener("profileUpdate", syncProfile);
    
    return () => {
      window.removeEventListener("storage", syncProfile);
      window.removeEventListener("profileUpdate", syncProfile);
    };
  }, []);

  const menu = [
    { label: "Dashboard", icon: LayoutGrid, path: "/billing" },
    { label: "Total Appointments", icon: CalendarDays, path: "/billing/total-app" },
    { label: "Pending Appointments", icon: Hourglass, path: "/billing/pending" },
    { label: "Today's Confirmed", icon: CheckCircle, path: "/billing/today-conf" },
    { label: "Cancelled Appointments", icon: XCircle, path: "/billing/cancel" },
    { label: "Collections", icon: Wallet, path: "/billing/collections" },
  ];

  const currentPage = menu.find(item => item.path === location.pathname)?.label || "HMS";

  // Helper logic to get first capital letter safely
  const getInitial = (name) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <>
      {/* Mobile Top Bar Navigation */}
      <div className="lg:hidden fixed top-0 right-0 left-0 h-16 bg-[#4F6EEA] flex items-center justify-between px-4 z-[50] shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(true)} className="text-white bg-white/10 p-2 rounded-md">
            <Menu size={24} />
          </button>
          <span className="text-white font-bold">{currentPage}</span>
        </div>
        
        {/* Dynamic Mobile Profile Circle */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 p-0.5 flex items-center justify-center border border-white/30 overflow-hidden">
          <div className="w-full h-full rounded-full bg-[#111827] flex items-center justify-center overflow-hidden">
            {profile.picture_url ? (
              <img 
                src={profile.picture_url} 
                alt="Profile" 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              style={{ display: profile.picture_url ? 'none' : 'flex' }}
              className="w-full h-full items-center justify-center text-orange-500 font-bold text-sm select-none"
            >
              {getInitial(profile.user_name)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Responsive Sidebar Drawer */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 min-h-screen bg-[#082cbb] text-white p-4 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>

        <div className="flex justify-center items-center w-full">
          <img
            src={logo}
            alt="HMS Logo"
            className="h-auto w-[80%]"
          />
        </div>

        {/* Dynamic Profile Section */}
        <div className="flex flex-col items-center py-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 p-0.5 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full rounded-full bg-[#111827] flex items-center justify-center overflow-hidden">
              {profile.picture_url ? (
                <img 
                  src={profile.picture_url} 
                  alt="Dynamic User Avatar" 
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    // Photo corrupt or down break safety hook
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}

              {/* CENTER CAPITAL INITIAL FALLBACK: Jab photo nahi hai to naam ka pehla akshar dikhega */}
              <div 
                style={{ display: profile.picture_url ? 'none' : 'flex' }}
                className="w-full h-full items-center justify-center text-orange-500 font-bold text-2xl select-none"
              >
                {getInitial(profile.user_name)}
              </div>
            </div>
          </div>
          
          <h3 className="mt-4 font-bold text-lg text-center truncate w-full px-2">
            {profile.user_name}
          </h3>
          <p className="text-white/60 text-xs tracking-widest uppercase mt-0.5">
            {profile.designation}
          </p>
        </div>

        {/* Navigation Menus */}
        <nav className="px-1 space-y-2 flex-1">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/billing"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-md transition-all ${isActive
                    ? "bg-white text-[#4F6EEA] shadow-md"
                    : "text-white hover:bg-white/10"
                  }`
                }
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Backdrop overlay for active Mobile Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}