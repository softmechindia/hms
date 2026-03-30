import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import logo from "../../assets/images/logo.png";
import {
  LayoutDashboard,
  Users,
  Bell,
  Package,
  Truck,
  Wallet,
  ChevronDown,
  ChevronUp,
  List,
  CreditCard,
  ClipboardList,
  Wallet2,
  Tag,
  Type,
  Dna,
  ShoppingBagIcon,
  History,
  Menu,
  X
} from 'lucide-react';
import { FaUser } from 'react-icons/fa';

const Sidebar = ({ isCollapsed }) => {
  const [openMenus, setOpenMenus] = useState(null);
  const [isMobileOpen, setMobileOpen] = useState(false);


  const location = useLocation();


  // Active route logic fix
  const isActive = (path) => {
    if (path === '/Pharmacy/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

 // 2. Logic Functions
const toggleMenu = (title) => {
    if (isCollapsed) return; // Collapsed mode mein dropdown nahi khulega
    setOpenMenus(openMenus === title ? null : title);
  }

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, type: 'link', path: '/Pharmacy/' },

    {
      title: 'Patients',
      icon: <Users size={20} />,
      type: 'dropdown',
      subItems: [
        { name: 'Patient List', path: '/Pharmacy/patient-list', icon: <Users size={20} /> },
        { name: 'Medicine Bought', path: '/Pharmacy/', icon: <ShoppingBagIcon size={20} /> }
      ]
    },

    { title: 'Notification', icon: <Bell size={20} />, type: 'link', path: '/Pharmacy/notifications' },

    {
      title: 'Manage Stock',
      icon: <Package size={20} />,
      type: 'dropdown',
      subItems: [
        { name: 'Medicine Stock', path: '/Pharmacy/medicine-stock', icon: <Package size={20} /> },
        { name: 'Medicine History', path: '/Pharmacy/stock-history', icon: <History size={20} /> },
        { name: 'Medicine Category', path: '/Pharmacy/medicine-category', icon: <Tag size={20} /> },
        { name: 'Medicine Type', path: '/Pharmacy/medicine-type', icon: <Type size={20} /> },
        { name: 'Generic Name', path: '/Pharmacy/generic-name', icon: <Dna size={20} /> }
      ]
    },

    {
      title: 'Manage Supplier',
      icon: <Truck size={20} />,
      type: 'dropdown',
      subItems: [
        { name: 'Supplier List', path: '/Pharmacy/supplier-list', icon: <List size={20} /> },
        { name: 'Payment', path: '/Pharmacy/payments', icon: <CreditCard size={20} /> },
        { name: 'Supplier Ledger', path: '/Pharmacy/supplier-ledger', icon: <ClipboardList size={20} /> }
      ]
    },

    {
      title: 'Collections',
      icon: <Wallet size={20} />,
      type: 'dropdown',
      subItems: [
        { name: 'Total Collections', path: '/Pharmacy/totalCollections', icon: <Wallet2 size={20} /> }
      ]
    }
  ];

  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.type === 'dropdown') {
        const isSubActive = item.subItems.some((sub) =>
          location.pathname.startsWith(sub.path)
        );
        if (isSubActive) {
          setOpenMenus(item.title);
        }
      }
    });
  }, [location.pathname]);

  const currentLabel =
    menuItems.find((m) => isActive(m.path))?.title || "Pharmacy";
    const getHighlightClass = (isActive, itemTitle) => {
    const baseClass = "flex items-center gap-3 p-3 rounded-md transition-all duration-200 w-full ";
    return isActive 
      ? baseClass + "bg-white/20 text-white shadow-md font-bold  hover:bg-gradient-to-b from-[#4F6EEA] to-[#6FA8FF] text-white" 
      : baseClass + "text-white/80 hover:bg-white/10";
  };

  return (
    <>
      {/* MOBILE TOP BAR */}
<div className={`fixed lg:sticky top-0 left-0 z-[60] h-screen bg-[#5B82F7] text-white flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? "w-20" : "w-64"}`}>        <div className="flex items-center gap-3">
   </div>
    
     {/* LOGO */}
      <div className="p-3 flex justify-center items-center overflow-hidden h-20">
          <img
            src={logo}
            alt="Logo"
            className={`transition-all duration-300 ${isCollapsed ? "h-8 w-8 object-contain" : "h-12 w-auto"}`}
          />
        </div>

        {/* Profile Section */}
            {!isCollapsed && (
          <div className="flex flex-col items-center mb-6 animate-in fade-in duration-500">
            <div className="w-16 h-16 rounded-full border-2 border-orange-500 flex items-center justify-center bg-[#111827] mb-3">
              <FaUser size={20} className="text-orange-500" />
            </div>
            <h3 className="font-bold text-md whitespace-nowrap">Dr. John Doe</h3>
            <p className="text-white/70 text-[9px] uppercase tracking-widest">Pharmacist</p>
          </div>
        )}

        {/* NAVIGATION */}

        <nav className="flex-1 px-3 space-y-2 overflow-y-auto overflow-x-hidden">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.type === 'link' ? (
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => getHighlightClass(isActive, item.title)}
                >
                  <div className="flex items-center gap-4">
                    <div className="min-w-[24px] flex justify-center">{item.icon}</div>
                    {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">{item.title}</span>}
                  </div>
                </NavLink>
              ) : (
                <div className="flex flex-col">
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={getHighlightClass(location.pathname.startsWith(item.path) || openMenus === item.title, item.title)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4">
                        <div className="min-w-[24px] flex justify-center">{item.icon}</div>
                        {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">{item.title}</span>}
                      </div>
                      {!isCollapsed && (openMenus === item.title ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                    </div>
                  </button>

                  {/* Dropdown Content */}
                  {!isCollapsed && openMenus === item.title && (
                    <div className="mt-1 ml-6 space-y-1 border-l border-white/20 pl-4 animate-in slide-in-from-top-1">
                      {item.subItems.map((sub) => (
                        <NavLink
                          key={sub.name}
                          to={sub.path}
                          className={({ isActive }) =>
                            `flex items-center gap-3 p-2 rounded-md text-xs transition-all ${isActive ? " text-white font-bold" : "text-white/70 hover:text-white"}`
                          }
                        >
                          <span className="whitespace-nowrap">{sub.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>


        
      </div>

      {/* OVERLAY */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      
    </>
  );
};

export default Sidebar;