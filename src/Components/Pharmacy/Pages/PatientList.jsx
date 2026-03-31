import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Home, ChevronRight } from 'lucide-react';

const PatientListTable = () => {
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");


  const columns = [
    { label: 'R/n', key: 'rn' },
    { label: 'Patient ID', key: 'id' },
    { label: 'Appointment ID', key: 'apptId' },
    { label: 'Name', key: 'name' },
    { label: 'Mobile No.', key: 'mobile' },
    { label: 'Doctor', key: 'doctor' },
    { label: 'Date', key: 'date' },
    { label: 'View Medicine', key: 'view' },
  ];

  return (
    <div className="h-[100vh]">
      
    
      <div className="flex justify-between items-center mb-6  md:h-auto">
        <h1 className="text-xl font-bold text-gray-700 uppercase tracking-tight">Patients List</h1>
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <Home size={14} className="text-gray-600" />
          <span>/</span>
          <span className="text-gray-600">Patients</span>
          <ChevronRight size={14} />
          <span className="text-gray-400">Patients List</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Patient Details</h2>

          
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <span>Show</span>
              <select 
                className="mx-2 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                value={entries}
                onChange={(e) => setEntries(e.target.value)}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span>entries</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">Search:</span>
              <input 
                type="text" 
                className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

        
          <div className="overflow-x-auto border rounded-md border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f8f9fa] border-b border-gray-200">
                <tr>
                  {columns.map((col, index) => (
                    <th key={index} className="px-4 py-3 text-[13px] font-bold text-gray-700 border-r last:border-r-0 border-gray-200 group cursor-pointer hover:bg-gray-100 transition">
                      <div className="flex items-center justify-between">
                        {col.label}
                        <div className="flex flex-col opacity-20 group-hover:opacity-60">
                          <ChevronUp size={10} className="-mb-0.5" />
                          <ChevronDown size={10} />
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                
                <tr className="border-b border-gray-200">
                  <td colSpan="8" className="py-6 text-center text-sm text-gray-500 italic">
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* --- Pagination Footer --- */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
            <p className="text-sm text-gray-600 font-medium">
              Showing 0 to 0 of 0 entries
            </p>
            <div className="flex rounded overflow-hidden border border-gray-300">
              <button className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-50 cursor-not-allowed border-r">
                Previous
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-50 cursor-not-allowed">
                Next
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientListTable;