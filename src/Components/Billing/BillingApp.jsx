// import React, { useState } from "react";
// import { Routes, Route, Outlet, Navigate } from "react-router-dom";

// import HomePage from "../Billing/HomePage/Home";
// import TotalAppointment from "../Billing/Total-Appointment/Total-appointment";
// import MyProfile from "../Billing/MyProfile/Patient-Profile";
// import Pending from "../Billing/Pending/Pending";
// import TodayConf from "../Billing/Today-Conf/Today-conf";
// import CancelAppointment from "../Billing/Cancel-Appointment/Cancelled";
// import Collections from "../Billing/Collections/Collection";
// import Layouts from "../Billing/Layouts";
// import LoginPage from "../Billing/Login-Page/Login";

// function BillingApp() {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     return (
//         <Routes>
//             <Route path="/" element={!isAuthenticated ? (
//                 <LoginPage setAuth={setIsAuthenticated} />
//             ) : (
//                 <Layouts><Outlet /></Layouts>
//             )}
//             >
//                 {isAuthenticated && (
//                     <>
//                         <Route index element={<HomePage />} />
//                         <Route path="my-profile" element={<MyProfile />} />
//                         <Route path="total-app" element={<TotalAppointment />} />
//                         <Route path="pending" element={<Pending />} />
//                         <Route path="today-conf" element={<TodayConf />} />
//                         <Route path="cancel" element={<CancelAppointment />} />
//                         <Route path="collections" element={<Collections />} />
//                     </>

//                 )}
//             </Route>
//             <Route path="*" element={<Navigate to="/" />} />





//         </Routes>
//     );
// }

// export default BillingApp;

import React, { useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import HomePage from "../Billing/HomePage/Home";
import TotalAppointment from "../Billing/Total-Appointment/Total-appointment";
import MyProfile from "../Billing/MyProfile/Patient-Profile";
import Pending from "../Billing/Pending/Pending";
import TodayConf from "../Billing/Today-Conf/Today-conf";
import CancelAppointment from "../Billing/Cancel-Appointment/Cancelled";
import Collections from "../Billing/Collections/Collection";
import Layouts from "../Billing/Layouts";
// import LoginPage from "../Billing/Login-Page/Login"; // Commented out

function BillingApp() {
    // 1. Set to true so the app thinks you are always logged in
    const [isAuthenticated, setIsAuthenticated] = useState(true); 

    return (
        <Routes>
            {/* 2. Main Wrapper Route */}
            <Route 
                path="/" 
                element={
                    /* If you want to completely skip the login check logic: */
                    <Layouts><Outlet /></Layouts>
                    
                    /* Original logic commented:
                    !isAuthenticated ? (
                        <LoginPage setAuth={setIsAuthenticated} />
                    ) : (
                        <Layouts><Outlet /></Layouts>
                    ) */
                }
            >
                {/* 3. Dashboard Routes */}
                <Route index element={<HomePage />} />
                <Route path="my-profile" element={<MyProfile />} />
                <Route path="total-app" element={<TotalAppointment />} />
                <Route path="pending" element={<Pending />} />
                <Route path="today-conf" element={<TodayConf />} />
                <Route path="cancel" element={<CancelAppointment />} />
                <Route path="collections" element={<Collections />} />
            </Route>

            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default BillingApp;