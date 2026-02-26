import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Users, Calendar, CheckCircle, Clock, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

// Custom Styles for DataTable
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

// Sample Data for Table
const initialData = [
  {
    patient: "Rohit Sharma",
    doctor: "Dr. Mehta",
    apptDate: "2026-03-01",
    apptID: "1119043",
    apptTime: "09:30 AM",
    waiting: "0 min",
    
  },
  {
    patient: "Rohit Sharma",
    doctor: "Dr. Mehta",
    apptDate: "2026-03-01",
    apptID: "1119063",
    apptTime: "09:30 AM",
    waiting: "5 min",

  },
];

// Table Columns
const columns = [
  {
    name: "Patient Name",
    selector: row => row.patient,
    sortable: true,
    cell: row => <span className="font-bold text-gray-500">{row.patient}</span>,
  },
  {
    name: "Doctor Name",
    selector: row => row.doctor,
    sortable: true,
    cell: row => (
      <div>
        <div className="font-bold text-gray-800">{row.doctor}</div>
       
      </div>
    ),
  },
  {
    name: "Appt. Date",
    selector: row => row.apptDate,
    sortable: true,
    cell: row => <span className="text-indigo-600 font-bold text-xs">{row.apptDate}</span>,
  },
  {
    name: "Appt. ID",
    selector: row => row.apptID,
    sortable: true,
    cell: row => <span className="font-bold text-gray-700">{row.apptID}</span>,
  },
  {
    name: "Appt. Time",
    selector: row => row.apptTime,
    sortable: true,
    cell: row => <span className="font-semibold text-gray-600">{row.apptTime}</span>,
  },
  {
    name: "Patient Waiting",
    selector: row => row.waiting,
    sortable: true,
    cell: row => <span className="px-3 py-2 font-semibold text-gray-600">{row.waiting}</span>,
  },
];

function Dashboard() {
  const [filteredData, setFilteredData] = useState(initialData);

  return (
     <div className="p-4 md:p-8 m-4 bg-gray-50 min-h-screen">
     <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
            Clinic Overview
          </h1>
          <p className="text-slate-500">
            Welcome back! Here is what's happening today.
          </p>
        </div>
      </div>
    <div className="h-auto p-6 rounded-md m-4 bg-white font-sans text-slate-900">
 
 
 


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard count={12} label="Total Appointments" icon={<Calendar className="text-indigo-600" />} color="bg-indigo-50" />
        <StatCard count={8} label="Confirmed" icon={<CheckCircle className="text-emerald-600" />} color="bg-emerald-50" />
        <StatCard count={4} label="Completed" icon={<Users className="text-amber-600" />} color="bg-amber-50" />
      </div>
      

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Today's Schedule</h2>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
            View All
          </button>
        </div>
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
                <p className="font-medium">No pending appointments found</p>
              </div>
            }
          />
        </div>
      </div>
    </div>
    
    
  );
}

const StatCard = ({ count, label, icon, color }) => (
  <div className="bg-white p-4 rounded-md shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-slate-500 text-xs font-medium mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-slate-800">{count}</h3>
    </div>
    <div className={`p-2 rounded-lg ${color}`}>{React.cloneElement(icon, { size: 20 })}</div>
  </div>
  
);

export default Dashboard;