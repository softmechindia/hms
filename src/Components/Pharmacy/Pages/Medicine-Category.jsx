import React, { useState } from 'react';
import { Plus, Pencil, X } from 'lucide-react';
import AddMedicineCategoryPopup from '../PharmacyPopup/Medicine-Category-Popup';

const MedicineCategory = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const categories = [
    { sn: 1, name: 'Cardiovascular Agents', status: 'Active' },
    { sn: 2, name: 'Analgesics', status: 'Active' },
    { sn: 3, name: 'Anthelmintics', status: 'Active' },
    { sn: 4, name: 'Diuretics', status: 'Active' },
  ];

  return (
  <div className="w-full h-[100vh]  md:h-auto    overflow-hidden ">
      <div className=" bg-white rounded-md shadow-sm border border-gray-200 p-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text- font-roboto font-bold uppercase tracking-tight text-slate-700">
            Medicine Category
          </h2>
          <button onClick={() =>setIsOpenPopup(true)} className="bg-[#26c281] hover:bg-[#21a870] text-white px-5 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all shadow-sm">
            <Plus size={18} strokeWidth={3} /> Add Medicine Category
          </button>
        </div>

        {/* Search & Show Entries */}
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
            <input type="text" className="border border-gray-300 rounded px-2 py-1 outline-none" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-100 rounded">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-xs font-bold text-gray-600 uppercase">
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 border-r border-gray-200 w-24">SN. <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200">Category Name <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200 text-center">Status <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200 text-center">Change Status <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 text-center">Action <span className="float-right text-gray-300">⇅</span></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {categories.map((item) => (
                <tr key={item.sn} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 border-r border-gray-50">{item.sn}</td>
                  <td className="px-4 py-4 border-r border-gray-50">{item.name}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-center">
                    <span className="bg-[#d1fae5] text-[#10b981] px-3 py-1 rounded-full text-xs font-bold">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 border-r border-gray-50 text-center">
                    <button className="bg-[#fee2e2] text-[#f87171] px-3 py-1 rounded-full text-xs font-bold hover:bg-red-200 transition-colors">
                      Inactive
                    </button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center gap-4">
                      <button className="text-indigo-600 hover:text-indigo-800 transition-colors">
                        <Pencil size={18} />
                      </button>
                      <button className="text-red-400 hover:text-red-600 transition-colors">
                        <X size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <p className="text-sm text-gray-500 font-medium">Showing 1 to 4 of 4 entries</p>
          <nav className="flex items-center -space-x-px text-sm">
            <button className="px-3 py-2 border border-gray-300 text-gray-400 rounded-l cursor-not-allowed">Previous</button>
            <button className="px-3 py-2 border border-gray-300 bg-[#5c76d1] text-white font-bold">1</button>
            <button className="px-3 py-2 border border-gray-300 text-gray-400 rounded-r cursor-not-allowed">Next</button>
          </nav>
        </div>
      </div>

      <AddMedicineCategoryPopup isOpen={isOpenPopup}
      onClose={() => setIsOpenPopup(false)} />
    </div>
  );
};

export default MedicineCategory;