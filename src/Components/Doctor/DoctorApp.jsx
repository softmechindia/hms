// DoctorApp.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../Doctor/HomePage";
import Dashboard from "../Doctor/Dashbaord"; 
import Patients from "../Doctor/Patients";
import Upcoming from "../Doctor/Upcoming";


function DoctorApp() {
  return (
    <Routes>
      <Route element={<Layout />}>
   
        <Route index element={<HomePage />} />
        
     
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patient" element={<Patients />} />
        <Route path="upcoming" element={<Upcoming />} />
        

        <Route path="add-prescription" element={<HomePage/>} />
      </Route>
    </Routes>
  );
}

export default DoctorApp;