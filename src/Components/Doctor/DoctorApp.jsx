// DoctorApp.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../Doctor/HomePage";
import Dashboard from "../Doctor/Dashbaord"; 
import DoctorPatients  from "../Doctor/Doctor-Patients";
import Upcoming from "../Doctor/Upcoming";
import DoctorProfile from "./Doctor-Profile";
import ChangePassword from "../Doctor/Change-Password";

function DoctorApp() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patient" element={<DoctorPatients />} />
        <Route path="upcoming" element={<Upcoming />} />
       <Route path="profile" element={<DoctorProfile />} />
       <Route path="change-password" element={<ChangePassword/>}/>
        

        <Route path="add-prescription" element={<HomePage/>} />
      </Route>
    </Routes>
  );
}

export default DoctorApp;