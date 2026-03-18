import React, { useState } from 'react';
import logo from "../../assets/images/logo.png"
import { 
  LayoutDashboard, 
  Users, 
  Bell, 
  Package, 
  Truck, 
  Wallet, 
  ChevronDown, 
 
  ChevronUp
} from 'lucide-react';

const Sidebar = () => {
    
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, type: 'link' },
    { 
      title: 'Patients', 
      icon: <Users size={20} />, 
      type: 'dropdown',
      subItems: ['Medicine Bought','Patient List']
    },
    { title: 'Notification', icon: <Bell size={20} />, type: 'link' },
    { 
      title: 'Manage Stock', 
      icon: <Package size={20} />, 
      type: 'dropdown',
      subItems: ['Medicine History', 'Medicine Category', 'Medicine Type', 'Generic Name']
    },
    { 
      title: 'Manage Supplier', 
      icon: <Truck size={20} />, 
      type: 'dropdown',
      subItems: ['Supplier List', 'Payment', 'Supplier Ledger']
    },
    { 
      title: 'Collections', 
      icon: <Wallet size={20} />, 
      type: 'dropdown',
      subItems: ['Total Collections']
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#4F6EEA]  text-white flex flex-col shadow-xl">

          <div className="flex mx justify-center items-center gap-3 mt-8  ">
                  <img
                    src={logo}
                    alt="HMS Logo"
                    className="h-12 w-auto hover:opacity-80  transition cursor-pointer"
                  />
                </div>
      {/* Header */}
      <div className="p-5 text-center text-2xl font-bold tracking-widest border-b border-white">
        PHARMACY
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto mt-2">
        {menuItems.map((item, index) => (
          <div key={index}>
            {/* Main Item */}
            <button
              onClick={() => item.type === 'dropdown' && toggleMenu(item.title)}
              className={`w-full flex items-center justify-between px-4 py-4 transition-colors duration-200  border-b
                ${openMenus[item.title] ? 'bg-[#f39c12] text-white' : 'hover:bg-[#f39c12] hover:text-white'}`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-medium">{item.title}</span>
              </div>
              {item.type === 'dropdown' && (
                openMenus[item.title] ? <ChevronUp size={16} /> : <ChevronDown size={16} />
              )}
            </button>

            {/* Dropdown Sub-Items */}
            {item.type === 'dropdown' && openMenus[item.title] && (
              <div className="bg-[#4F6EEA] animate-fadeIn">
                {item.subItems.map((sub, subIndex) => (
                  <a
                    key={subIndex}
                    href={`#${sub.replace(/\s+/g, '-').toLowerCase()}`}
                    className="block pl-12 py-2 text-sm text-white hover:text-white hover:bg-[#f39c12] border-l-4 border-transparent hover:border-[#f39c12]"
                  >
                    {sub}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;