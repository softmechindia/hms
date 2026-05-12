import React, { useState, useEffect } from "react";
import { searchHistory, cancelAppointment } from "../../../api/endpoints/authApi";
import CancelAppointment from "../Popup/Cancel-Appointment";

function PatientsHistory({ userID }) {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);

  // Popup states
  const [showCancelPopup, setShowCancelPopup] =
    useState(false);

  const [selectedAppointment, setSelectedAppointment] =
    useState(null);

  // Table height
  const rowHeight = 40;
  const totalVisibleRows = 6;
  const contentHeight =
    rowHeight * totalVisibleRows;

  // Fetch History
  useEffect(() => {
    if (!userID) {
      setHistoryData([]);
      return;
    }

    const fetchHistory = async () => {
      setLoading(true);

      try {
        const response =
          await searchHistory({
            search_by: userID,
          });

        const data = response?.fullData;

        if (
          data?.success === 1 &&
          Array.isArray(data.history)
        ) {
          setHistoryData(data.history);
        } else {
          setHistoryData([]);
        }
      } catch (err) {
        console.error(
          "History fetch error:",
          err
        );
        setHistoryData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userID]);

  // Check cancellable
  const isCancellable = (vstatus) => {
    const s = (
      vstatus || ""
    ).toLowerCase();

    return (
      s === "booking" ||
      s === "confirmed" ||
      s === "pending"
    );
  };

  // Open popup
  const handleCancel = (item) => {
    setSelectedAppointment(item);
    setShowCancelPopup(true);
  };

  // REAL CANCEL API
  const confirmCancelAppointment =
    async (reason) => {
      if (!selectedAppointment) return;

      setCancellingId(
        selectedAppointment.appointment_id
      );

      try {
        // API Payload
        const payload = {
          appointment_id:
            selectedAppointment.appointment_id,

          patient_id: userID,

          reason: reason,

          cancelled_by: "ST0001",
        };

        console.log(
          "Cancel Payload:",
          payload
        );

        // API CALL
        const response =
          await cancelAppointment(payload);

        console.log(
          "Cancel Response:",
          response
        );

        const data =
          response?.fullData || response;

        // SUCCESS
        if (data?.success === 1) {
          // Update UI
          setHistoryData((prev) =>
            prev.map((h) =>
              h.appointment_id ===
              selectedAppointment.appointment_id
                ? {
                    ...h,
                    vstatus: "cancel",
                    cancel_reason:
                      reason,
                  }
                : h
            )
          );

          alert(
            data?.message ||
              "Appointment cancelled successfully"
          );

          // Close popup
          setShowCancelPopup(false);

          setSelectedAppointment(
            null
          );
        } else {
          alert(
            data?.message ||
              "Unable to cancel appointment"
          );
        }
      } catch (err) {
        console.error(
          "Cancel error:",
          err
        );

        alert(
          "Something went wrong"
        );
      } finally {
        setCancellingId(null);
      }
    };

  // Status badge
  const getStatusBadge = (vstatus) => {
    const s = (
      vstatus || ""
    ).toLowerCase();

    if (
      s === "booking" ||
      s === "pending"
    ) {
      return "bg-yellow-100 text-yellow-700";
    }

    if (
      s === "complete" ||
      s === "confirmed"
    ) {
      return "bg-green-100 text-green-700";
    }

    if (
      s === "cancel" ||
      s === "cancelled"
    ) {
      return "bg-red-100 text-red-700";
    }

    return "bg-gray-100 text-gray-600";
  };

  return (
    <>
      <div className="w-full rounded-md bg-white border border-gray-300 shadow-sm overflow-hidden flex flex-col">
        
        {/* Header */}
        <h1 className="text-[10px] font-bold text-white text-center py-4 bg-[#4F6EEA] uppercase tracking-wider shrink-0">
          Patient History
        </h1>

        {/* Table Area */}
        <div
          className="relative overflow-hidden"
          style={{
            height: `${contentHeight}px`,
          }}
        >
          {/* Loading */}
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <p className="text-xs text-gray-400">
                Loading...
              </p>
            </div>
          ) : !userID ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <p className="text-xs text-gray-400 px-4 text-center">
                Search and select a
                patient to view history.
              </p>
            </div>
          ) : historyData.length ===
            0 ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <p className="text-xs text-gray-400">
                No history found.
              </p>
            </div>
          ) : (
            <div className="hidden md:block">
              <table className="w-full table-fixed text-[12px]">
                
                {/* Head */}
                <thead className="bg-gray-100 border-b border-gray-200 sticky top-0">
                  <tr className="text-black">
                    <th className="w-[8%] py-2 text-center">
                      S.No
                    </th>

                    <th className="w-[15%] py-2 text-center">
                      Date
                    </th>

                    <th className="w-[15%] py-2 text-center">
                      Time
                    </th>

                    <th className="w-[18%] py-2 text-center">
                      App.ID
                    </th>

                    <th className="w-[20%] py-2 text-center">
                      Doctor
                    </th>

                    <th className="w-[12%] py-2 text-center">
                      Status
                    </th>

                    <th className="w-[12%] py-2 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {historyData.map(
                    (item, index) => (
                      <tr
                        key={
                          item.appointment_id ||
                          index
                        }
                        className={`${
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-gray-50"
                        } border-b border-gray-100`}
                        style={{
                          height: `${rowHeight}px`,
                        }}
                      >
                        {/* S.No */}
                        <td className="text-center font-medium">
                          {index + 1}
                        </td>

                        {/* Date */}
                        <td className="text-center truncate">
                          {
                            item.appointment_date
                          }
                        </td>

                        {/* Time */}
                        <td className="text-center truncate">
                          {
                            item.appointment_time
                          }
                        </td>

                        {/* Appointment ID */}
                        <td className="text-center truncate">
                          {
                            item.appointment_id
                          }
                        </td>

                        {/* Doctor */}
                        <td className="text-center truncate px-1">
                          {
                            item.doctor_name
                          }
                        </td>

                        {/* Status */}
                        <td className="text-center">
                          <span
                            className={`px-1.5 py-0.5 font-bold rounded text-[10px] ${getStatusBadge(
                              item.vstatus
                            )}`}
                          >
                            {item.vstatus ||
                              "N/A"}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="text-center">
                          <button
                            onClick={() =>
                              isCancellable(
                                item.vstatus
                              ) &&
                              handleCancel(
                                item
                              )
                            }
                            disabled={
                              !isCancellable(
                                item.vstatus
                              ) ||
                              cancellingId ===
                                item.appointment_id
                            }
                            className={`px-2 py-1 rounded text-white text-[10px] font-bold transition ${
                              isCancellable(
                                item.vstatus
                              )
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-red-300 opacity-60 cursor-not-allowed"
                            }`}
                          >
                            {cancellingId ===
                            item.appointment_id
                              ? "..."
                              : "Cancel"}
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Popup */}
      {showCancelPopup && (
        <CancelAppointment
          onClose={() => {
            setShowCancelPopup(false);
            setSelectedAppointment(
              null
            );
          }}
          onCancelAppointment={
            confirmCancelAppointment
          }
          patientName={
            selectedAppointment?.doctor_name ||
            ""
          }
        />
      )}
    </>
  );
}

export default PatientsHistory;