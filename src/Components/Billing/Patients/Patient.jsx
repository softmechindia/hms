import { AlignJustify, Search, User } from "lucide-react";
import React from "react";

function Patients() {
  const doctors = [
    {
      name: "Dr. Prashant Singh",
      image: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_o7K6S72VKLMnSLMW8Oknlxp9Pdxz874y.jpg",
      patients: [
        { id: 1, name: "Saloni Singh ", patientId: "1119064", apptTime: "12:33 AM" },
        { id: 2, name: "Khusi Verma", patientId: "1119064", apptTime: "11:30 AM" },
        { id: 3, name: "Saloni Shram", patientId: "1119064", apptTime: "03:22 PM" },
        { id: 4, name: "Khusi Gigoo", patientId: "1119064", apptTime: "11:30 AM" },
      ]
    },
    {
      name: "Dr. Jain",
      image: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_o7K6S72VKLMnSLMW8Oknlxp9Pdxz874y.jpg",
      patients: [
        { id: 1, name: "Saloni Verma ", patientId: "1119064", apptTime: "01:55 PM" },
        { id: 2, name: "Khusi Singh", patientId: "1119064", apptTime: "11:30 AM" },
        { id: 3, name: "Saloni Sharma", patientId: "1119064", apptTime: "12:44 PM" },
        { id: 4, name: "Khusi Mishra", patientId: "1119064", apptTime: "11:30 AM" },
      ]
    },
  ];

  return (
      <div className="bg-white rounded-md shadow-xl overflow-hidden border border-slate-200 scroll-auto">

        <div className="bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF] p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <User size={16} fill="white" />
            My Patient Queue
          </div>
          <Search size={18} className="opacity-90" />
        </div>
        <div className="p-2 space-y-3">
          {doctors.map((doctor, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-md shadow-sm p-3 flex flex-col gap-3">
              
          
              <div className="flex gap-4">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-[60px] h-[60px] rounded-lg object-cover shadow-sm border border-slate-50" 
                />
                <div className="flex-1 flex justify-between items-center">
                  <h3 className="font-bold text-slate-700 text-[16px]">{doctor.name}</h3>
              
                </div>
              </div>

       
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Patient Name</th>
                      <th className="py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Patient.Id</th>
                      <th className="py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right"> Appt.Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {doctor.patients.map((p, pIdx) => (
                      <tr key={pIdx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-2">
                          <span className=" py-2 text-xs font-semibold text-slate-600 ">
                            {p.name}
                          </span>
                        </td>
                        <td className="py-2 text-xs font-semibold text-slate-600">
                          {p.patientId}
                        </td>
                        <td className="py-2 text-xs text-slate-600 text-right font-semibold">
                          {p.apptTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
            </div>
          ))}
        </div>
      </div>
   
  );
}

export default Patients;