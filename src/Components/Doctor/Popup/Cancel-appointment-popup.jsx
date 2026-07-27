import React, { useEffect, useState } from "react";
import { DoctorCancelAppointment, GetCancelReasons } from "../../../api/endpoints/authApi";
import { X, AlertTriangle, User, Calendar, Clock } from "lucide-react";

export default function CancelAppointmentModal({
  isOpen = false,
  onClose,
  patient,
  removePatient,
  doctorId,
}) {
  const [reason, setReason] = useState("");
  const [additionalReason, setAdditionalReason] = useState("");
  const [reasonsList, setReasonsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch cancellation reasons when modal opens
  useEffect(() => {
    const fetchReasons = async () => {
      if (!isOpen) return;

      try {
        const res = await GetCancelReasons();
        const list = res?.fullData?.data || [];
        setReasonsList(list);
      } catch (error) {
        console.error("API ERROR (Reasons):", error);
        setReasonsList([]);
      }
    };

    fetchReasons();
  }, [isOpen]);

  // Handle actual cancellation API call
  const handleCancelSubmit = async () => {
    if (!reason || !patient) return;

    setIsLoading(true);
    try {

      const currentDoctorId = doctorId || localStorage.getItem("doctorId");

      const payload = {
        patient_id: patient.user_id || patient.id,
        appointment_id: patient.appointment_id || patient.id,
        cancel_reason: reason,
        additional_note: additionalReason,
        cancelled_by: currentDoctorId, 
      };

      console.log("SENDING PAYLOAD:", payload);

      const response = await DoctorCancelAppointment(payload);

      if (response && (response.status === true || response.success === 1)) {
        removePatient(patient.id);
        setReason("");
        setAdditionalReason("");
        onClose();
      } else {
        alert(response?.message || "Failed to cancel appointment");
      }
    } catch (err) {
      console.error("Failed to cancel appointment:", err);
      alert("Error cancelling appointment.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Cancel Appointment</h2>
              <p className="text-xs text-gray-500 mt-0.5">Please confirm cancellation of this appointment.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold tracking-wide text-blue-600">Patient Profile</span>
              <h3 className="font-semibold text-base text-gray-800">{patient?.name || "Unknown Patient"}</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 bg-slate-50">
              <Clock size={15} className="text-gray-500" />
              <div>
                <p className="text-[11px] text-gray-400">Visit Time</p>
                <p className="font-semibold text-sm text-gray-800">{patient?.visit || "--:--"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 bg-slate-50">
              <Calendar size={15} className="text-gray-500" />
              <div>
                <p className="text-[11px] text-gray-400">Appt. Time</p>
                <p className="font-semibold text-sm text-gray-800">{patient?.time || "--:--"}</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cancellation Reason <span className="text-red-500">*</span>
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-11 pl-4 pr-10 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            >
              <option value="">Select cancellation reason...</option>
              {reasonsList.map((item) => (
                <option key={item.id} value={item.reason_name}>{item.reason_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Reason <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              rows={3}
              value={additionalReason}
              onChange={(e) => setAdditionalReason(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl resize-none text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-3 px-5 pb-5">
          <button onClick={onClose} className="min-w-[110px] px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition">
            Close
          </button>
          <button
            onClick={handleCancelSubmit}
            disabled={!reason || isLoading}
            className="min-w-[190px] px-5 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 disabled:opacity-50 transition"
          >
            {isLoading ? "Processing..." : "Cancel Appointment"}
          </button>
        </div>
      </div>
    </div>
  );
}