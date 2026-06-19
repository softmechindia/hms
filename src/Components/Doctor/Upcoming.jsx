import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Calendar as CalendarIcon
} from "lucide-react";

const customStyles = {
  headRow: {
    style: {
      background: "linear-gradient(90deg, #5B7CFA, #7DA0FA)",
      fontWeight: "800",
      fontSize: "12px",
      color: "#ffffff",
     
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

const initialData = [
  { sno: 1, date: "2026-02-25", apptId: "A001", apptTime: "09:30 AM", patient: "Rohit Sharma", doctor: "Dr. Mehta" },
  { sno: 2, date: "2026-02-25", apptId: "A002", apptTime: "10:30 AM", patient: "Anita Singh", doctor: "Dr. Verma" },
];

const columns = [
  { name: "Sno.", selector: row => row.sno, sortable: true, width: "80px" },
  { name: "Date", selector: row => row.date, sortable: true },
  { name: "Appt. Id", selector: row => row.apptId, sortable: true, cell: row => <span className="font-bold text-indigo-600">{row.apptId}</span> },
  { name: "Appt. Time", selector: row => row.apptTime, sortable: true },
  { name: "Patient Name", selector: row => row.patient, sortable: true, grow: 1.5 },
  { name: "Assigned Doctor", selector: row => row.doctor, sortable: true },
];

function UpComing() {
  const [selectedDate, setSelectedDate] = useState("2026-02-25");

  return (
      <div className="w-full h-[100vh]    overflow-hidden ">

        
 

        {/* Content Card */}
        <div className="bg-white shadow-2xl overflow-hidden border border-slate-700/10">
          
          {/* Header/Filters */}
          <div className="p-6 border-b border-gray-100 bg-slate-50/50">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-1">
                  Filter by Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-slate-700 transition-all w-full sm:w-64 font-medium"
                />
              </div>

              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20 active:scale-95 font-bold h-[46px]">
                <Search size={18} />
                Search Records
              </button>
            </div>
          </div>

          {/* Table Area */}
          <div className="px-2 pb-2">
            <DataTable
              columns={columns}
              data={initialData}
              customStyles={customStyles}
              pagination
              highlightOnHover
              responsive
              pointerOnHover
              noDataComponent={
                <div className="py-20 text-center">
                  <Clock size={48} className="mx-auto mb-4 text-slate-200" />
                  <p className="text-slate-400 font-medium">No appointments found for this date.</p>
                </div>
              }
            />
          
        </div>
      </div>
    </div>
  );
}

export default UpComing;