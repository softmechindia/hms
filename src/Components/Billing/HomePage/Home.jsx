import React from "react";
import Form from "../PatientForm/Form";
import Patients from "../Patients/Patient";

function  Home() {
  return (
   
<div className="flex flex-col lg:flex-row flex-1 m-4 gap-4 ">
  {/* Left */}
 <div className="w-full lg:w-[85%]">
  <Form />
</div>


  {/* Right */}
  <div className="w-full mt-2 lg:w-1/2">
    <Patients />
  </div>
</div>


  );
}

export default Home;

