import React from "react";
import Form from "./Form";
import DoctorHeader from "./Search-Patients-Header";
import CurrentPatientList from "./Current-PatientsList";
import Navbar from "./Navbar";

function HomePage() {
  return (
    
<div className=" h-[100vh] ">



      <Navbar/>
      
      <DoctorHeader />


      <div className="">
        <div className="flex flex-col lg:flex-row   ">

          <div className="w-full lg:w-[78%]">
            <Form />
          </div>

          <div className="w-full lg:flex-1">
            <CurrentPatientList />
          </div>

        </div>
      </div>
    </div>
      
  );
}

export default HomePage;