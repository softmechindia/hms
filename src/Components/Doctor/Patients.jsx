import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
} from "lucide-react";

// Custom styles for DataTable
const customStyles = {
  headRow: {
    style: {
      background: "linear-gradient(90deg, #5B7CFA, #7DA0FA)",
      fontWeight: "800",
      fontSize: "12px",
      color: "#ffffff",
      borderRadius: "0.375rem", // Tailwind rounded-md
    },
  },
  pagination: {
    style: {
      border: "none",
      color: "#6b7280",
      justifyContent: "flex-end",
      paddingRight: "50px",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
  },
};

// Sample data
const initialData = [
  {
    id: "P001",
    name: "Rohit Sharma",
    mobile: "9876543210",
    address: "Mumbai, India",
  },
  {
    id: "P002",
    name: "Anita Singh",
    mobile: "9123456780",
    address: "Delhi, India",
  },
];

// DataTable columns
const columns = [
  { name: "#", selector: (row, index) => index + 1, sortable: true, width: "60px" },
  { name: "Patient Name", selector: row => row.name, sortable: true },
  { name: "Patient ID", selector: row => row.id, sortable: true },
  { name: "Mobile Number", selector: row => row.mobile, sortable: true },
  { name: "Address", selector: row => row.address, sortable: true },
  {
    name: "View Details",
    cell: () => (
      <button className="text-indigo-600 font-medium hover:underline text-sm">
        View
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
  },
];

function PatientSearch() {
  const [filteredData, setFilteredData] = useState(initialData);

  return (
     <div className="p-4 md:p-8 m-4 bg-gray-50 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
          Patient Details
        </h1>
      </div>

      {/* Search & Filter */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full sm:w-auto">
          <label className="font-bold text-gray-800">Search</label>
          <input
            type="text"
            placeholder="Patient ID/Mobile/Name"
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 w-full sm:w-64"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full sm:w-auto">
          <label className="text-gray-700">From Date</label>
          <input
            type="date"
            defaultValue="2026-01-26"
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none text-gray-600"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full sm:w-auto">
          <label className="text-gray-700">To Date</label>
          <input
            type="date"
            defaultValue="2026-02-25"
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none text-gray-600"
          />
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded flex items-center gap-2 transition-colors font-medium">
          <Search size={18} /> Search
        </button>
      </div>

      {/* Desktop DataTable */}
      <div className="hidden md:block">
        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={customStyles}
          pagination
          paginationPerPage={5}
          paginationComponentOptions={{
            noRowsPerPage: true,
            rangeSeparatorText: "of",
          }}
          paginationIconFirstPage={<ChevronsLeft size={18} />}
          paginationIconLastPage={<ChevronsRight size={18} />}
          paginationIconNextPage={<ChevronRight size={18} />}
          paginationIconPreviousPage={<ChevronLeft size={18} />}
          highlightOnHover
          responsive
          noDataComponent={
            <div className="py-20 text-center text-gray-300">
              <Clock size={48} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">No patients found</p>
            </div>
          }
        />
      </div>

      {/* Mobile/Tablets View: Card Layout */}
      <div className="block md:hidden space-y-4">
        {filteredData.length === 0 ? (
          <div className="py-20 text-center text-gray-300">
            <Clock size={48} className="mx-auto mb-3 opacity-20" />
            <p className="font-medium">No patients found</p>
          </div>
        ) : (
          filteredData.map((item, index) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-between mb-2">
                <span className="font-bold text-gray-800">#{index + 1}</span>
                <span className="text-gray-500">{item.id}</span>
              </div>
              <p className="text-gray-700 font-semibold">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.mobile}</p>
              <p className="text-gray-600 text-sm">{item.address}</p>
              <button className="mt-2 text-indigo-600 font-medium hover:underline text-sm">
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PatientSearch;