import React, { useState } from "react";

function PatientsHistory() {
  const initialData = [
    { date: "12 Jan 2026", ApppId: "12278955", Doctr: "Dr.Prashnt Singh", status: "Confirmed" },

    { date: "05 Jan 2026", ApppId: "12278955", Doctr: "Dr.Prashnt Singh", status: "Pending" },

    { date: "03 Jan 2026", ApppId: "12278955", Doctr: "Dr.Prashnt Singh", status: "Cancelled" },

    { date: "01 Jan 2026", ApppId: "12278955", Doctr: "Dr.Prashnt Singh", status: "Confirmed" },

    { date: "28 Dec 2025", ApppId: "12278955", Doctr: "Dr.Prashnt Singh", status: "Pending" },

    { date: "01 Jan 2026", ApppId: "12278955", Doctr: "Dr.Prashnt Singh", status: "Confirmed" },
  ];

  // State for status
  const [statusData, setStatusData] = useState(initialData);

  // State for action buttons (to handle independent actions)
  const [actionData, setActionData] = useState(initialData.map(() => ({ cancelled: false })));

  const handleCancel = (index) => {
    // Update action only
    const newActionData = [...actionData];
    newActionData[index].cancelled = true;
    setActionData(newActionData);
    alert(`Action Cancelled for Appointment #${index + 1}`);
  };

  return (
    <div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white shadow border border-gray-100">
        <h1 className="text-md text-white text-center py-2 shadow-sm bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF]">
          Patient History
        </h1>

        <table className="w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-2 py-1 text-center">S. No</th>
              <th className="px-2 py-1  text-center">Date/Time</th>
              <th className="px-2 py-1  text-center">App.ID</th>
              <th className="px-2 py-1  text-center">Doctor</th>
              <th className="px-2 py-1  text-center">Status</th>
              <th className="px-2 py-1  text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {statusData.map((item, index) => (
              <tr
                key={index}
                className={`transition cursor-pointer ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } hover:bg-blue-100`}
              >
                <td className="px-2 py-1  text-center">{index + 1}</td>
                <td className="px-2 py-1  text-center">{item.date}</td>
                <td className="px-2 py-1  text-center">{item.ApppId}</td>
                <td className="px-2 py-1  text-center">{item.Doctr}</td>

                {/* Status Column */}
                <td className="px-2 py-1  text-center">
                  {item.status === "Confirmed" && (
                    <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded">
                      Confirmed
                    </span>
                  )}
                  {item.status === "Pending" && (
                    <span className="px-2 py-1  text-xs font-semibold bg-yellow-100 text-yellow-700 rounded">
                      Pending
                    </span>
                  )}
                  {item.status === "Cancelled" && (
                    <span className="px-2 py-1  text-xs font-semibold bg-red-500 text-white rounded">
                      Cancelled
                    </span>
                  )}
                </td>

                {/* Actions Column */}
                <td className="px-2 py-2  text-center">
                  {actionData[index].cancelled ? (
                    <span className="px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-600 rounded">
                      Cancelled
                    </span>
                  ) : (
                    <button
                      onClick={() => handleCancel(index)}
                      className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-3">
        {statusData.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow p-3 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700 text-sm">
                Visit #{index + 1}
              </span>

              {actionData[index].cancelled ? (
                <span className="px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-600 rounded">
                  Cancelled
                </span>
              ) : (
                <button
                  onClick={() => handleCancel(index)}
                  className="px-4 py-1 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-gray-600 text-sm">
              <p>
                <span className="font-medium  text-gray-800">Date:</span> {item.date}
              </p>
              <p>
                <span className="font-medium text-gray-800">Doctor:</span> {item.Doctr}
              </p>
              <p>
                <span className="font-medium text-gray-800">App.ID:</span> {item.ApppId}
              </p>
              <p>
                <span className="font-medium text-gray-800">Status:</span>{" "}
                <span
                  className={`ml-1 px-2 py-0.5 rounded text-xs font-semibold
                    ${
                      item.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {item.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientsHistory;