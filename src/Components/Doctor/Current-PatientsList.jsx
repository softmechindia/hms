import React, { useEffect, useState } from "react";
import { FaCalendarXmark } from "react-icons/fa6";
import CancelAppointmentModal from "./Popup/Cancel-appointment-popup";
import { getCurrentAppointment } from "../../api/endpoints/authApi";

function CurrentPatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);

        const loggedInDoctorId = localStorage.getItem("doctorId");
        if (!loggedInDoctorId) {
          setError("Doctor ID not found. Please login again.");
          setLoading(false);
          return;
        }

        const payload = { doctor_id: loggedInDoctorId };
        const response = await getCurrentAppointment(payload);

        console.log("--- RAW PROXY RESPONSE ---", response);

        const apiData = response?.fullData || response;

        if (response && response.status === false) {
          setPatients([]);
          setError(response.message || "Request failed");
          return;
        }

        if (apiData && apiData.success === 1 && Array.isArray(apiData.data)) {
          const formattedPatients = apiData.data.map((item) => ({
            id: item.id,
            name: item.patient_name,
            user_id:item.user_id,
            visit: item.visit_time,
            time: item.appointment_time,
          }));

          setPatients(formattedPatients);
        } else {
          setPatients([]);
          // Handles dynamic empty message: "No Current Appointment Found"
          setError(apiData?.message || response?.message || "No Appointments Found");
        }
      } catch (err) {
        console.error("--- PatientList Component Catch Error ---", err);
        setError("An error occurred while fetching appointments.");
      } finally {
        setLoading(false);
      }
    };


    fetchAppointments();

  }, []);

  const removePatient = (id) => {
    setPatients((prevPatients) =>
      prevPatients.filter((patient) => patient.id !== id)
    );
    setShowCancelModal(false);
    setSelectedPatient(null);
  };

  const openCancelModal = (patient) => {
    setSelectedPatient(patient);
    setShowCancelModal(true);
  };


  const Table = () => (
    <div className="w-full max-w-full md:max-w-[450] lg:max-w-[380] rounded-sm bg-white shadow-sm overflow-hidden min-h-[450] flex flex-col justify-between">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-left table-auto">
          <thead className="bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF] text-white text-xs sticky top-0">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap w-1/4">Name</th>
              <th className="px-3 py-3 whitespace-nowrap w-1/4">Visit</th>
              <th className="px-3 py-3 whitespace-nowrap w-1/4">Time</th>
              <th className="px-3 py-3 whitespace-nowrap text-center w-1/4">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          {!loading && patients.length > 0 && (
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b hover:bg-gray-50 gap-3">
                  <td className="px-3 py-1 font-medium whitespace-nowrap">{patient.name}
                    <span className="block text-[10px] text-gray-500">{patient.user_id}</span>
                  </td>
                  <td className="px-3 py-1 whitespace-nowrap">{patient.visit}</td>
                  <td className="px-3 py-1 whitespace-nowrap">{patient.time}</td>
                  <td className="px-3 py-1 text-center whitespace-nowrap">
                    <button
                      onClick={() => openCancelModal(patient)}
                      className="text-red-600 hover:text-red-800 font-bold text-lg"
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* 1. Loading UI Wrapper */}
      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-gray-400 font-medium">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4F6EEA] mb-2"></div>
          Loading appointments...
        </div>
      )}

      {/* 2. Dynamic Center Empty/Error Screen */}
      {!loading && (patients.length === 0 || error) && (
        <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
          <div className="bg-blue-50 p-6 rounded-full mb-4 flex items-center justify-center aspect-square shadow-sm">
            <FaCalendarXmark className="text-[#6FA8FF] text-6xl" />
          </div>
          <h3 className="text-[#2C3E50]  font-bold text-[12px] text-center">
            {error || "No Appointments Found"}
          </h3>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full mt-4 px-4 md:px-6 lg:px-0 lg:pr-4 box-border">
      <Table />

      <CancelAppointmentModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        patient={selectedPatient}
        removePatient={removePatient}
      />
    </div>
  );
}

export default CurrentPatientList;