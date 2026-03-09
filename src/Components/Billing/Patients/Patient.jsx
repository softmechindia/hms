import { AlignJustify, Search, User } from "lucide-react";
import React from "react";

function Patients() {

  const doctors = [
    {
      name: "Dr. Prashant Singh",
      image:
        "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_o7K6S72VKLMnSLMW8Oknlxp9Pdxz874y.jpg",
      patients: [
        { id: 1, name: "Saloni Singh ", patientId: "1119064", apptDate: "12/04/2-26", apptTime: "12:33 AM" },
        { id: 2, name: "Khusi Verma", patientId: "1119064", apptDate: "12/04/2-26", apptTime: "11:30 AM" },
        { id: 3, name: "Saloni Shram", patientId: "1119064", apptDate: "12/04/2-26", apptTime: "03:22 PM" },
        { id: 4, name: "Khusi Gigoo", patientId: "1119064", apptDate: "12/04/2-26", apptTime: "11:30 AM" },
      ],
    },
    {
      name: "Dr. Sharma",
      image:
        "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_o7K6S72VKLMnSLMW8Oknlxp9Pdxz874y.jpg",
      patients: [
        { id: 1, name: "Muskan Verma ", patientId: "1119062", apptDate: "12/04/2-26", apptTime: "01:55 PM" },
        { id: 2, name: "Nish Singh", patientId: "1119064", apptDate: "12/04/2-26", apptTime: "11:30 AM" },
        { id: 3, name: "Saniya Sharma", patientId: "1119764", apptDate: "12/04/2-26", apptTime: "12:44 PM" },
        { id: 3, name: "Saniya Sharma", patientId: "1119764", apptDate: "12/04/2-26", apptTime: "12:44 PM" },
      ],
    },
    {
      name: "Dr. Sharma",
      image:
        "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_o7K6S72VKLMnSLMW8Oknlxp9Pdxz874y.jpg",
      patients: [
        { id: 1, name: "Muskan Verma ", patientId: "1119062", apptDate: "12/04/2-26", apptTime: "01:55 PM" },
        { id: 2, name: "Nish Singh", patientId: "1119064", apptDate: "12/04/2-26", apptTime: "11:30 AM" },
        { id: 3, name: "Saniya Sharma", patientId: "1119764", apptDate: "12/04/2-26", apptTime: "12:44 PM" },
        { id: 3, name: "Saniya Sharma", patientId: "1119764", apptDate: "12/04/2-26", apptTime: "12:44 PM" },
      ],
    },
  ];

  return (

    <div className="bg-white rounded-md shadow-xl border border-slate-200 h-[780px] overflow-y-auto transition-all duration-300">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF] p-3 flex justify-between items-center text-white">
        <div className="flex items-center gap-2 text-sm font-semibold">
          My Patient
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="p-2 space-y-3">

        {doctors.map((doctor, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-100 rounded-md shadow-sm p-3 flex flex-col gap-3"
          >

            {/* Doctor Info */}
            <div className="bg-gray-100 hover:bg-gray-300 p-2 rounded">
              <div className="flex gap-4 items-center">

                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-[75px] h-[75px] rounded-lg object-cover shadow-sm border border-slate-50"
                />

                <div className="flex-1 flex justify-between items-center">
                  <h3 className="font-bold text-slate-700 text-[16px]">
                    {doctor.name}
                  </h3>
                </div>

              </div>
            </div>

            {/* Patient Table */}
            <div className="overflow-x-auto">

              <table className="w-full text-left border-collapse">

                <thead>
                  <tr className="border-b border-slate-300">

                    <th className="py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Patient Name
                    </th>

                    <th className="py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Patient Id
                    </th>

                    <th className="py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">
                      Appt. Date
                    </th>

                    <th className="py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">
                      Appt. Time
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">

                  {doctor.patients.map((p, pIdx) => (

                    <tr
                      key={pIdx}
                      className="even:bg-gray-50 hover:bg-blue-50 transition cursor-pointer"
                    >

                      <td className="py-3 px-2 text-xs md:text-sm font-semibold text-slate-700">
                        {p.name}
                      </td>

                      <td className="py-3 px-2 text-xs md:text-sm text-slate-600">
                        {p.patientId}
                      </td>

                      <td className="py-3 px-2 text-xs md:text-sm text-right text-slate-600">
                        {p.apptDate}
                      </td>

                      <td className="py-3 px-2 text-xs md:text-sm text-right font-semibold text-slate-700">
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