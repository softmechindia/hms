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
        {!isAuthenticated ? (
          <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        ) : (
          <>
            <Route path="/*" element={<BillingApp />} />
            <Route path="/doctor/*" element={<DoctorApp />} />
            <Route path="/pharmacy/*" element={<PharmacyApp />} />
          </>
        )}

        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;