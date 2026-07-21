import React, { useState } from "react";
import { cancelAppointment } from "../../../api/endpoints/authApi";
function CancelAppointment({ onClose, onCancelAppointment, patientName }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setISSuccess] = useState("false");

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Frontend Validation
    if (!reason.trim()) {
      setISSuccess(false);
      setMessage()
      return;
    }

    setLoading(true);

 try {
      const response = await onCancelAppointment(reason);

      if (response.success === 1) {
        setIsSuccess(true);
        setMessage(response.message);

        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setIsSuccess(false);
        setMessage(response.message);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-3">

      {/* Modal */}
      <div className="w-full max-w-lg bg-[#f3f3f3] border-4 border-orange-400 shadow-xl rounded-sm relative">

        {/* Header */}
        <div className="bg-white py-5 border-b border-gray-300 relative">
          <h2 className="text-center text-[28px] font-semibold tracking-wide text-[#2c4c73] uppercase">
            Cancel Appointment
          </h2>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-3 text-gray-500 hover:text-black text-2xl"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 sm:px-10 py-8">

          {/* Name */}
          <div className="flex flex-col sm:flex-row sm:items-center mb-5 gap-2">
            <label className="sm:w-28 text-[#4a5a75] text-lg">
              Name
            </label>

            <input
              type="text"
              value={patientName || ""}
              readOnly
              className="flex-1 h-11 border border-gray-300 bg-gray-100 px-3 text-gray-700 outline-none"
            />
          </div>

          {/* Reason */}
          <div className="flex flex-col sm:flex-row sm:items-center mb-8 gap-2">
            <label className="sm:w-28 text-[#4a5a75] text-lg">
              Reason
            </label>

            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason"
              className="flex-1 h-11 border border-gray-300 px-3 outline-none focus:border-orange-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 text-white text-lg rounded-sm shadow-md transition 
              ${loading
                  ? "bg-orange-300"
                  : "bg-orange-400 hover:bg-orange-500"
                }`}
            >
              {loading ? "Cancelling..." : "Cancel Appointment"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-[#8f79d9] hover:bg-[#7b63cb] text-white text-lg rounded-sm shadow-md transition"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CancelAppointment;