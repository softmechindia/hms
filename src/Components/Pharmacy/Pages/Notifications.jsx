import React, { useState } from 'react';

const MedicineNotification = () => {
  // Mock data representing the table entries
  const [data] = useState([
    { sn: 71, medicine: 'XT TOPFENAC', batch: '', notification: 'This medicine remaining only 40 unit in stock.' },
    { sn: 72, medicine: 'EMPUJES', batch: '', notification: 'This medicine remaining only 0 unit in stock.' },
    { sn: 73, medicine: 'AVOCOZA FORTE', batch: '', notification: 'This medicine remaining only 0 unit in stock.' },
    { sn: 74, medicine: 'GI IMMUNE', batch: '', notification: 'This medicine remaining only 90 unit in stock.' },
    { sn: 75, medicine: 'SURBEX GOLD', batch: '', notification: 'This medicine remaining only 45 unit in stock.' },
  ]);

  return (
    <div className="h-[100vh]">
      <div className="max-w-6xl mx-auto bg-white rounded shadow-sm border border-gray-200">
        
        {/* Header Section */}
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold uppercase tracking-wide text-slate-600">
            Medicine Notification
          </h2>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span>Show</span>
            <select className="border border-gray-300 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-400">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>entries</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span>Search:</span>
            <input 
              type="text" 
              className="border border-gray-300 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-y border-gray-200 text-sm font-semibold text-gray-600">
                <th className="px-4 py-3 border-r border-gray-100 w-20">
                  <div className="flex justify-between items-center cursor-pointer">
                    SN. <span className="text-[10px] text-gray-300">⇅</span>
                  </div>
                </th>
                <th className="px-4 py-3 border-r border-gray-100">
                  <div className="flex justify-between items-center cursor-pointer">
                    Medicine <span className="text-[10px] text-gray-300">⇅</span>
                  </div>
                </th>
                <th className="px-4 py-3 border-r border-gray-100">
                  <div className="flex justify-between items-center cursor-pointer">
                    Batch No. <span className="text-[10px] text-gray-300">⇅</span>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex justify-between items-center cursor-pointer">
                    Notification <span className="text-[10px] text-gray-300">⇅</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 border-r border-gray-50">{item.sn}</td>
                  <td className="px-4 py-3 border-r border-gray-50">{item.medicine}</td>
                  <td className="px-4 py-3 border-r border-gray-50">{item.batch}</td>
                  <td className="px-4 py-3">{item.notification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination Section */}
        <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4">
          <p className="text-sm text-gray-600 font-medium">
            Showing 71 to 75 of 75 entries
          </p>
          
          <nav className="flex items-center -space-x-px text-sm">
            <button className="px-3 py-2 rounded-l border border-gray-300 text-gray-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-2 border border-gray-300 hover:bg-gray-100">1</button>
            <span className="px-3 py-2 border border-gray-300 text-gray-400">...</span>
            <button className="px-3 py-2 border border-gray-300 hover:bg-gray-100">4</button>
            <button className="px-3 py-2 border border-gray-300 hover:bg-gray-100">5</button>
            <button className="px-3 py-2 border border-gray-300 hover:bg-gray-100">6</button>
            <button className="px-3 py-2 border border-gray-300 hover:bg-gray-100">7</button>
            <button className="px-3 py-2 border border-gray-300 bg-indigo-600 text-white font-bold">8</button>
            <button className="px-3 py-2 rounded-r border border-gray-300 text-gray-400 cursor-not-allowed">Next</button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MedicineNotification;