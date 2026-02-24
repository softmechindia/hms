import React, { useState } from "react";

function PatientList() {

  const [patients, setPatients] = useState([
    { id: 1, name: "Rohit Sharma", visit: "11:54 AM", time: "10:30 AM" },
    { id: 2, name: "Neha Singh", visit: "11:54 AM", time: "11:15 AM" },
    { id: 3, name: "Aman Verma", visit: "11:54 AM", time: "12:00 PM" },
    { id: 4, name: "Rohit Sharma", visit: "11:54 AM", time: "10:30 AM" },
    { id: 5, name: "Neha Singh", visit: "11:54 AM", time: "11:15 AM" },
    { id: 6, name: "Aman Verma", visit: "11:54 AM", time: "12:00 PM" },
    { id: 1, name: "Rohit Sharma", visit: "11:54 AM", time: "10:30 AM" },
    { id: 2, name: "Neha Singh", visit: "11:54 AM", time: "11:15 AM" },
    { id: 3, name: "Aman Verma", visit: "11:54 AM", time: "12:00 PM" },
    { id: 4, name: "Rohit Sharma", visit: "11:54 AM", time: "10:30 AM" },
    { id: 5, name: "Neha Singh", visit: "11:54 AM", time: "11:15 AM" },
    { id: 6, name: "Aman Verma", visit: "11:54 AM", time: "12:00 PM" },
  ]);


  const removePatient = (id) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  const Table = () => (
    <table className="w-full text-sm text-left">
      <thead className="bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF] text-white text-xs">
        <tr>
          <th className="px-4 py-1 whitespace-nowrap">Name</th>
          <th className="px-3 py-1 whitespace-nowrap">Visit</th>
          <th className="px-3 py-1 whitespace-nowrap">Time</th>
          <th className="px-3 py-1 whitespace-nowrap">Action</th> 
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.id} className="border-b hover:bg-gray-50">
            <td className="px-3 py-1 font-medium whitespace-nowrap">{patient.name}</td>
            <td className="px-3 py-1 whitespace-nowrap">{patient.visit}</td>
            <td className="px-3 py-1 whitespace-nowrap">{patient.time}</td>
            <td className="px-3 py-1 text-center whitespace-nowrap">
        
              <button
                onClick={() => removePatient(patient.id)}
                className="text-red-600 hover:text-red-800 font-bold text-lg"
              >
                &times; 
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      {/* Table container */}
      <div className="bg-white rounded-md shadow-sm overflow-x-auto">
        <Table />
      </div>
    </>
  );
}

export default PatientList;