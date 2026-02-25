import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from "../Doctor/Navbar";
import DoctorHeader from "../Doctor/DoctorHeader";
import HomePage from "../Doctor/HomePage";
import Upcoming from "../Doctor/Upcoming";

import Patients from '../Doctor/Patients';
import Dashbaord from '../Doctor/Dashbaord';

function DoctorApp() {
  return (
    <>
      <Navbar />
      <DoctorHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="dashboard" element={<Dashbaord/>} />
        <Route path="patient" element={<Patients />} />
        <Route path="up-comming" element={<Upcoming />} />
      </Routes>
    </>
  )
}

export default DoctorApp;