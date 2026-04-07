import React, { useState } from 'react';
import { Plus, Pencil, X } from 'lucide-react';
import AddMedicineGenericPopup from '../PharmacyPopup/Add-Medicine-Generic-Popup';
const MedicineGenericName = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const generics = [
    { sn: 1, name: 'ACECLOFENAC+CHLORZOXAZONE+PCM', status: 'Active' },
    { sn: 2, name: 'ACECLOFENAC+PARACETAMOL', status: 'Active' },
    { sn: 3, name: 'ADALIMUMAB', status: 'Active' },
    { sn: 4, name: 'ALA+CHROMIUM+BENFOTIAMINE+MULTIVIT', status: 'Active' },
    { sn: 5, name: 'ALBENDAZOLE ALBENDAZOLE', status: 'Active' },
    { sn: 6, name: 'ALBENDAZOLE', status: 'Active' },
    { sn: 7, name: 'ALENDRONATE', status: 'Active' },
    { sn: 8, name: 'ALLOPURINOL', status: 'Active' },
    { sn: 9, name: 'AMLODIPINE', status: 'Active' },
    { sn: 10, name: 'AMLODIPINE+ATENOLOL', status: 'Active' },
  ];

  return (
      <div className="w-full h-[100vh]   md:h-auto   overflow-hidden ">
      <div className=" bg-white rounded-md shadow-sm border border-gray-200 p-6">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-lg font-roboto font-bold uppercase tracking-tight text-slate-700">
            Medicine Generic Name
          </h2>
          <button onClick={() => setIsPopupOpen(true)} className="bg-[#26c281] hover:bg-[#21a870] text-white px-5 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all shadow-sm">
            <Plus size={18} strokeWidth={3} /> Add Medicine Generic Name
          </button>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select className="border border-gray-300 rounded px-1 py-1 outline-none">
              <option>10</option>
            </select>
            <span>entries</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Search:</span>
            <input type="text" className="border border-gray-300 rounded px-2 py-1 outline-none w-full md:w-80" />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto border border-gray-100 rounded">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-xs font-bold text-gray-600 uppercase">
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 border-r border-gray-200 w-24">SN. <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200">Generic Name <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200 text-center">Status <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200 text-center">Change Status <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 text-center">Action <span className="float-right text-gray-300">⇅</span></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {generics.map((item) => (
                <tr key={item.sn} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 border-r border-gray-50">{item.sn}</td>
                  <td className="px-4 py-4 border-r border-gray-50 font-medium text-slate-600 uppercase">
                    {item.name}
                  </td>
                  <td className="px-4 py-4 border-r border-gray-50 text-center">
                    <span className="bg-[#d1fae5] text-[#10b981] px-3 py-1 rounded-full text-xs font-bold">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 border-r border-gray-50 text-center">
                    <button className="bg-[#fee2e2] text-[#f87171] px-4 py-1 rounded-full text-xs font-bold hover:bg-red-100 transition-colors border border-red-100">
                      Change Status
                    </button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center gap-6">
                      <button className="text-indigo-600 hover:text-indigo-800 transition-colors">
                        <Pencil size={18} strokeWidth={2.5} />
                      </button>
                      <button className="text-red-400 hover:text-red-600 transition-colors">
                        <X size={20} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Expanded Pagination Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <p className="text-sm text-gray-500 font-medium">Showing 1 to 10 of 330 entries</p>
          <nav className="flex items-center text-sm shadow-sm rounded border border-gray-300">
            <button className="px-3 py-2 border-r border-gray-300 text-gray-400 hover:bg-gray-50">Previous</button>
            <button className="px-4 py-2 border-r border-gray-300 bg-[#5c76d1] text-white font-bold">1</button>
            <button className="px-4 py-2 border-r border-gray-300 hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border-r border-gray-300 hover:bg-gray-50">3</button>
            <button className="px-4 py-2 border-r border-gray-300 hover:bg-gray-50">4</button>
            <button className="px-4 py-2 border-r border-gray-300 hover:bg-gray-50">5</button>
            <span className="px-4 py-2 border-r border-gray-300 text-gray-400">...</span>
            <button className="px-4 py-2 border-r border-gray-300 hover:bg-gray-50">33</button>
            <button className="px-3 py-2 hover:bg-gray-50">Next</button>
          </nav>
        </div>
      </div>

      <AddMedicineGenericPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={() => {
          
          setIsPopupOpen(false);
        }}
      />
    </div>
  );
};

export default MedicineGenericName;