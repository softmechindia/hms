import React from "react";
import Form from "../PatientForm/Form";
import Patients from "../Patients/Patient";
import Navbar from "../../Billing/Navbar";
function  Home() {
  return (
  <div className="h-[100vh] w-full  bg-gray-200 overflow-x-hidden shadow-lg">
<div>
 <Navbar/>
</div>
 <div className="flex flex-col lg:flex-row  mt-2  gap-2 items-stretch ">
  {/* Left */}
 <div className="w-full lg:w-[85%]">
  <Form />
</div>

 {/* Right */}
  <div className="w-full  lg:w-1/2">
    <Patients />
  </div>
</div>
   </div>

  );
}

export default Home;

