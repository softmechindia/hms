import React from "react";
import Form from "./Form";
import DoctorHeader from "../Doctor/DoctorHeader";
import PatientList from "../../Components/Doctor/PatientsList";
import Navbar from "./Navbar";

function HomePage() {
  return (

<div className="min-h-full max-w-[1920px] mx-auto bg-gray-100 overflow-x-hidden shadow-lg">



    <div className="min-h-full max-w-[1920px] mx-auto bg-gray-100 overflow-x-hidden shadow-lg">
      <Navbar/>
      
      <DoctorHeader />


      <div className="px-6 py-6 ">
        <div className="flex flex-col lg:flex-row gap-6">

          <div className="w-full lg:w-[78%]">
            <Form />
          </div>

          <div className="w-full lg:flex-1">
            <PatientList />
          </div>

        </div>
      </div>
    </div>
        </div>
  );
}

export default HomePage;