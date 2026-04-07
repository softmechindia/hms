import React from 'react';
import { Search } from 'lucide-react'; // Optional: using lucide-react for the icon

const MedicineStock = () => {
  const data = [
    { sn: 201, name: 'VILPOWER M 500', expiry: '2023-07-31', batch: 'VIES0003', qty: '54.0' },
    { sn: 202, name: 'VENPOWER 100', expiry: '2022-12-31', batch: 'VIFS0002', qty: '45.0' },
    { sn: 203, name: 'VENPOWER 50', expiry: '2022-09-30', batch: 'VILP003', qty: '200.0' },
  ];

  return (
       <div className="w-full h-[100vh]  md:h-auto   overflow-hidden ">
      <div className=" bg-white rounded-md shadow-sm border border-gray-200 p-6 ">
        
        <h2 className="text-lg font-roboto font-bold uppercase tracking-tight mb-6 text-slate-700">
          Medicine Stock
        </h2>

        {/* Orange Fieldset Search Section */}
        <div className="relative border border-gray-300 rounded-md p-6 mb-8 mt-4">
          <span className="absolute -top-3 left-4 bg-white px-2 text-sm font-bold text-orange-500 uppercase tracking-wide">
            Search Medicine
          </span>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="All"
              className="flex-grow border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-400 transition-colors"
            />
            <button className="bg-[#f6a96d] hover:bg-[#f49348] text-white px-6 py-2 rounded flex items-center justify-center gap-2 font-medium transition-colors">
              <Search size={18} /> Search
            </button>
          </div>
        </div>

        {/* Table Controls */}
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
            <thead className="bg-gray-50 text-xs font-bold text-gray-600 ">
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 border-r border-gray-200">S/N <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200">Medicine Name <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200">Expiry Date <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200">Batch Number <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3">Available Qty <span className="float-right text-gray-300">⇅</span></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.map((row) => (
                <tr key={row.sn} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 border-r border-gray-50">{row.sn}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-blue-500 hover:underline cursor-pointer">
                    {row.name}
                  </td>
                  <td className="px-4 py-4 border-r border-gray-50">{row.expiry}</td>
                  <td className="px-4 py-4 border-r border-gray-50">{row.batch}</td>
                  <td className="px-4 py-4">{row.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer & Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <p className="text-sm text-gray-500">Showing 201 to 203 of 203 entries</p>
          <nav className="flex items-center -space-x-px text-sm">
            <button className="px-3 py-2 border border-gray-300 text-gray-400 rounded-l">Previous</button>
            <button className="px-3 py-2 border border-gray-300">1</button>
            <span className="px-3 py-2 border border-gray-300 text-gray-400">...</span>
            <button className="px-3 py-2 border border-gray-300">17</button>
            <button className="px-3 py-2 border border-gray-300">18</button>
            <button className="px-3 py-2 border border-gray-300">19</button>
            <button className="px-3 py-2 border border-gray-300">20</button>
            <button className="px-3 py-2 border border-gray-300 bg-[#5c76d1] text-white font-bold">21</button>
            <button className="px-3 py-2 border border-gray-300 text-gray-400 rounded-r">Next</button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MedicineStock;