import React, { useState } from "react";

function PatientDetails() {
  // Note: Changed IDs to be unique so keys work properly
  const [patients, setPatients] = useState([
    { id: 1, name: "Rohit Sharma", patientid: "1119054", patientDate: "22/04/2026" },
    { id: 2, name: "Virat Kohli", patientid: "1119055", patientDate: "23/04/2026" },
    { id: 3, name: "MS Dhoni", patientid: "1119056", patientDate: "24/04/2026" },
    { id: 1, name: "Rohit Sharma", patientid: "1119054", patientDate: "22/04/2026" },
    { id: 2, name: "Virat Kohli", patientid: "1119055", patientDate: "23/04/2026" },
    { id: 3, name: "MS Dhoni", patientid: "1119056", patientDate: "24/04/2026" },

    { id: 1, name: "Rohit Sharma", patientid: "1119054", patientDate: "22/04/2026" },
    { id: 2, name: "Virat Kohli", patientid: "1119055", patientDate: "23/04/2026" },
    { id: 3, name: "MS Dhoni", patientid: "1119056", patientDate: "24/04/2026" },
    { id: 1, name: "Rohit Sharma", patientid: "1119054", patientDate: "22/04/2026" },
    { id: 2, name: "Virat Kohli", patientid: "1119055", patientDate: "23/04/2026" },
    { id: 3, name: "MS Dhoni", patientid: "1119056", patientDate: "24/04/2026" },

    { id: 1, name: "Rohit Sharma", patientid: "1119054", patientDate: "22/04/2026" },
    { id: 2, name: "Virat Kohli", patientid: "1119055", patientDate: "23/04/2026" },
    { id: 3, name: "MS Dhoni", patientid: "1119056", patientDate: "24/04/2026" },





  ]);

  const removePatient = (id) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  const Table = () => (
<div className="bg-white shadow-sm h-[100vh] border border-gray-200 overflow-hidden rounded-t">
      <div className="bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF] text-white px-4 py-2 ">
        <h3 className="text-sm font-bold uppercase tracking-wider flex items-center justify-center">
          Patients Details
        </h3>
      </div>
      <table className="w-full text-[13px] text-left border-collapse">
        <thead className="bg-gray-400 text-white">
          <tr>
            <th className="px-4 py-2 font-semibold whitespace-nowrap border-r border-white/20">Patient Name</th>
            <th className="px-4 py-2 font-semibold whitespace-nowrap border-r border-white/20">Patient ID</th>
            <th className="px-4 py-2 font-semibold whitespace-nowrap">Patient Date</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className="border-b last:border-b-0 hover:bg-blue-50/50 transition-colors">
              <td className="px-4 py-2 font-medium text-gray-700 whitespace-nowrap border-r border-gray-100">
                {patient.name}
              </td>
              <td className="px-4 py-2 text-gray-600 whitespace-nowrap border-r border-gray-100">
                {patient.patientid}
              </td>
              <td className="px-4 py-2 text-gray-600 whitespace-nowrap">
                {patient.patientDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );

  return (
 

      <div className="overflow-x-auto">
        <Table />
      </div>

  );
}

export default PatientDetails;