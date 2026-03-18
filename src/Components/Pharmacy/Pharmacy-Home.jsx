import React from "react";
import Header from "../Pharmacy/Header";
import Medicinebought from "../Pharmacy/Medicine-bought";
import PatientDetails from "../Pharmacy/Patient-Details";
import PharmacySidebar from "../Pharmacy/PharmacySidebar";

function PharmacyHome() {
  return (
  
    <div className="flex h-[100vh] w-full bg-gray-100 overflow-hidden">
      

      <div className="hidden lg:block h-full   shadow-xl">
        <PharmacySidebar />
      </div>


      <div className="flex flex-col flex-1 min-w-0 ">
        
   
        <Header />

  
        <main className="flex-1 overflow-y-auto mt-4 ml-4 mr-4">
          <div className="flex flex-col lg:flex-row  items-start gap-4">
        
            <div className="flex-1 w-full">
              <Medicinebought />
            </div>

          
            <div className="w-full lg:w-80">
              <PatientDetails />
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}

export default PharmacyHome;