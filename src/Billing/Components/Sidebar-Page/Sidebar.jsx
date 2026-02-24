import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import { 
  LayoutGrid, CalendarDays, Hourglass, CheckCircle, 
  XCircle, Wallet, User, LogOut, Menu, X 
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Dashboard", icon: LayoutGrid, path: "/" },
    { label: "Total Appointments", icon: CalendarDays, path: "/total-app" },
    { label: "Pending Appointments", icon: Hourglass, path: "/pending" },
    { label: "Today's Confirmed", icon: CheckCircle, path: "/today-conf" },
    { label: "Cancelled Appointments", icon: XCircle, path: "/cancel" },
    { label: "Collections", icon: Wallet, path: "/collections" },
    { label: "My Profile", icon: User, path: "/my-profile" },
    { label: "Logout", icon: LogOut, path: "/Logout" },
  ];

  const NavItem = ({ item, mobile = false }) => {
    const isActive = location.pathname === item.path;
    return (
      <button
        onClick={() => {
          navigate(item.path);
          if (mobile) setIsMobileOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-sm transition-all duration-200
        ${
          isActive
            ? "bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF] text-white shadow-md"
            : "text-gray-700"
        }`}
      >
        <item.icon
          size={18}
          className={isActive ? "text-white" : "text-gray-500"}
        />
        <span className="text-sm font-medium">{item.label}</span>
      </button>
    );
  };

  return (
    <>
     
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <nav className="lg:hidden fixed top-0 w-full h-16 bg-[#0B0F1A] border-b border-white/[0.08] flex items-center justify-between px-6 z-[100]">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 object-contain" />
        </div>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-gray-400 p-1.5 border border-white/20 rounded-md hover:text-white transition-colors"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div className={`lg:hidden fixed inset-0 z-[90] transition-all duration-300 ${isMobileOpen ? "visible" : "invisible"}`}>
   
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileOpen ? "opacity-100" : "opacity-0"}`} 
          onClick={() => setIsMobileOpen(false)} 
        />
      
        <aside className={`relative w-72 h-full bg-[#0F172A] border-r border-white/[0.08] flex flex-col transform transition-transform duration-300 ease-in-out ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
          <div className="p-6 border-b border-white/[0.05] flex justify-between items-center">
            <img src={logo} alt="Logo" className="h-7 object-contain" />
            <button onClick={() => setIsMobileOpen(false)} className="text-gray-400 border border-white/10 rounded p-1">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto no-scrollbar">
            {menu.map(item => <NavItem key={item.label} item={item} mobile />)}
          </div>
        </aside>
      </div>

<aside
  className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-[#EEF1FA] border-r border-white/10 flex-col z-50 overflow-y-auto no-scrollbar"
  style={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)" }}
> 
        <div className="p-4 flex flex-col gap-4">
          <div className="flex justify-center">
            <img src={logo} alt="Logo" className="h-9 object-contain" />
          </div>

        
         <div className="w-full  bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF]   rounded-2xl p-4 flex flex-col items-center shadow-2xl">
           <div className="relative mb-3">    
                     <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 p-0.5">
              <div className="w-full h-full rounded-full bg-[#111827] flex items-center justify-center">
                <User size={24} className="text-orange-500" />               </div>             </div>
             <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#111827] rounded-full"></span>
          </div>
          <h3 className="text-sm font-bold text-white tracking-wide">Admin User</h3>
           <p className="text-[10px] text- uppercase font-bold text-white tracking-tighter mt-1">Super Admin</p>         </div>
       </div>

        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto no-scrollbar">
          {menu.map(item => <NavItem key={item.label} item={item} />)}
        </nav>

    
         <div className="p-4 border-t border-white/5">
    <p className="text-[9px] text-gray-600 text-center uppercase tracking-tighter">© 2024 Admin Dashboard</p>
  </div>
      </aside>

   
      <main className="lg:pl-64 pt-16 lg:pt-0 min-h-screen bg-[#EEF1FA]">
      
      </main>
    </>
  );
}