import React, { useState } from 'react';
import { Search, Plus, Save } from 'lucide-react';

const InvoiceForm = () => {
  const [medicines, setMedicines] = useState([{ id: 1, name: '', type: '', batch: '', qty: '', price: 0, discount: 0, total: 0 }]);
  const [returns, setReturns] = useState([{ id: 1, name: '', type: '', batch: '', qty: '', price: 0, discount: 0, total: 0 }]);

  const inputStyle = "w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm";
  
  const gridLayout = "grid grid-cols-[1fr_80px_120px_80px_90px_100px_110px]";

  return (
<div className="w-full h-[100vh] bg-white shadow-sm rounded-md overflow-hidden border border-gray-200">        

        <div className="p-4 border-b bg-white flex items-center gap-4">
          <label className="text-sm font-semibold whitespace-nowrap">Patient Id/Name/Mobile</label>
          <div className="flex flex-1 max-w-md">
            <input type="text" placeholder="Patient Id/Name/Mobile" className={`${inputStyle} rounded-r-none h-9`} />
            <button className="bg-teal-500 text-white px-4 py-1 rounded-r flex items-center gap-1 hover:bg-teal-600 transition">
              <Search size={16} /> Search
            </button>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-blue-50/20">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Name :</label>
            <input type="text" className={inputStyle}/>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Mobile :</label>
            <input type="text" className={inputStyle}  />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Address :</label>
            <input type="text" className={inputStyle} />
          </div>
        </div>

        <div className={`${gridLayout} px-0 py-2 text-[12px] font-semibold text-gray-700 bg-white border-t border-b`}>
          <div className="pl-4">Doctor:</div>
          <div className="col-span-2 text-center">Patient ID:</div>
          <div className="col-span-2 text-center">Appt.ID:</div>
          <div className="col-span-2 text-center">Appt.Date:</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed">
            <thead className="bg-gray-100 text-[11px] uppercase text-gray-600 font-bold">
              <tr>
                <th className="p-2 border border-gray-200 text-center">Medicine</th>
                <th className="p-2 border border-gray-200 w-[80px] text-center">Type</th>
                <th className="p-2 border border-gray-200 w-[120px] text-center">Batch No.</th>
                <th className="p-2 border border-gray-200 w-[80px] text-center">Quantity</th>
                <th className="p-2 border border-gray-200 w-[90px] text-center">Price</th>
                <th className="p-2 border border-gray-200 w-[100px] text-center">Discount(%)</th>
                <th className="p-2 border border-gray-200 w-[110px] text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((row) => (
                <tr key={row.id}>
                  <td className="p-2 border border-gray-200">
                    <div className="flex gap-1">
                      <input type="text" className={inputStyle} />
                      <button className="bg-emerald-500 text-white p-1 rounded hover:bg-emerald-600"><Plus size={16} /></button>
                    </div>
                  </td>
                  <td className="p-2 border border-gray-200"><input type="text" className={inputStyle} /></td>
                  <td className="p-2 border border-gray-200"><input type="text" className={inputStyle} /></td>
                  <td className="p-2 border border-gray-200"><input type="number" className={inputStyle} /></td>
                  <td className="p-2 border border-gray-200"><input type="number" className={inputStyle} placeholder="0.00" /></td>
                  <td className="p-2 border border-gray-200"><input type="number" className={inputStyle} placeholder="0.00" /></td>
                  <td className="p-2 border border-gray-200"><input type="number" className={inputStyle} placeholder="0.00" readOnly /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

   
        <div className="bg-[#f0ad4e] p-2 flex items-center justify-between text-white">
          <div className="flex items-center gap-4 flex-1">
            <span className="font-bold ml-16 text-sm uppercase">Invoice Number</span>
            <div className="flex max-w-xs shadow-sm">
              <input type="text" placeholder="Invoice Number" className="w-full px-2 py-1 text-black text-sm rounded-l focus:outline-none" />
              <button className="bg-teal-500 px-3 py-1 rounded-r hover:bg-teal-600 transition flex items-center gap-1">
                <Search size={14} /> Search
              </button>
            </div>
          </div>
          <span className="font-bold mr-10 text-sm uppercase">Medicine Return</span>
        </div>

    
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-fixed">
            <tbody>
              {returns.map((row) => (
                <tr key={row.id}>
                  <td className="p-2 border border-gray-200 flex gap-1">
                    <input type="text" className={inputStyle} />
                    <button className="bg-emerald-500 text-white p-1 rounded"><Plus size={16} /></button>
                  </td>
                  <td className="p-2 border border-gray-200 w-[80px]"><input type="text" className={inputStyle} /></td>
                  <td className="p-2 border border-gray-200 w-[120px]"><input type="text" className={inputStyle} /></td>
                  <td className="p-2 border border-gray-200 w-[80px]"><input type="number" className={inputStyle} /></td>
                  <td className="p-2 border border-gray-200 w-[90px]"><input type="number" className={inputStyle} placeholder="0.00" /></td>
                  <td className="p-2 border border-gray-200 w-[100px]"><input type="number" className={inputStyle} placeholder="0.00" /></td>
                  <td className="p-2 border border-gray-200 w-[110px]"><input type="number" className={inputStyle} placeholder="0.00" readOnly /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div className="flex flex-col md:flex-row border-t border-gray-200">

          <div className="flex-1 min-h-[150px] border-r border-gray-200"></div>

          <div className="w-full md:w-[350px] bg-white">
            {[
              { label: 'Sub Total:', val: '' },
              { label: 'Discount:', val: '' },
              { label: 'Total Amount:', val: '' },
              { label: 'Return Amount:', val: '0.00' },
              { label: 'Net Payable Amount:', val: '' },
            ].map((item, idx) => (
              <div key={idx} className="flex border-b border-gray-200 last:border-b-0 h-10">
                <div className="w-1/2 bg-white flex items-center justify-end px-4 border-r border-gray-200">
                  <span className="text-[13px] font-bold text-gray-700">{item.label}</span>
                </div>
                <div className="w-1/2 p-1">
                  <input 
                    type="text" 
                    defaultValue={item.val} 
                    className="w-full h-full px-2 text-right text-sm border border-gray-200 rounded focus:ring-1 focus:ring-teal-500 outline-none" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="p-4 bg-gray-50 border-t flex justify-end">
          <button className="bg-[#5c6bc0] hover:bg-[#4a57a9] text-white px-8 py-2 rounded shadow-md transition-all font-bold text-sm flex items-center gap-2">
            <Save size={18} /> Save & Print
          </button>
        </div>
      </div>
   
  );
};

export default InvoiceForm;