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
import LoginPage from "../Billing/Login-Page/Login";

function BillingApp() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Routes>
            <Route path="/" element={!isAuthenticated ? (
                <LoginPage setAuth={setIsAuthenticated} />
            ) : (
                <Layouts><Outlet /></Layouts>
            )}
            >
                {isAuthenticated && (
                    <>
                        <Route index element={<HomePage />} />
                        <Route path="my-profile" element={<MyProfile />} />
                        <Route path="total-app" element={<TotalAppointment />} />
                        <Route path="pending" element={<Pending />} />
                        <Route path="today-conf" element={<TodayConf />} />
                        <Route path="cancel" element={<CancelAppointment />} />
                        <Route path="collections" element={<Collections />} />
                    </>

                )}
            </Route>
            <Route path="*" element={<Navigate to="/" />} />





        </Routes>
    );
}

export default BillingApp;