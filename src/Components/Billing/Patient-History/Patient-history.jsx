import React, { useState, useEffect } from "react";
import { searchHistory, cancelAppointment } from "../../../api/endpoints/authApi";

function PatientsHistory({ userID }) {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);

 
  const rowHeight = 40; 
  const totalVisibleRows = 7;
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
        const data = response?.fullData;
        if (data?.success === 1 && Array.isArray(data.history)) {
          setHistoryData(data.history);
        } else {
          setHistoryData([]);
        }
      } catch (err) {
        console.error("History fetch error:", err);
        setHistoryData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [userID]);

  const isCancellable = (vstatus) => {
    const s = (vstatus || "").toLowerCase();
    return s === "booking" || s === "confirmed" || s === "pending";
  };

  const handleCancel = async (item) => {
    if (!window.confirm(`Cancel appointment ${item.appointment_id}?`)) return;
    setCancellingId(item.appointment_id);
    try {
      const response = await cancelAppointment({ appointment_id: item.appointment_id });
      if (response?.status === true || response?.fullData?.success === 1) {
        setHistoryData((prev) =>
          prev.map((h) =>
            h.appointment_id === item.appointment_id ? { ...h, vstatus: "cancel" } : h
          )
        );
      } else {
        alert(response?.message || "Could not cancel appointment.");
      }
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Something went wrong.");
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusBadge = (vstatus) => {
    const s = (vstatus || "").toLowerCase();
    if (s === "booking" || s === "pending") return "bg-yellow-100 text-yellow-700";
    if (s === "complete" || s === "confirmed") return "bg-green-100 text-green-700";
    if (s === "cancel" || s === "cancelled") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-600";
  };

  const displayStatus = (vstatus) => {
    if (!vstatus) return "—";
    return vstatus.charAt(0).toUpperCase() + vstatus.slice(1);
  };

  return (
    <div className="w-full rounded-md bg-white border border-gray-300 shadow-sm overflow-hidden flex flex-col">
      <h1 className="text-[10px] font-bold text-white text-center py-4 bg-[#4F6EEA] uppercase tracking-wider shrink-0">
        Patient History
      </h1>

      {/* Main Content Area with Fixed Height */}
      <div 
        className="relative overflow-hidden" 
        style={{ height: `${contentHeight}px` }}
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-20">
             <p className="text-xs text-gray-400">Loading...</p>
          </div>
        ) : !userID ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-20">
             <p className="text-xs text-gray-400 px-4 text-center">Search and select a patient to view history.</p>
          </div>
        ) : historyData.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-20">
             <p className="text-xs text-gray-400">No history found.</p>
          </div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden md:block">
              <table className="w-full table-fixed text-[12px]">
                <thead className="bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
                  <tr className="text-black">
                    <th className="w-[8%] py-2 text-center">S.No</th>
                    <th className="w-[15%] py-2 text-center">Date</th>
                    <th className="w-[15%] py-2 text-center">Time</th>
                    <th className="w-[18%] py-2 text-center">App.ID</th>
                    <th className="w-[20%] py-2 text-center">Doctor</th>
                    <th className="w-[12%] py-2 text-center">Status</th>
                    <th className="w-[12%] py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.map((item, index) => {
                    const cancellable = isCancellable(item.vstatus);
                    const isBusy = cancellingId === item.appointment_id;
                    return (
                      <tr
                        key={item.appointment_id || index}
                        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-100 items-center`}
                        style={{ height: `${rowHeight}px` }}
                      >
                        <td className="text-center font-medium">{index + 1}</td>
                        <td className="text-center truncate">{item.appointment_date || "—"}</td>
                        <td className="text-center truncate">{item.appointment_time || "—"}</td>
                        <td className="text-center truncate">{item.appointment_id}</td>
                        <td className="text-center truncate px-1">{item.doctor_id || "—"}</td>
                        <td className="text-center">
                          <span className={`px-1.5 py-0.5 font-bold rounded text-[10px] ${getStatusBadge(item.vstatus)}`}>
                            {displayStatus(item.vstatus)}
                          </span>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => cancellable && handleCancel(item)}
                            disabled={!cancellable || isBusy}
                            className={`px-1.5 py-0.5 font-bold text-white rounded text-[10px] ${
                              cancellable && !isBusy ? "bg-red-500 hover:bg-red-600" : "bg-red-300 opacity-60 cursor-not-allowed"
                            }`}
                          >
                            {isBusy ? "..." : "Cancel"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden flex flex-col p-1.5 bg-gray-50 space-y-1">
              {historyData.map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-md px-2 py-1 shadow-sm">
                   <div className="flex justify-between">
                      <span className="text-[9px] font-bold">ID: {item.appointment_id}</span>
                      <span className={`px-1 text-[8px] rounded ${getStatusBadge(item.vstatus)}`}>{displayStatus(item.vstatus)}</span>
                   </div>
                   <p className="text-[9px] text-gray-500">{item.doctor_id} | {item.appointment_time}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PatientsHistory;