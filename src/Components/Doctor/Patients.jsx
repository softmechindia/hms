import React from "react";
import { Search, ChevronUp, ChevronDown } from "lucide-react";

function PatientSearch() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Search Filter Bar */}
      <div className="flex flex-wrap items-center gap-6 mb-8">
        <div className="flex items-center gap-3">
          <label className="font-bold text-gray-800">Search</label>
          <input
            type="text"
            placeholder="Patient ID/Mobile/Name"
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 w-64"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-gray-700">From Date</label>
          <input
            type="date"
            defaultValue="2026-01-26"
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none text-gray-600"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-gray-700">To Date</label>
          <input
            type="date"
            defaultValue="2026-02-25"
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none text-gray-600"
          />
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded flex items-center gap-2 transition-colors font-medium">
          <Search size={18} />
          Search
        </button>
      </div>

      {/* Table Section */}
      <div className="border border-gray-200 rounded overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#f2a93b]">
            <tr>
              <TableHeader label="#" />
              <TableHeader label="Patient Name" sortable />
              <TableHeader label="Patient ID" sortable />
              <TableHeader label="Mobile Number" sortable />
              <TableHeader label="Address" sortable />
              <TableHeader label="View Details" sortable />
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50/50">
              <td colSpan="6" className="py-4 text-center text-gray-600 border-t border-gray-200">
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600 text-sm font-medium">Showing 0 to 0 of 0 entries</p>
        <div className="flex border border-gray-300 rounded overflow-hidden">
          <PaginationButton label="First" />
          <PaginationButton label="Previous" />
          <PaginationButton label="Next" />
          <PaginationButton label="Last" />
        </div>
      </div>
    </div>
  );
}

// Helper component for Sortable Headers
const TableHeader = ({ label, sortable }) => (
  <th className="px-4 py-3 text-[#2d3748] font-bold border-r border-orange-400/30 last:border-r-0">
    <div className="flex items-center justify-between">
      <span>{label}</span>
      {sortable && (
        <div className="flex flex-col opacity-40">
          <ChevronUp size={12} className="-mb-1" />
          <ChevronDown size={12} />
        </div>
      )}
    </div>
  </th>
);

// Helper component for Pagination
const PaginationButton = ({ label }) => (
  <button className="px-4 py-2 bg-white text-gray-500 hover:bg-gray-50 border-r last:border-r-0 text-sm font-medium transition-colors">
    {label}
  </button>
);

export default PatientSearch;