import React, { useState } from "react";

function PatientsHistory() {
  const initialData = [
    { date: "12 Jan 2026", ApppId: "12278955", Doctr: "Dr.Prashnt Singh", status: "Confirmed" },
    { date: "05 Jan 2026", ApppId: "12278956", Doctr: "Dr.Ritesh", status: "Pending" },
    { date: "03 Jan 2026", ApppId: "12278957", Doctr: "Dr.Sharma", status: "Cancelled" },
    { date: "01 Jan 2026", ApppId: "12278958", Doctr: "Dr.Bharti", status: "Confirmed" },
    { date: "28 Dec 2025", ApppId: "12278959", Doctr: "Dr.Ritesh", status: "Pending" },
    { date: "25 Dec 2025", ApppId: "12278960", Doctr: "Dr.Sharma", status: "Confirmed" },
  ];

  const [actionData, setActionData] = useState(initialData.map(() => ({ cancelled: false })));

  const handleCancel = (index) => {
    const newActionData = [...actionData];
    newActionData[index].cancelled = true;
    setActionData(newActionData);
  };

  // Mobile me sirf 5 items show karne ke liye
  const mobileData = initialData.slice(0, 5);

  return (
   <div className="w-full rounded-md bg-white border border-gray-300 shadow-sm overflow-hidden">
      <h1 className="text-[10px] font-bold text-white text-center py-4 bg-[#4F6EEA] uppercase tracking-wider">
        Patient History
      </h1>

      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:block">
        <table className="w-full table-auto text-[12px]">
          <thead className="bg-gray-100 sticky top-0 z-10 shadow-sm">
            <tr className="text-black">
              <th className="px-1 py-2 text-center">S.No</th>
              <th className="px-1 py-2 text-center">Date/Time</th>
              <th className="px-1 py-2 text-center">App.ID</th>
              <th className="px-1 py-2 text-center">Doctor</th>
              <th className="px-1 py-2 text-center">Status</th>
              <th className="px-1 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "even:bg-gray-100 border-y border-gray-100"}>
                <td className="px-1 py-2 text-center font-medium">{index + 1}</td>
                <td className="px-1 py-2 text-center">{item.date}</td>
                <td className="px-1 py-2 text-center">{item.ApppId}</td>
                <td className="px-1 py-2 text-center">{item.Doctr}</td>
                <td className="px-1 py-2 text-center">
                  <span className={`px-1.5 py-0.5 font-bold rounded ${
                    item.status === "Confirmed" ? "bg-green-100 text-green-700" :
                    item.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-500 text-white"
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-1 py-2 text-center">
                  <button
                    onClick={() => handleCancel(index)}
                    className="px-1.5 py-0.5 font-bold text-white bg-red-500 rounded text-[10px]"
                  >
                    {actionData[index].cancelled ? "Done" : "Cancel"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE VIEW: 5 items without scroll --- */}
      <div className="md:hidden flex flex-col p-1.5 bg-gray-50 space-y-1">
        {mobileData.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-md px-2 py-1.5 shadow-sm">
            <div className="flex justify-between items-center border-b border-gray-50 pb-1 mb-1">
              <span className="text-[9px] font-bold text-gray-400">ID: {item.ApppId}</span>
              <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded-sm uppercase ${
                item.status === "Confirmed" ? "bg-green-100 text-green-700" : 
                item.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
              }`}>
                {item.status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="overflow-hidden">
                <h3 className="text-[10px] font-bold text-gray-800 truncate w-32">{item.Doctr}</h3>
                <p className="text-[8px] text-gray-400 leading-none">{item.date}</p>
              </div>
              <button
                onClick={() => handleCancel(index)}
                className="text-[9px] font-bold text-white bg-[#FF3B30] px-3 py-1 rounded shadow-sm"
              >
                {actionData[index].cancelled ? "Done" : "Cancel"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientsHistory;