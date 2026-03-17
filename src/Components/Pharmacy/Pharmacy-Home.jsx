import React from "react";
import  Header from "../Pharmacy/Header";
import Medicinebought from "../Pharmacy/Medicine-bought";
import PatientDetails from "../Pharmacy/Patient-Details";

function PharmacyHome() {
  return (
    <div className="min-h-screen max-w-[1920px] mx-auto bg-gray-200 overflow-x-hidden shadow-lg">

      <Header/>

      <div className="flex flex-col lg:flex-row  mt-2  gap-2 items-stretch ">
        {/* Left */}
        <div className="w-full lg:w-[85%] ml-3">
          <Medicinebought />
        </div>

        {/* Right */}
        <div className="w-full   lg:w-1/4">
          <PatientDetails />
        </div>
      </div>

    </div>
  )
}

export default PharmacyHome;













