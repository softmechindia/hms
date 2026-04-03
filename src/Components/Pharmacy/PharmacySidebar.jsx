import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import {
  LayoutDashboard, Users, Bell, Package, Truck, Wallet,
  ChevronDown, ChevronUp,  X
} from 'lucide-react';
import { FaUser } from 'react-icons/fa';

const Sidebar = ({ isCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const [openMenus, setOpenMenus] = useState(null);
  const location = useLocation();

  // 1. Dropdown toggle logic
  const toggleMenu = (title) => {
    if (isCollapsed && window.innerWidth >= 1024) return; 
    setOpenMenus(openMenus === title ? null : title);
  };

  // 2. Menu Items Definition
  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, type: 'link', path: '/Pharmacy/' },
    {
      title: 'Patients',
      icon: <Users size={20} />,
      type: 'dropdown',
      path: '/Pharmacy/patients', // Base path for active state
      subItems: [
        { name: 'Patient List', path: '/Pharmacy/patient-list' },
        { name: 'Medicine Bought', path: '/Pharmacy/medicine-bought' }
      ]
    },
    { title: 'Notification', icon: <Bell size={20} />, type: 'link', path: '/Pharmacy/notifications' },
    {
      title: 'Manage Stock',
      icon: <Package size={20} />,
      type: 'dropdown',
      path: '/Pharmacy/stock',
      subItems: [
        { name: 'Medicine Stock', path: '/Pharmacy/medicine-stock' },
        { name: 'Medicine History', path: '/Pharmacy/stock-history' },
        { name: 'Medicine Category', path: '/Pharmacy/medicine-category' },
        { name: 'Medicine Type', path: '/Pharmacy/medicine-type' },
        { name: 'Generic Name', path: '/Pharmacy/generic-name' }
      ]
    },
    {
      title: 'Manage Supplier',
      icon: <Truck size={20} />,
      type: 'dropdown',
      path: '/Pharmacy/supplier',
      subItems: [
        { name: 'Supplier List', path: '/Pharmacy/supplier-list' },
        { name: 'Payment', path: '/Pharmacy/payments' },
        { name: 'Supplier Ledger', path: '/Pharmacy/supplier-ledger' }
      ]
    },
    {
      title: 'Collections',
      icon: <Wallet size={20} />,
      type: 'dropdown',
      path: '/Pharmacy/collections',
      subItems: [
        { name: 'Total Collections', path: '/Pharmacy/totalCollections' }
      ]
    }
  ];

  // 3. Auto-open dropdown if sub-item is active
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.type === 'dropdown') {
        const isSubActive = item.subItems.some((sub) => location.pathname === sub.path);
        if (isSubActive) setOpenMenus(item.title);
      }
    });
  }, [location.pathname]);

  // 4. Styling Helper
  const getHighlightClass = (isActive) => {
    const baseClass = "flex items-center gap-3 p-3 rounded-md transition-all duration-300 w-full mb-1 ";
    return isActive 
      ? baseClass + "bg-white text-[#4F6EEA] shadow-md border-l-4 border-white" 
      : baseClass + "text-white hover:bg-white/10";
  };

  return (
    <>
    
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[65] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 2. SIDEBAR MAIN CONTAINER */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen bg-[#5B82F7] text-white z-[70] transition-all duration-300 ease-in-out flex flex-col
        ${isMobileOpen ? "translate-x-0 w-[280px]" : "-translate-x-full lg:translate-x-0"}
        ${isCollapsed ? "lg:w-20" : "lg:w-64"}
      `}>
        
        {/* Mobile Close Button */}
        <button 
          className="lg:hidden absolute right-4 top-6 text-white hover:rotate-90 transition-transform"
          onClick={() => setIsMobileOpen(false)}
        >
          <X size={24} />
        </button>

        {/* LOGO SECTION */}
        <div className="h-24 flex items-center justify-center p-4 border-b border-white/10">
          <img
            src={logo}
            alt="Logo"
            className={`transition-all duration-300 ${isCollapsed ? "w-10 h-10 object-contain" : "w-40"}`}
          />
        </div>

  
        <div className={`transition-all duration-500 overflow-hidden ${isCollapsed ? "h-0 opacity-0 mb-0" : "h-auto opacity-100 my-6 px-4"}`}>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-2 border-orange-500 flex items-center justify-center bg-[#111827] mb-2 shadow-xl">
              <FaUser size={24} className="text-orange-500" />
            </div>
            <h3 className="font-bold text-sm whitespace-nowrap">Dr. John Doe</h3>
            <p className="text-white/70 text-[10px] uppercase tracking-tighter">Pharmacist</p>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 px-3 mt-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.type === 'link' ? (
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => getHighlightClass(isActive)}
                  onClick={() => window.innerWidth < 1024 && setIsMobileOpen(false)}
                >
                  <div className="min-w-[24px] flex justify-center">{item.icon}</div>
                  {!isCollapsed && <span className="text-sm whitespace-nowrap">{item.title}</span>}
                </NavLink>
              ) : (
                <div className="flex flex-col">
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={getHighlightClass(location.pathname.startsWith(item.path) || openMenus === item.title)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className="min-w-[24px] flex justify-center">{item.icon}</div>
                        {!isCollapsed && <span className="text-sm whitespace-nowrap">{item.title}</span>}
                      </div>
                      {!isCollapsed && (openMenus === item.title ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                    </div>
                  </button>

                  {/* Dropdown Items */}
                  {!isCollapsed && openMenus === item.title && (
                    <div className="mt-1 ml-9 space-y-1 border-l border-white/20 pl-4 animate-in slide-in-from-top-2">
                      {item.subItems.map((sub) => (
                        <NavLink
                          key={sub.name}
                          to={sub.path}
                          className={({ isActive }) =>
                            `block py-2 text-xs transition-all ${isActive ? "text-white font-bold" : "text-white/60 hover:text-white"}`
                          }
                          onClick={() => window.innerWidth < 1024 && setIsMobileOpen(false)}
                        >
                          {sub.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;