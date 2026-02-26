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

// Custom DataTable styles
const customStyles = {
  headRow: {
    style: {
      background: "linear-gradient(90deg, #5B7CFA, #7DA0FA)",
      fontWeight: "800",
      fontSize: "12px",
      color: "#ffffff",
      borderRadius: "0.375rem",
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

// Sample Data
const initialData = [
  {
    sno: 1,
    date: "2026-02-25",
    apptId: "A001",
    apptTime: "09:30 AM",
    patient: "Rohit Sharma",
    doctor: "Dr. Mehta",
  },
  {
    sno: 2,
    date: "2026-02-25",
    apptId: "A002",
    apptTime: "10:30 AM",
    patient: "Anita Singh",
    doctor: "Dr. Verma",
  },
];

// Table Columns
const columns = [

  { name: "Sno.", selector: row => row.sno, sortable: true },
  { name: "Date", selector: row => row.date, sortable: true },
  { name: "Appt.Id", selector: row => row.apptId, sortable: true },
  { name: "Appt. Time", selector: row => row.apptTime, sortable: true },
  { name: "Patient", selector: row => row.patient, sortable: true },
  { name: "Doctor", selector: row => row.doctor, sortable: true },
];

function PatientSearch() {
  const [filteredData, setFilteredData] = useState(initialData);

  return (
    <div className="p-4 md:p-8 m-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
          Upcoming Appointments
        </h1>
      </div>

      {/* Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
            <label className="text-gray-700 font-medium whitespace-nowrap">Select Date</label>
            <input
              type="date"
              defaultValue="2026-02-25"
              className="w-full sm:w-64 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-gray-600 transition-all"
            />
          </div>

          <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 font-medium">
            <Search size={18} />
            Search
          </button>
        </div>

        {/* Desktop DataTable */}
        <div className="hidden md:block overflow-x-auto">
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
                <p className="font-medium">No appointments found</p>
              </div>
            }
          />
        </div>

        {/* Mobile/Table Card View */}
        <div className="block md:hidden space-y-4">
          {filteredData.length === 0 ? (
            <div className="py-20 text-center text-gray-300">
              <Clock size={48} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">No appointments found</p>
            </div>
          ) : (
            filteredData.map((item) => (
              <div
                key={item.apptId}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-gray-800">{item.sno}</span>
                  <span className="text-gray-500">{item.apptId}</span>
                </div>
                <p className="text-gray-700 font-semibold">{item.patient}</p>
                <p className="text-gray-600 text-sm">Doctor: {item.doctor}</p>
                <p className="text-gray-600 text-sm">Date: {item.date}</p>
                <p className="text-gray-600 text-sm">Time: {item.apptTime}</p>
                <button className="mt-2 text-indigo-600 font-medium hover:underline text-sm">
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientSearch;