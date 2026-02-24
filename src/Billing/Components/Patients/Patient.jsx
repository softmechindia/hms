import React from "react";

function Patients() {
  const doctors = [
    {
      name: "Dr. Prashant Singh",
      patients: [
        { name: "Vikram Singh", appointment: "09:00 AM", virtual: "09:30 AM" },
        { name: "Pooja Jain", appointment: "10:30 AM", virtual: "11:00 AM" },
        { name: "Pooja Jain", appointment: "10:30 AM", virtual: "11:00 AM" },
        { name: "Amit Kumar", appointment: "11:00 AM", virtual: "11:30 AM" },
        { name: "Sonia Verma", appointment: "12:00 PM", virtual: "12:30 PM" },
        { name: "Sonia Verma", appointment: "12:00 PM", virtual: "12:30 PM" },
                { name: "Vikram Singh", appointment: "09:00 AM", virtual: "09:30 AM" },
        { name: "Pooja Jain", appointment: "10:30 AM", virtual: "11:00 AM" },
        { name: "Pooja Jain", appointment: "10:30 AM", virtual: "11:00 AM" },
        { name: "Amit Kumar", appointment: "11:00 AM", virtual: "11:30 AM" },
        { name: "Sonia Verma", appointment: "12:00 PM", virtual: "12:30 PM" },
        { name: "Sonia Verma", appointment: "12:00 PM", virtual: "12:30 PM" },
 
      ],

    },
    {
      name: "Dr. Anjali Mehra",
      patients: [
        { name: "Vikram Singh", appointment: "09:00 AM", virtual: "09:30 AM" },
        { name: "Pooja Jain", appointment: "10:30 AM", virtual: "11:00 AM" },
        { name: "Pooja Jain", appointment: "10:30 AM", virtual: "11:00 AM" },
        { name: "Amit Kumar", appointment: "11:00 AM", virtual: "11:30 AM" },
        { name: "Sonia Verma", appointment: "12:00 PM", virtual: "12:30 PM" },
        { name: "Sonia Verma", appointment: "12:00 PM", virtual: "12:30 PM" },
                { name: "Vikram Singh", appointment: "09:00 AM", virtual: "09:30 AM" },
        { name: "Pooja Jain", appointment: "10:30 AM", virtual: "11:00 AM" },
        { name: "Pooja Jain", appointment: "10:30 AM", virtual: "11:00 AM" },
        { name: "Amit Kumar", appointment: "11:00 AM", virtual: "11:30 AM" },
        { name: "Sonia Verma", appointment: "12:00 PM", virtual: "12:30 PM" },
        { name: "Sonia Verma", appointment: "12:00 PM", virtual: "12:30 PM" },
                   { name: "Vikram Singh", appointment: "09:00 AM", virtual: "09:30 AM" },
        { name: "Pooja Jain", appointment: "10:30 AM", virtual: "11:00 AM" },
        { name: "Pooja Jain", appointment: "10:30 AM", virtual: "11:00 AM" },
        { name: "Amit Kumar", appointment: "11:00 AM", virtual: "11:30 AM" },
        { name: "Sonia Verma", appointment: "12:00 PM", virtual: "12:30 PM" },
        { name: "Sonia Verma", appointment: "12:00 PM", virtual: "12:30 PM" },
 
      ],
    },
  ];

  return (
 
      <div className="flex flex-col h-full bg-white  border border-gray-300 rounded-md shadow-md">
<div className="px-4 py-2 bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF] text-white flex items-center justify-center rounded-t-md font-medium">
        My patient List
      </div>

<div className="p-2 flex-grow overflow-y-auto">
         
     
        {doctors.map((doctor, idx) => (
          <div
            key={idx} className="mt-6 first:mt-6"
          >
      

            <div className="bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden mt-1">
              <div className="bg-indigo-600 text-white px-2 py-1">
                {doctor.name}
              </div>

                   <div
                className={`overflow-x-auto ${
                  doctor.patients.length > 5
                    ? "max-h-52 overflow-y-auto"
                    : ""
                }`} >
              

           
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100 text-black sticky top-0">
                    <tr>
                      <th className="px-2 py-1 text-left text-sm">
                        Patient Name
                      </th>
                      <th className="px-2 py-1 text-left text-sm">
                        Appointment Time
                      </th>
                      <th className="px-2 py-1 text-left text-sm">
                        Virtual Time
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {doctor.patients.length > 0 ? (
                      doctor.patients.map((patient, i) => (
                        <tr key={i}>
                          <td className="px-2 py-1 text-sm">
                            {patient.name}
                          </td>
                          <td className="px-2 py-1 text-sm">
                            {patient.appointment}
                          </td>
                          <td className="px-2 py-1 text-sm">
                            {patient.virtual}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-6 py-12 text-center text-red-500"
                        >
                          Appointment Not Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
         
        ))}
      </div>
      </div>
  
  );
}

export default Patients;
