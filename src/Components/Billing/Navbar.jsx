import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { billingDashboardData } from "../../api/endpoints/authApi";
import {
  FaCalendarCheck,
  FaHourglassHalf,
  FaTimesCircle,
  FaCoins,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { User } from "lucide-react";
import axios from "axios";

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

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

useEffect(() => {
    const fetchDashboardData = async () => {
      try {
       
        const storedUser = localStorage.getItem("user");
        let userId = "ST0001";

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          if (parsedUser?.user_id) {
            userId = parsedUser.user_id;
          }
        }

   
        const response = await billingDashboardData({ user_id: userId });
        
        console.log("=== NAV COMPONENT API DEBUG ===");
        console.log("Full API Response:", response);

    
        let apiData = null;

        if (response?.data?.data) {
          apiData = response.data.data; 
        } else if (response?.data) {
          apiData = response.data; 
        } else if (response?.fullData?.data) {
          apiData = response.fullData.data; 
        } else {
          apiData = response; 
        }

        console.log("Extracted Target Data:", apiData);

    
        if (apiData && (apiData.total_appointments !== undefined || apiData.pending_appointments !== undefined)) {
          setCounts({
            total: Number(apiData.total_appointments) || 0,
            pending: Number(apiData.pending_appointments) || 0,
            today: Number(apiData.today_completed) || 0,
            cancel: Number(apiData.cancel_appointments) || 0,
            collections: Number(apiData.collections) || 0,
          });
        }
      } catch (error) {
        console.error("Dashboard API Error =>", error);
      }
    };

    fetchDashboardData();
  }, []); 

  const isDashboard = location.pathname === "/";

  const getPageTitle = () => {
    const currentItem = menuItems.find((item) => item.path === location.pathname);
    return currentItem ? currentItem.name : "Dashboard";
  };


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


  // OUTSIDE CLICK 
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
    <nav className={`
      w-full bg-white sticky top-0 z-50 shadow-sm    max-w-[1920px]"
      ${isDashboard ? "block" : "hidden lg:block"}
    `}>


      <div className="mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isDashboard ? (
            <NavLink to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-10" />
            </NavLink>
          ) : (
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md lg:block hidden">
                <FaBars size={18} />
              </button>
              <h1 className="text-xl font-bold text-[#1e293b]">{getPageTitle()}</h1>
            </div>
          )}

          <button
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>

        </div>




        {/* CENTER MENU */}
        {isDashboard && (
          <div className="hidden lg:flex flex-1 justify-center gap-4 xl:gap-8">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-3 py-1 rounded-md shadow-sm transition text-[13px] font-medium min-w-[110px] ${isActive
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-100"
                  }`
                }
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="whitespace-nowrap">{item.name}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500 text-white">
                  {item.count}
                </span>
              </NavLink>
            ))}
          </div>

        )}



        {/* RIGHT SIDE */}
        <div className="flex items-center ">
          {/* MOBILE MENU BUTTON */}

          {/* PROFILE */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 focus:outline-none"
            >

              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600
                text-white font-bold flex items-center justify-center shadow-md border-2 border-white">
                <User />
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-32 bg-white rounded-md shadow-xl border border-gray-100 overflow-hidden">
                <div className=" px-2 py-1">
                  <p className="text-sm font-bold text-gray-800">
                    {user?.user_name || "User"}
                  </p>
                </div>
                {/* My Profile */}
                <p
                  className="px-2 py-1 text-sm hover:bg-orange-50 cursor-pointer"
                  onClick={() => {
                    navigate("/my-profile");
                    setProfileOpen(false);
                  }}
                >
                  My Profile
                </p>


                <p
                  className="px-2 py-1 text-sm hover:bg-orange-50 cursor-pointer"
                  onClick={() => {
                    setProfileOpen(false);
                    console.log("Change Password");
                  }}
                >
                  Change Password
                </p>

                {/* Logout */}
                <p
                  className="px-2 py-1 text-sm hover:bg-orange-50 cursor-pointer"
                  onClick={() => {
                    setProfileOpen(false);
                    console.log("Logout clicked");
                  }}
                >
                  Logout
                </p>

              </div>
            )}
          </div>


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
