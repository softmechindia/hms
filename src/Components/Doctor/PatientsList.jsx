import React, { useEffect, useState } from "react";
import CancelAppointmentModal from "../Doctor/Popup/Cancel-appointment-popup";
import { getCurrentAppointment } from "../../api/endpoints/authApi";

function PatientList({ doctorId = "DR0001" }) {
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

        const payload = { doctor_id: doctorId };
        const response = await getCurrentAppointment(payload);

        console.log("--- RAW PROXY RESPONSE ---", response);

        // Standardizing extraction from response.fullData or falling back directly to response
        const apiData = response?.fullData || response; 

        // If the proxy's internal catch-block triggered, intercept it here
        if (response && response.status === false) {
          setPatients([]);
          setError(response.message || "Request failed");
          return;
        }

        // Parse valid dataset matching your success response schema
        if (apiData && apiData.success === 1 && Array.isArray(apiData.data)) {
          const formattedPatients = apiData.data.map((item) => ({
            id: item.id,
            name: item.patient_name,
            visit: item.visit_time,
            time: item.appointment_time,
          }));

          setPatients(formattedPatients);
        } else {
          setPatients([]);
          setError(apiData?.message || response?.message || "No appointments found.");
        }
      } catch (err) {
        console.error("--- PatientList Component Catch Error ---", err);
        setError("An error occurred while fetching appointments.");
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchAppointments();
    }
  }, [doctorId]);

  // Remove patient state updater
  const removePatient = (id) => {
    setPatients((prevPatients) =>
      prevPatients.filter((patient) => patient.id !== id)
    );
    setShowCancelModal(false);
    setSelectedPatient(null);
  };

  // Modal display router
  const openCancelModal = (patient) => {
    setSelectedPatient(patient);
    setShowCancelModal(true);
  };

  // Cleaned up Table component view
  const Table = () => (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF] text-white text-xs">
          <tr>
            <th className="px-4 py-1 whitespace-nowrap">Name</th>
            <th className="px-3 py-1 whitespace-nowrap">Visit</th>
            <th className="px-3 py-1 whitespace-nowrap">Time</th>
            <th className="px-3 py-1 whitespace-nowrap text-center">Action</th>
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
                  onClick={() => openCancelModal(patient)}
                  className="text-red-600 hover:text-red-800 font-bold text-lg"
                >
                  &times;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="w-full mt-4 px-4 md:px-6 lg:px-0 lg:pr-4 box-border">
      <Table />

      {/* Rendered cleanly down here in the main return layout block */}
      <CancelAppointmentModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        patient={selectedPatient}
        removePatient={removePatient}
      />
    </div>
  );
}

export default PatientList;