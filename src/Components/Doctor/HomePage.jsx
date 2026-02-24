import React from "react";
import Form from "./Form";

import PatientList from "../../Components/Doctor/PatientsList";

function  HomePage() {
  return (
   
<div className="flex flex-col lg:flex-row flex-1 m-4 gap-4 ">
  {/* Left */}
 <div className="w-full lg:w-[85%]">
  <Form/>
</div>


  {/* Right */}
  <div className="">
   <PatientList/>
  </div>
</div>


  );
}

export default HomePage;












