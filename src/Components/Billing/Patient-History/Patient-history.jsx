import React, { useState, useEffect } from "react";
import { searchHistory, cancelAppointment } from "../../../api/endpoints/authApi";
import CancelAppointment from "../Popup/Cancel-Appointment";
import { Clock } from "lucide-react";
import PatientHistorySkeleton from "../Loaders/Patient-History-Skelton";

function PatientsHistory({ userID, refreshKey, onHistoryLoaded, onCancelSuccess }) {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);

  // Popup states
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const rowHeight = 40;
  const totalVisibleRows = 6;
  const contentHeight = rowHeight * totalVisibleRows;

  useEffect(() => {
    if (!userID) {
      setHistoryData([]);
      return;
    }

    const fetchHistory = async () => {
      setLoading(true);

      try {
        const response = await searchHistory({ search_by: userID });
        
        const rawData = response?.fullData || response;
        
        
        let list = [];

        if (Array.isArray(rawData?.user_data) && rawData.user_data.length > 0) {
          list = rawData.user_data[0]?.history || [];
        } else if (Array.isArray(rawData?.history)) {
          list = rawData.history;
        } else if (Array.isArray(rawData?.data)) {
          list = rawData.data;
        } else if (Array.isArray(rawData)) {
          list = rawData;
        }

        setHistoryData(list);
        if (onHistoryLoaded) onHistoryLoaded(list);
      } catch (err) {
        console.error("History fetch error:", err);
        setHistoryData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userID, refreshKey]);

  const isCancellable = (vstatus) => {
    const s = (vstatus || "").toLowerCase();
    return s === "booking" || s === "confirmed" || s === "pending";
  };

  const handleCancel = (item) => {
    setSelectedAppointment(item);
    setShowCancelPopup(true);
  };

  const confirmCancelAppointment = async (reason) => {
    if (!selectedAppointment) return;

    const appId = selectedAppointment.appointment_id || selectedAppointment.id;
    setCancellingId(appId);

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
        const updatedList = historyData.map((h) => {
          const currentId = h.appointment_id || h.id;
          return currentId === appId
            ? { ...h, vstatus: "cancel", status: "cancel", cancel_reason: reason }
            : h;
        });

        setHistoryData(updatedList);

        // notify parent so it re-checks hasTodayAppointment
        if (onCancelSuccess) onCancelSuccess(updatedList);

        alert(data?.message || "Appointment cancelled successfully");
        setShowCancelPopup(false);
        setSelectedAppointment(null);
      } else {
        alert(data?.message || "Unable to cancel appointment");
      }
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Something went wrong");
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusBadge = (vstatus) => {
    const s = (vstatus || "").toLowerCase();

    if (s === "booking" || s === "pending") return "bg-yellow-100 text-yellow-700";
    if (s === "complete" || s === "confirmed") return "bg-green-100 text-green-700";
    if (s === "cancel" || s === "cancelled") return "bg-red-100 text-red-700";

    return "bg-gray-100 text-gray-700";
  };

  return (
    <>
      <div className="w-full rounded-md bg-white border border-gray-300 shadow-sm overflow-hidden flex flex-col">
        <h1 className="text-[12px] font-bold text-white text-center py-4 bg-[#4F6EEA] tracking-wider shrink-0">
          Patient History
        </h1>

        <div className="relative overflow-hidden" style={{ height: `${contentHeight}px` }}>
          {!userID ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <p className="text-xs text-gray-400 px-4 text-center">
                Search and select a patient to view history.
              </p>
            </div>
          ) : (
            <div className="h-full overflow-y-auto">
              <table className="w-full table-fixed text-[12px]">
                <thead className="bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
                  <tr className="text-black">
                    <th className="w-[8%] py-2 text-center">S.No</th>
                    <th className="w-[20%] py-2 text-center">Date</th>
                    <th className="w-[22%] py-2 text-center">App.ID</th>
                    <th className="w-[20%] py-2 text-center">Doctor</th>
                    <th className="w-[15%] py-2 text-center">Status</th>
                    <th className="w-[15%] py-2 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <PatientHistorySkeleton rows={6} />
                  ) : historyData.length > 0 ? (
                    historyData.map((item, index) => {
                      const appId = item.appointment_id || item.id || "N/A";
                      const date = item.appointment_date || item.date || "N/A";
                      const time = item.appointment_time || item.time || "";
                      const doc = item.doctor_name || item.doctor_id || item.doctor || "N/A";
                      const status = item.vstatus || item.status || "N/A";

                      return (
                        <tr
                          key={appId !== "N/A" ? appId : index}
                          className={`${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          } border-b border-gray-100`}
                          style={{ height: `${rowHeight}px` }}
                        >
                          <td className="text-center font-medium">{index + 1}</td>
                          <td className="text-center">
                            <div className="flex flex-col items-center leading-tight">
                              <span className="font-medium">{date}</span>
                              {time && (
                                <span className="flex items-center gap-1 text-[10px] text-gray-500 mt-0.5">
                                  <Clock size={10} />
                                  {time}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="text-center truncate">{appId}</td>
                          <td className="text-center truncate px-1">{doc}</td>
                          <td className="text-center">
                            <span
                              className={`px-1.5 py-0.5 font-bold rounded text-[10px] uppercase ${getStatusBadge(
                                status
                              )}`}
                            >
                              {status}
                            </span>
                          </td>
                          <td className="text-center">
                            <button
                              onClick={() => isCancellable(status) && handleCancel(item)}
                              disabled={!isCancellable(status) || cancellingId === appId}
                              className={`px-2 py-1 rounded text-white text-[10px] font-bold transition ${
                                isCancellable(status)
                                  ? "bg-red-500 hover:bg-red-600 cursor-pointer"
                                  : "bg-gray-400 opacity-60 cursor-not-allowed"
                              }`}
                            >
                              {cancellingId === appId ? "..." : "Cancel"}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-gray-400 text-xs">
                        No history found for this patient.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showCancelPopup && (
        <CancelAppointment
          onClose={() => {
            setShowCancelPopup(false);
            setSelectedAppointment(null);
          }}
          onCancelAppointment={confirmCancelAppointment}
          patientName={selectedAppointment?.doctor_name || ""}
        />
      )}
    </>
  );
}

export default PatientsHistory;