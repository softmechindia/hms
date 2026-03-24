import React from "react";
import Medicinebought from "../Pharmacy/Medicine-bought";
import PatientDetails from "../Pharmacy/Patient-Details";

function PharmacyHome() {
  return (
    <div className="w-full">
      
     
      <div className="mt-2 mx-2 lg:mx-2">

        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* Left Section */}
          <div className="flex-1">
            <Medicinebought />
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-80">
            <PatientDetails />
          </div>

        </div>

      </div>

    </div>
  );
}

export default PharmacyHome;