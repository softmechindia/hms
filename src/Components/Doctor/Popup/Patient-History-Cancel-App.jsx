import React, { useState } from "react";
import { cancelAppointment } from "../../../api/endpoints/authApi";

function PatientHistoryCancelPopup({ onClose, onSuccess, appointment, userID,patientName }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

const displayName =
    patientName ||
    appointment?.patient_name ||
    appointment?.user_name ||
    "";
    


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim() || !appointment) return;

    const appId = appointment.appointment_id || appointment.id;
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const payload = {
        appointment_id: appId,
        patient_id: userID,
        reason: reason,
        cancelled_by: "ST0001",
      };

      const response = await cancelAppointment(payload);
      const data = response?.fullData || response;

      if (data?.success === 1 || data?.success === "1") {
        const msg = data?.message || "Appointment cancelled successfully";
        setSuccessMsg(msg);

        setTimeout(() => {
          onSuccess(appId, reason, msg);
        }, 1500);
      } else {
        setErrorMsg(data?.message || "Unable to cancel appointment");
      }
    } catch (err) {
      console.error("Cancel error:", err);
      setErrorMsg("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
      <div className="w-full max-w-[480px] bg-[#F4F5F7] rounded-sm shadow-xl border border-gray-200 overflow-hidden text-[#475569]">
        
        {/* Header - Perfectly Centered Title and Messages */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 relative flex flex-col items-center justify-center text-center">
          
          <h2 className="text-[17px] font-bold text-[#234E82] tracking-wide uppercase">
            CANCEL APPOINTMENT
          </h2>

          {/* Success Banner (Centered below heading) */}
          {successMsg && (
            <div>
              <p className="text-[15px] font-semibold text-green-600">{successMsg}</p>
            </div>
          )}

          {/* Error Banner (Centered below heading) */}
          {errorMsg && (
            <div >
              <p className="text-[15px] font-semibold text-red-600">{errorMsg}</p>
            </div>
          )}

          <button
            onClick={onClose}
            type="button"
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-base font-light leading-none"
          >
            &#10005;
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="px-10 py-8">
          
          {/* Name Field */}
          <div className="flex items-center mb-5">
            <label className="w-24 text-[13px] font-medium text-[#5B6B7C]">
              Name
            </label>
            <input
              type="text"
              readOnly
              value={displayName}
              className="flex-1 bg-[#EFF2F5] border border-[#CBD5E1] rounded-[2px] px-3 py-2 text-[13px] text-[#334155] focus:outline-none"
            />
          </div>

          {/* Reason Field */}
          <div className="flex items-center mb-8">
            <label className="w-24 text-[13px] font-medium text-[#5B6B7C]">
              Reason
            </label>
            <input
              type="text"
              placeholder="Enter reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={!!successMsg}
              className="flex-1 bg-[#EFF2F5] border border-[#CBD5E1] rounded-[2px] px-3 py-2 text-[13px] text-[#334155] placeholder-gray-400 focus:outline-none focus:border-[#3B82F6]"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="submit"
              disabled={loading || !reason.trim() || !!successMsg}
              className="px-5 py-2.5 rounded-[4px] bg-[#FF8A00] hover:bg-[#E07A00] text-white text-[13px] font-medium transition shadow-sm disabled:opacity-60"
            >
              {loading ? "Cancelling..." : "Cancel Appointment"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2.5 rounded-[4px] bg-[#8A79E6] hover:bg-[#7866DB] text-white text-[13px] font-medium transition shadow-sm"
            >
              Close
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default PatientHistoryCancelPopup;