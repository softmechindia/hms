import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BillingApp from "./Components/Billing/BillingApp";
import DoctorApp from "./Components/Doctor/DoctorApp";
import PharmacyApp from "./Components/Pharmacy/PharmacyApp";
import Login from "./Components/Login-Page/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        {/* Agar authenticated nahi hai, toh sirf aur sirf login page khulega */}
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
            {/* Jab logged out ho, toh koi bhi path ho use /login par hi bhej do */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            {/* Authenticated hone par ye paths chalenge */}
            <Route path="/*" element={<BillingApp setAuth={setIsAuthenticated} />} />
            <Route path="/doctor/*" element={<DoctorApp setAuth={setIsAuthenticated} />} />
            <Route path="/pharmacy/*" element={<PharmacyApp setAuth={setIsAuthenticated} />} />
            
            {/* Logged in hone par kisi bhi galat path ko home par redirect karega */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;