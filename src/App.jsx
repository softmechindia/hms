import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BillingApp from "./Components/Billing/BillingApp";
import DoctorApp from "./Components/Doctor/DoctorApp";

function App() {
  return (
    <Router>
      <Routes>
  
        <Route path="/doctor/*" element={<DoctorApp />} />


        <Route path="/*" element={<BillingApp />} />
      </Routes>
    </Router>
  );
}

export default App;