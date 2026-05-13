import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BillingApp from "./Components/Billing/BillingApp";
import DoctorApp from "./Components/Doctor/DoctorApp";
import PharmacyApp from "./Components/Pharmacy/PharmacyApp";
import Login from "./Components/Login-Page/Login";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? true : false;
  });

  const [userRole, setUserRole] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      return user.user_type.toLowerCase();
    }
    return null;
  });
  
  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<Login setAuth={setIsAuthenticated} />} />
        ) : (
          <>
            <Route path="/doctor/*" element={<DoctorApp />} />
            <Route path="/pharmacy/*" element={<PharmacyApp />} />
            <Route path="/*" element={<BillingApp />} />
          </>

        )}

      </Routes>
    </Router>
  );
}

export default App;