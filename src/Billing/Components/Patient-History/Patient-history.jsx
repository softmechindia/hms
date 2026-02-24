import React, { useState } from "react";

function PatientsHistory() {
  const initialData = [
    { date: "12 Jan 2026", ApppId: "12278955", Doctr: "Dr.Prashnt Singh", status: "Cancel" },
    { date: "05 Jan 2026", ApppId: "12278955", Doctr: "Dr.Prashnt Singh", status: "Cancel" },
    { date: "03 Jan 2026", ApppId: "12278955", Doctr: "Dr.Prashnt Singh", status: "Cancel" },
    { date: "01 Jan 2026", ApppId: "12278955", Doctr: "Dr.Prashnt Singh", status: "Cancel" },
    { date: "28 Dec 2025", ApppId: "12278955", Doctr: "Dr.Prashnt Singh", status: "Cancel" },
    { date: "25 Dec 2025", ApppId: "12278955", Doctr: "Dr.Prashnt Singh", status: "Cancel" },
  ];

  const [data, setData] = useState(initialData);
  const visibleData = data.slice(0, 5); // Show only 5 rows

  const handleCancel = (index) => {
    // Example: Update status to "Cancelled"
    const newData = [...data];
    newData[index].status = "Cancelled";
    setData(newData);
    alert(`Appointment #${index + 1} cancelled!`);
  };

  return (
    <div className=" max-w-4xl ">
    

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white shadow  border border-gray-100">
          {/* Header */}
  <h1
  className="text-sm font-bold text-white text-center py-1 shadow-sm
             bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF]"
>
  Patient History
</h1>

        <table className="w-full text-sm text-left  ">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="px-1 py-1">S. No</th>
              <th className="px-1 py-1">Date/Time</th>
              <th className="px-1 py-1">App.ID</th>
              <th className="px-1 py-1">Doctor</th>
              <th className="px-1 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition cursor-pointer ">
                <td className="px-3 py-1">{index + 1}</td>
                <td className="px-3 py-1">{item.date}</td>
                <td className="px-3 py-1">{item.ApppId}</td>
                <td className="px-3 py-1">{item.Doctr}</td>
                <td className="px-3 py-1">
                  {item.status === "Cancel" ? (
                    <button
                      onClick={() => handleCancel(index)}
                      className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="px-2 py-0.5  text-xs font-semibold bg-green-100 text-green-700">
                      {item.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-2 ">
        {visibleData.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow  p-2 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-gray-700 text-sm">Visit #{index + 1}</span>
              {item.status === "Cancel" ? (
                <button
                  onClick={() => handleCancel(index)}
                  className="px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-red-500 hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  {item.status}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-gray-600 text-sm">
              <p>
                <span className="font-medium text-gray-800">Date:</span> {item.date}
              </p>
              <p>
                <span className="font-medium text-gray-800">Doctor:</span> {item.doctor}
              </p>
              <p>
                <span className="font-medium text-gray-800">Time :</span> {item.Time || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientsHistory;
