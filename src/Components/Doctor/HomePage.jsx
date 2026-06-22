import React from "react";
import Form from "./Form";
import DoctorHeader from "../Doctor/DoctorHeader";
import PatientList from "../../Components/Doctor/PatientsList";
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
            <PatientList />
          </div>

        </div>
      </div>
    </div>
      
  );
}

export default HomePage;