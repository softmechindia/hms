import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import {
  LayoutDashboard, Users, Bell, Package, Truck, Wallet,
  ChevronDown, ChevronUp, X
} from 'lucide-react';
import { FaUser } from 'react-icons/fa';

const PharmacySidebar = ({ isCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const [openMenus, setOpenMenus] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  // Track strictly clicked/selected item
  const [activeTab, setActiveTab] = useState('Dashboard');
  const location = useLocation();

  const toggleMenu = (title) => {
    if (isCollapsed && window.innerWidth >= 1024) return;
    setOpenMenus(openMenus === title ? null : title);
  };

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, type: 'link', path: '/pharmacy' },
    {
      title: 'Patients',
      icon: <Users size={20} />,
      type: 'dropdown',
      subItems: [
        { name: 'Patient List', path: '/pharmacy/patient-list' },
        { name: 'Medicine Bought', path: '/pharmacy/medicine-bought' }
      ]
    },
    { title: 'Notification', icon: <Bell size={20} />, type: 'link', path: '/pharmacy/notifications' },
    {
      title: 'Manage Stock',
      icon: <Package size={20} />,
      type: 'dropdown',
      subItems: [
        { name: 'Medicine Stock', path: '/pharmacy/medicine-stock' },
        { name: 'Medicine History', path: '/pharmacy/stock-history' },
        { name: 'Medicine Category', path: '/pharmacy/medicine-category' },
        { name: 'Medicine Type', path: '/pharmacy/medicine-type' },
        { name: 'Generic Name', path: '/pharmacy/generic-name' }
      ]
    },
    {
      title: 'Manage Supplier',
      icon: <Truck size={20} />,
      type: 'dropdown',
      subItems: [
        { name: 'Supplier List', path: '/pharmacy/supplier-list' },
        { name: 'Payment', path: '/pharmacy/payments' },
        { name: 'Supplier Ledger', path: '/pharmacy/supplier-ledger' }
      ]
    },
    {
      title: 'Collections',
      icon: <Wallet size={20} />,
      type: 'dropdown',
      subItems: [
        { name: 'Total Collections', path: '/pharmacy/totalCollections' }
      ]
    }
  ];

  // Keep activeTab in sync when navigating sub-routes
  useEffect(() => {
    const currentPath = location.pathname.toLowerCase().replace(/\/$/, '');
    
    menuItems.forEach((item) => {
      if (item.type === 'link') {
        const itemPath = item.path.toLowerCase().replace(/\/$/, '');
        if ((itemPath === '/pharmacy' && (currentPath === '/pharmacy' || currentPath === '')) || currentPath === itemPath) {
          setActiveTab(item.title);
        }
      } else if (item.type === 'dropdown') {
        const isSubActive = item.subItems.some((sub) => sub.path.toLowerCase() === currentPath);
        if (isSubActive) {
          setActiveTab(item.title);
          setOpenMenus(item.title);
        }
      }
    });
  }, [location.pathname]);

  // CSS Logic: Exactly 1 card is active
  const getItemClass = (title) => {
    // If mouse is hovering something, show white on hovered item; else show white on last selected/activeTab item
    const isWhite = hoveredItem ? hoveredItem === title : activeTab === title;

    const baseClass = "flex items-center gap-3 p-3 rounded-md transition-all duration-200 w-full mb-1 cursor-pointer outline-none ";

    if (isWhite) {
      return baseClass + "bg-white text-[#4F6EEA] shadow-md border-l-4 border-white font-semibold";
    }
    return baseClass + "text-white bg-transparent hover:bg-white/10";
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[65] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen bg-sidebar-gradient text-white z-[70] transition-all duration-300 ease-in-out flex flex-col
        ${isMobileOpen ? "translate-x-0 w-[280px]" : "-translate-x-full lg:translate-x-0"}
        ${isCollapsed ? "lg:w-20" : "lg:w-64"}
      `}>
        
        <button 
          className="lg:hidden absolute right-4 top-6 text-white transition-transform"
          onClick={() => setIsMobileOpen(false)}
        >
          <X size={24} />
        </button>

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

        <nav 
          className="flex-1 px-3 mt-4 space-y-1 overflow-y-auto custom-scrollbar"
          onMouseLeave={() => setHoveredItem(null)}
        >
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.type === 'link' ? (
                <NavLink 
                  to={item.path} 
                  onMouseEnter={() => setHoveredItem(item.title)}
                  className={getItemClass(item.title)}
                  onClick={() => {
                    setActiveTab(item.title);
                    setOpenMenus(null);
                    if (window.innerWidth < 1024) setIsMobileOpen(false);
                  }}
                >
                  <div className="min-w-[24px] flex justify-center">{item.icon}</div>
                  {!isCollapsed && <span className="text-sm whitespace-nowrap">{item.title}</span>}
                </NavLink>
              ) : (
                <div className="flex flex-col">
                  <button
                    onMouseEnter={() => setHoveredItem(item.title)}
                    onClick={() => {
                      setActiveTab(item.title); // Clicked dropdown becomes active tab
                      toggleMenu(item.title);
                    }}
                    className={getItemClass(item.title)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className="min-w-[24px] flex justify-center">{item.icon}</div>
                        {!isCollapsed && <span className="text-sm whitespace-nowrap">{item.title}</span>}
                      </div>
                      {!isCollapsed && (openMenus === item.title ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                    </div>
                  </button>

                  {!isCollapsed && openMenus === item.title && (
                    <div className="mt-1 ml-9 space-y-1 border-l border-white/20 pl-4 animate-in slide-in-from-top-2">
                      {item.subItems.map((sub) => (
                        <NavLink
                          key={sub.name}
                          to={sub.path}
                          className={({ isActive: isSubActive }) =>
                            `block py-2 text-xs transition-all ${
                              isSubActive ? "text-white font-bold underline" : "text-white/70 hover:text-white"
                            }`
                          }
                          onClick={() => {
                            setActiveTab(item.title);
                            if (window.innerWidth < 1024) setIsMobileOpen(false);
                          }}
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

export default PharmacySidebar;