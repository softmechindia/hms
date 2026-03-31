import React, { useState } from 'react';
import { Plus, Pencil, X } from 'lucide-react';
import SupplierPaymentPopup from '../PharmacyPopup/Supplier-Payment-Popup';
const SupplierPayment = () => {
 const [paymentPopup, setPaymentPopup] = useState(false);
  const payments = [
    {
      sl: 1,
      supplierName: 'Test',
      paymentMode: 'cash',
      amount: '5000',
      paidBy: 'Surjit',
      date: '2020-12-17 18:56:12'
    }
  ];

  return (
     <div className="w-full h-[100vh]    overflow-hidden  md:h-auto ">
      <div className="mx-auto bg-white rounded-md shadow-sm border border-gray-200 p-6">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-lg font-bold uppercase tracking-tight text-slate-700">
            Supplier Payment
          </h2>
          <button onClick={() => setPaymentPopup(true)} className="bg-[#26c281] hover:bg-[#21a870] text-white px-5 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all shadow-sm">
            <Plus size={18} strokeWidth={3} /> Add Supplier Payment
          </button>
        </div>

        {/* Table Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select className="border border-gray-300 rounded px-1 py-1 outline-none bg-white">
              <option>10</option>
            </select>
            <span>entries</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Search:</span>
            <input
              type="text"
              className="border border-gray-300 rounded px-2 py-1 outline-none w-full md:w-64"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto border border-gray-100 rounded">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-xs font-bold text-gray-600 uppercase">
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 border-r border-gray-200 w-16">SL <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200">Supplier Name <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200 text-center">Payment Mode <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200 text-center">Amount <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200 text-center">Paid By <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 border-r border-gray-200 text-center">Date <span className="float-right text-gray-300">⇅</span></th>
                <th className="px-4 py-3 text-center">Action <span className="float-right text-gray-300">⇅</span></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {payments.map((item) => (
                <tr key={item.sl} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 border-r border-gray-50 text-center">{item.sl}</td>
                  <td className="px-4 py-4 border-r border-gray-50 text-blue-500 hover:underline cursor-pointer">
                    {item.supplierName}
                  </td>
                  <td className="px-4 py-4 border-r border-gray-50 text-center italic text-gray-500">
                    {item.paymentMode}
                  </td>
                  <td className="px-4 py-4 border-r border-gray-50 text-center font-medium">
                    ₹ {item.amount}
                  </td>
                  <td className="px-4 py-4 border-r border-gray-50 text-center">
                    {item.paidBy}
                  </td>
                  <td className="px-4 py-4 border-r border-gray-50 text-center text-xs">
                    {item.date}
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

        {/* Footer & Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <p className="text-sm text-gray-500 font-medium">Showing 1 to 1 of 1 entries</p>
          <nav className="flex items-center text-sm shadow-sm">
            <button className="px-3 py-1 border border-gray-300 text-gray-400 rounded-l hover:bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-1 border-y border-r border-gray-300 bg-[#5c76d1] text-white font-bold">
              1
            </button>
            <button className="px-3 py-1 border border-l-0 border-gray-300 text-gray-400 rounded-r hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>

  <SupplierPaymentPopup
        isOpen={paymentPopup}
        onClose={() => setPaymentPopup(false)}
        onSubmit={() => setPaymentPopup()
        }
      />
    </div>
  );
};

export default SupplierPayment;