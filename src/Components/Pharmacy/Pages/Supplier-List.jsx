import React, { useState } from 'react';
import { Plus, Pencil, X, ChevronUp, ChevronDown } from 'lucide-react';
import SupplierListPopup from "../PharmacyPopup/Supplier-List-Popup";
const SupplierList = () => {
    const[isSupplierOpen, setIsSupplierOpen] = useState(false);
  const suppliers = [
    { sn: 1, name: 'Test', email: 'test@gmail.com', contact: '7289808547', address: 'Noida', status: 'Active' },
    { sn: 2, name: 'ad kr2', email: '', contact: '', address: '', status: 'Active' },
    { sn: 3, name: 'SAI TRADERS', email: '', contact: '', address: '', status: 'Active' },
    { sn: 4, name: 'CONSERN PHARMA LIMITED', email: '', contact: '', address: '', status: 'Active' },
    { sn: 5, name: 'GANPATI TRADER', email: '', contact: '', address: '', status: 'Active' },
    { sn: 6, name: 'ORGANIC LABS P LTD', email: '', contact: '', address: '', status: 'Active' },
    { sn: 7, name: 'CHEAP MEDICAL AGENCIES', email: '', contact: '', address: '', status: 'Active' },
    { sn: 8, name: 'SANDEEP MEDICAL', email: '', contact: '', address: '', status: 'Active' },
    { sn: 9, name: 'AAREEN', email: '', contact: '', address: '', status: 'Active' },
    { sn: 10, name: 'IPCA', email: '', contact: '', address: '', status: 'Active' },
  ];

  const SortArrows = () => (
    <div className="flex flex-col ml-auto text-gray-300 scale-75">
      <ChevronUp size={12} className="-mb-1" />
      <ChevronDown size={12} />
    </div>
  );

  return (
    <div className="w-full h-[100vh]  md:h-auto    overflow-hidden ">
      <div className=" bg-white rounded-md shadow-sm border border-gray-200 p-6">
        
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-roboto font-bold uppercase tracking-tight text-slate-700">
            Supplier List
          </h2>
          <button onClick={() => setIsSupplierOpen(true)} className="bg-[#26c281] hover:bg-[#21a870] text-white px-4 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold transition-all shadow-sm">
            <Plus size={16} strokeWidth={3} /> Add Supplier List
          </button>
        </div>

        {/* Table Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 text-[13px] text-gray-600">
          <div className="flex items-center gap-1.5">
            <span>Show</span>
            <select className="border border-gray-300 rounded px-1 py-1 outline-none bg-white">
              <option>10</option>
            </select>
            <span>entries</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Search:</span>
            <input type="text" className="border border-gray-300 rounded px-2 py-1 outline-none w-48" />
          </div>
        </div>

        {/* Supplier Table */}
        <div className="overflow-x-auto border border-gray-100 rounded">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[12px] font-bold text-gray-600">
                <th className="px-4 py-3 border-r border-gray-200 w-20">
                    <div className="flex items-center">SN. <SortArrows /></div>
                </th>
                <th className="px-4 py-3 border-r border-gray-200 min-w-[200px]">
                    <div className="flex items-center">Supplier Name <SortArrows /></div>
                </th>
                <th className="px-4 py-3 border-r border-gray-200 min-w-[180px]">
                    <div className="flex items-center">Supplier Email <SortArrows /></div>
                </th>
                <th className="px-4 py-3 border-r border-gray-200">
                    <div className="flex items-center">Supplier Contact No. <SortArrows /></div>
                </th>
                <th className="px-4 py-3 border-r border-gray-200">
                    <div className="flex items-center">Address <SortArrows /></div>
                </th>
                <th className="px-4 py-3 border-r border-gray-200 text-center">
                    <div className="flex items-center justify-center">Status <SortArrows /></div>
                </th>
                <th className="px-4 py-3 border-r border-gray-200 text-center">
                    <div className="flex items-center justify-center">Change Status <SortArrows /></div>
                </th>
                <th className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center">Action <SortArrows /></div>
                </th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-600">
              {suppliers.map((item) => (
                <tr key={item.sn} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 border-r border-gray-50">{item.sn}</td>
                  <td className="px-4 py-3 border-r border-gray-50">{item.name}</td>
                  <td className="px-4 py-3 border-r border-gray-50">{item.email}</td>
                  <td className="px-4 py-3 border-r border-gray-50">{item.contact}</td>
                  <td className="px-4 py-3 border-r border-gray-50">{item.address}</td>
                  <td className="px-4 py-3 border-r border-gray-50 text-center">
                    <span className="bg-[#e6fff5] text-[#26c281] px-3 py-0.5 rounded-full text-[11px] font-bold border border-[#b3ffdf]">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-r border-gray-50 text-center">
                    <button className="bg-[#fff1f1] text-[#ff7373] px-3 py-0.5 rounded-full text-[11px] font-bold border border-[#ffe0e0] hover:bg-red-50 transition-colors">
                      Change Status
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-4">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Pencil size={16} strokeWidth={2.5} />
                      </button>
                      <button className="text-red-400 hover:text-red-600">
                        <X size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <p className="text-xs text-gray-500">Showing 1 to 10 of 12 entries</p>
          <nav className="flex items-center text-xs shadow-sm rounded overflow-hidden border border-gray-300">
            <button className="px-3 py-2 border-r border-gray-300 text-gray-400 hover:bg-gray-50">Previous</button>
            <button className="px-4 py-2 border-r border-gray-300 bg-[#5c76d1] text-white font-bold">1</button>
            <button className="px-4 py-2 border-r border-gray-300 hover:bg-gray-50">2</button>
            <button className="px-3 py-2 hover:bg-gray-50">Next</button>
          </nav>
        </div>
      </div>
      <SupplierListPopup isOpen={isSupplierOpen}
      onClose={() =>setIsSupplierOpen(false)}/>
    </div>
  );
};

export default SupplierList;