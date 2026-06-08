import { AlignJustify, Search, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { GetMyBookings } from "../../../api/endpoints/authApi";
import { FaUser, FaCalendarXmark } from "react-icons/fa6";
import PatientSkeleton from "../Loaders/Patient-Skeleton";
import { useOutletContext } from "react-router-dom";


function Patients() {
  const { refreshTrigger } = useOutletContext();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await GetMyBookings({ user_id: "ST0001" });

        console.log("Full API Response:", response);


        if (response.fullData && response.fullData.success === 1) {

          console.log("Doctors Data Array:", response.fullData.data);
          setDoctors(response.fullData.data);
        } else {
          console.warn("API check failed", response);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]);

  const DEFAULT_DOCTOR_PHOTO = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop";



  return (

    <div className={`bg-white  rounded-md shadow-xl border border-slate-200 h-[650px] mb-3  overflow-y-auto transition-all duration-300
     ${doctors.length > 1 ? "overflow-y-auto" : "overflow-hidden"}`}>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF] p-3  flex justify-between items-center text-white">
        <div className="flex items-center gap-2 text-sm font-semibold">
          My Patient
        </div>
      </div>

      <div className="p-2 space-y-3">

        {loading ? (
          <PatientSkeleton />
        ) : doctors.length > 0 ? (

          doctors.map((doctor, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-md shadow-sm p-3 flex flex-col gap-3"
            >


              <div className="bg-gray-200 p-2 rounded-md ">

                <div className="flex gap-4 items-center">
                  <img
                    src={doctor.doctor_photo || DEFAULT_DOCTOR_PHOTO}
                    alt={doctor.doctor_name || "Doctor"}
                    className="w-[70px] h-[70px] rounded-md object-cover shadow-md border-2 border-white"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = DEFAULT_DOCTOR_PHOTO;
                    }}
                  />

                  <div className="flex-1 flex justify-between items-center">
                    <div>

                      <h3 className="font-bold text-slate-800 text-[17px] leading-tight">
                        {doctor.doctor_name}
                      </h3>

                      <p className="text-[12px] text-blue-600 font-medium uppercase tracking-wide">
                        {doctor.doctor_type}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="bg-[#4F6EEA] text-white text-[11px] px-3 py-1 rounded-full font-bold shadow-sm">
                        {doctor.total_patient} Patients
                      </span>
                    </div>
                  </div>
                </div>
              </div>


              <div className="overflow-x-auto">

                <table className="w-full text-left border-collapse">

                  <thead>
                    <tr className="border-b border-slate-300 ">

                      <th className="py-2 text-[11px] font-bold text-black uppercase tracking-wider ">
                        Patient Name
                      </th>

                      <th className="py-2 text-[11px] font-bold text-black  uppercase tracking-wider">
                        Patient Id
                      </th>

                      <th className="py-2 text-[11px] font-bold text-black uppercase tracking-wider text-right">
                        Appt. Date
                      </th>

                      <th className="py-2 text-[11px] font-bold text-black uppercase tracking-wider text-right">
                        Appt. Time
                      </th>

                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-50  ">
                    {doctor.patients.map((p, pIdx) => (
                      <tr
                        key={pIdx}
                        className="even:bg-gray-100 hover:bg-blue-50 transition cursor-pointer"
                      >

                        <td className="py-1.5 px-2 text-[13px] whitespace-nowrap text-black">
                          <div className="flex items-center gap-2">
                            <FaUser className="h-3 text-blue-500 flex-shrink-0" />
                            <span className=" text-xs truncate max-w-[120px]">
                              {p.patient_name}
                            </span>
                          </div>
                        </td>

                        <td className="py-1.5 px-2 text-[11px] text-black whitespace-nowrap">
                          {p.patient_id}
                        </td>

                        <td className="py-1.5 px-2 text-[11px] text-black whitespace-nowrap text-right">
                          {p.appointment_date}
                        </td>

                        <td className="py-1.5 px-2 text-[11px] text-black whitespace-nowrap text-right">
                          {p.appointment_time}
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[500px] text-center p-6">
            <div className="bg-blue-50 p-6 rounded-full mb-4">
              <FaCalendarXmark className="text-blue-300 text-6xl" />
            </div>
            <h2 className="text-xs font-bold text-slate-700">No Appointments Found</h2>
          </div>
        )}







      </div>

    </div>

  );
}

export default Patients;