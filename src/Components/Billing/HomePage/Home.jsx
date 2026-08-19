import React, { useState } from "react";
import Form from "../PatientForm/Form";
import Patients from "../Patients/Patient";
import Navbar from "../../Billing/Navbar";

function Home() {
  const [patientRefreshKey, setPatientRefreshKey] = useState(0);

  const handleBookingSuccess = () => {
    // give backend 600ms to commit then re-fetch My Patient
    setTimeout(() => setPatientRefreshKey(prev => prev + 1), 600);
  };

  return (
    <div className="w-full bg-gray-200 overflow-x-hidden shadow-lg">
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col lg:flex-row mt-2 gap-2 items-start">
        {/* Left */}
        <div className="w-full lg:w-[60%]">
          <Form onBookingSuccess={handleBookingSuccess} />
        </div>
        {/* Right */}
        <div className="w-full lg:w-[40%]">
          <Patients refreshKey={patientRefreshKey} />
        </div>
      </div>
    </div>
  );
}

export default Home;
