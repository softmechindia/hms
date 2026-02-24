import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet,Navigate } from "react-router-dom";

import HomePage from "./Billing/Components/HomePage/Home";
import TotalAppointment from "./Billing/Components/Total-Appointment/Total-appointment";
import MyProfile from "./Billing/Components/MyProfile/Patient-Profile";
import Pending from "./Billing/Components/Pending/Pending";
import TodayConf from "./Billing/Components/Today-Conf/Today-conf";
import CancelAppointment from "./Billing/Components/Cancel-Appointment/Cancelled";
import Collections from "./Billing/Components/Collections/Collection";
import Layouts from "./Billing/Components/Layouts";
import LoginPage from "./Billing/Login-Page/Login";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>

      <Routes>
        <Route path="/" element={!isAuthenticated ? (<LoginPage setAuth={setIsAuthenticated} />) : (
          <Layouts>
            <Outlet />
          </Layouts>
        )}
          >

        {isAuthenticated && (
          <>
            <Route index element={<HomePage />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/total-app" element={<TotalAppointment />} />
            <Route path="/pending" element={<Pending />} />
            <Route path="/today-conf" element={<TodayConf />} />
            <Route path="/cancel" element={<CancelAppointment />} />
            <Route path="/collections" element={<Collections />} />
          </>

        )}
             </Route>

        <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Router>
  );
}

export default App;