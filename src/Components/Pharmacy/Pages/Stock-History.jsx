import React, { useState } from 'react';
import { Search, Plus, } from 'lucide-react';
import AddMedicinePopup from '../PharmacyPopup/Add-Medicine-Popup';
import DeleteBatchPopup from '../PharmacyPopup/Delete-Batch-Popup';

const StockHistory = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletPopup, setDeletePopup] = useState(false)

  const data = [
    { sl: 461, name: 'LEFUMIDE 20', type: 'TAB', mrp: '218', gst: '28', discount: '', stockSold: '500 | 0', salePrice: '185' },
    { sl: 462, name: 'LEFUMIDE 10', type: 'TAB', mrp: '112', gst: '18', discount: '', stockSold: '500 | 0', salePrice: '95' },
  ];

  return (
    <div className="w-full h-[100vh]  md:h-auto    overflow-hidden ">
      <div className=" bg-white rounded-md shadow-sm border border-gray-200 p-6">

        {/* Header with Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-lg font-bold uppercase tracking-tight text-slate-700">
            Stock History
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsPopupOpen(true)}
              className="bg-[#26c281] hover:bg-[#21a870] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all shadow-sm"
            >
              <Plus size={16} strokeWidth={3} /> Add New Medicine
            </button>
            <button onClick={() => setDeletePopup(true)} className="bg-[#ff6f61] hover:bg-[#fa5a4b] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all shadow-sm">
              <Plus size={16} className="rotate-45" strokeWidth={3} /> Delete Batch
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="relative border border-gray-300 rounded-md p-6 mb-8 mt-4">
          <span className="absolute -top-3 left-4 bg-white px-2 text-sm font-bold text-orange-500 uppercase tracking-wide">
            Search Medicine
          </span>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Supplier:</label>
            <div className="flex flex-col md:flex-row gap-4">
              <select className="flex-grow border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-400 bg-white">
                <option>All</option>
              </select>
              <button className="bg-[#f6a96d] hover:bg-[#f49348] text-white px-8 py-2 rounded flex items-center justify-center gap-2 font-medium">
                <Search size={18} /> Search
              </button>
            </div>
          </div>
        </div>

        {/* Table Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select className="border border-gray-300 rounded px-1 py-1 outline-none"><option>10</option></select>
            <span>entries</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Search:</span>
            <input type="text" className="border border-gray-300 rounded px-2 py-1 outline-none" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-100 rounded">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-gray-50 text-xs font-bold text-gray-600 uppercase">
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 border-r border-gray-200 w-24">SL <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200">Medicine Name <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200">Type <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200">MRP <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200 text-center">Supplier Price <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200">GST% <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200 text-center">Discount(%)<br /><span className="text-[10px] lowercase font-normal">Supplier | Patient</span> <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200 text-center">Qty<br /><span className="text-[10px] lowercase font-normal">Stock | Sold</span> <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3">Sale Price <span className="float-right text-gray-300">⇅</span></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.map((row) => (
                <tr key={row.sl} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 border-r border-gray-50 flex items-center gap-2">
                    <button className="text-white bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">+</button>
                    {row.sl}
                  </td>
                  <td className="px-4 py-4 border-r border-gray-50 text-blue-500 hover:underline cursor-pointer">{row.name}</td>
                  <td className="px-4 py-4 border-r border-gray-50">{row.type}</td>
                  <td className="px-4 py-4 border-r border-gray-50">₹ {row.mrp}</td>
                  <td className="px-4 py-4 border-r border-gray-50"></td>
                  <td className="px-4 py-4 border-r border-gray-50">₹ {row.gst}</td>
                  <td className="px-4 py-4 border-r border-gray-50"></td>
                  <td className="px-4 py-4 border-r border-gray-50 text-center">{row.stockSold}</td>
                  <td className="px-4 py-4">₹ {row.salePrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer & Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <p className="text-sm text-gray-500">Showing 461 to 462 of 462 entries</p>
          <nav className="flex items-center -space-x-px text-sm">
            <button className="px-3 py-2 border border-gray-300 text-gray-400 rounded-l">Previous</button>
            <button className="px-3 py-2 border border-gray-300 hover:bg-gray-50">1</button>
            <span className="px-3 py-2 border border-gray-300 text-gray-400">...</span>
            <button className="px-3 py-2 border border-gray-300">43</button>
            <button className="px-3 py-2 border border-gray-300">44</button>
            <button className="px-3 py-2 border border-gray-300">45</button>
            <button className="px-3 py-2 border border-gray-300">46</button>
            <button className="px-3 py-2 border border-gray-300 bg-[#5c76d1] text-white font-bold">47</button>
            <button className="px-3 py-2 border border-gray-300 text-gray-400 rounded-r">Next</button>
          </nav>
        </div>
      </div>
      <AddMedicinePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
     <DeleteBatchPopup 
        isOpen={isDeletPopup} 
        onClose={() => setDeletePopup(false)}
        onDelete={() => {
          console.log("Batch Deleted");
          setDeletePopup(false); 
        }}
      />
    </div>
  );
};

export default StockHistory;