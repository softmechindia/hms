import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from "../Doctor/Navbar";
import DoctorHeader from "../Doctor/DoctorHeader";
import HomePage from "../Doctor/HomePage";

function DoctorApp() {
  return (
    <>
      <Navbar/>
      <DoctorHeader/>
      <Routes>
    
        <Route index element={<HomePage />} />
 
      </Routes>
    </>
  )
}

export default DoctorApp;