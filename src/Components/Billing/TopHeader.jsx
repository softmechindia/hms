import React from "react";
import { useLocation } from "react-router-dom";
import { Menu, Bell, ChevronDown, User } from "lucide-react"; 

export default function TopHeader() {
    
    const location = useLocation();
    

    // Dynamic Heading Logic
    const getHeading = () => {
        const path = location.pathname;

        if (path.endsWith('/total-app')) return 'Total Appointments';
        if (path.endsWith('/pending')) return 'Pending Appointments';
        if (path.endsWith('/today-conf')) return 'Today\'s Confirmed';
        if (path.endsWith('/cancel')) return 'Cancelled Appointments';
        if (path.endsWith('/collections')) return 'Collections';
        if (path.endsWith('/profile')) return 'My Profile';

        return 'Appointments'; 
    };

    return (
        <div className="flex items-center justify-between bg-white px-6 py-3 border-b border-gray-200 w-full h-[60px]">

  
            <div className="flex items-center gap-4">
                <button className="text-gray-500 hover:text-gray-800 transition-colors focus:outline-none">
                    <Menu className="w-5 h-5" />
                </button>
                <h1 className="text-[19px] font-semibold text-gray-800">
                    {getHeading()}
                </h1>
            </div>

            <div className="flex items-center gap-5">


                {/* Profile Section */}
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-3 focus:outline-none"
                    >
                        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-white font-bold flex items-center justify-center shadow-md border-2 border-white">
                            <User />
                        </div>
                    </button>



                </div>
            </div>

        </div>
    );
}