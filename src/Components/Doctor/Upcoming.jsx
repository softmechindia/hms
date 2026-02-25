import React from "react";
import { Search, ChevronUp, ChevronDown, Calendar } from "lucide-react";

// Sub-component for Table Headers to keep the main code clean
const TableHeader = ({ label, sortable }) => (
  <th className="px-4 py-3 text-sm font-semibold text-white">
    <div className="flex items-center gap-1 cursor-pointer group">
      {label}
      {sortable && (
        <div className="flex flex-col">
          <ChevronUp size={12} className="group-hover:text-gray-200" />
          <ChevronDown size={12} className="-mt-1 group-hover:text-gray-200" />
        </div>
      )}
    </div>
  </th>
);

function PatientSearch() {
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        
        {/* Search Filter Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label className="text-gray-700 font-medium whitespace-nowrap">Select Date</label>
            <div className="relative w-full sm:w-64">
              <input
                type="date"
                defaultValue="2026-02-25"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-gray-600 transition-all"
              />
            </div>
          </div>

          <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 font-medium">
            <Search size={18} />
            Search
          </button>
        </div>

        {/* Table Container with Horizontal Scroll */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-[#f2a93b]">
              <tr>
                <TableHeader label="#" />
                <TableHeader label="Sno." sortable />
                <TableHeader label="Date" sortable />
                <TableHeader label="Appt.Id" sortable />
                <TableHeader label="Appt. Time" sortable />
                <TableHeader label="Patient" sortable />
                <TableHeader label="Doctor" sortable />
              </tr>
            </thead>

          </table>
        </div>

     
      </div>
    </div>
  );
}

export default PatientSearch;