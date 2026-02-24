import React, { useState, useMemo } from "react";

import DataTable from "react-data-table-component";
import { 
  Search, User, FileText, Trash2, Clock, 
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, XCircle 
} from "lucide-react";

function CancelAppointment() {
  const [patientId, setPatientId] = useState("");
  const [doctor, setDoctor] = useState("All Doctor");
  const [filterPatientId, setFilterPatientId] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("All Doctor");

  const doctors = ["All Doctor", "Dr. Smith", "Dr. Johnson", "Dr. Brown"];

  const appointments = [
    { sno: 1, id: "APPT001", date: "2026-01-21", time: "10:30 AM", patient: "Ravi Kumar", patientId: "PAT001", status: "Cancelled", doctor: "Dr. Smith" },
    { sno: 2, id: "APPT002", date: "2026-01-21", time: "11:00 AM", patient: "Amit Sharma", patientId: "PAT002", status: "Cancelled", doctor: "Dr. Johnson" },
  ];

  const filteredData = useMemo(() => {
    return appointments.filter((a) => {
      const matchPatientId = !filterPatientId || a.patientId.toLowerCase().includes(filterPatientId.toLowerCase());
      const matchDoctor = filterDoctor === "All Doctor" || a.doctor === filterDoctor;
      return matchPatientId && matchDoctor;
    });
  }, [filterPatientId, filterDoctor]);

  const handleSearch = () => {
    setFilterPatientId(patientId);
    setFilterDoctor(doctor);
  };

  /* ================= DESKTOP COLUMNS ================= */
  const columns = [
    { name: "SNO.", selector: (row) => row.sno, width: "70px", cell: (row) => <span className="font-bold text-gray-500">{row.sno}.</span> },
    { 
      name: "DATE & TIME", 
      selector: (row) => row.date, 
      cell: (row) => (
        <div className="py-2">
          <div className="font-bold text-gray-800">{row.date}</div>
          <div className="text-[12px] font-bold text-gray-800 flex items-center gap-1"><Clock size={10}/> {row.time}</div>
        </div>
      )
    },
    { name: "APPT ID", selector: (row) => row.id, cell: (row) => <span className="text-[#4F6EEA]  font-bold text-xs">{row.id}</span> },
    { 
      name: "PATIENT DETAILS", 
      selector: (row) => row.patient,
      cell: (row) => (
        <div className="py-2">
          <div className="font-bold text-gray-700">{row.patient}</div>
          <div className="text-[10px] font-mono text-gray-400">ID: {row.patientId}</div>
        </div>
      )
    },
    { name: "DOCTOR", selector: (row) => row.doctor, cell: (row) => <span className="font-semibold text-gray-600">{row.doctor}</span> },
    { 
      name: "STATUS", 
      cell: () => (
        <span className="px-3 py-1 rounded-sm  text-[10px] font-black uppercase bg-red-100 text-red-700">
          Cancelled
        </span>
      ) 
    },
    { 
      name: "ACTION", 
      width: "120px",
      cell: (row) => (
        <div className="flex gap-1">
            <button title="View Reason" className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-sm  transition-colors">
                <FileText size={16} />
            </button>
            <button title="Delete Record" className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm  transition-colors">
                <Trash2 size={16} />
            </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
         background: "linear-gradient(90deg, #5B7CFA, #7DA0FA)",
        color: "#ffffff",
        fontWeight: "800",
        fontSize: "12px",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "20px",
      },
    },
    pagination: {
      style: {
        border: "none",
        color: "#6b7280",
        justifyContent: "flex-end", // Right side
        paddingRight: "40px", // Align under Actions
        paddingTop: "10px",
        paddingBottom: "10px",
      },
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
  
      
      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-xl font-black text-gray-800 mb-6  tracking-tight">Cancelled Appointments</h1>

        {/* Filters */}
        <div className="bg-white p-5 rounded-sm  shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-[2] relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Patient ID..."
              value={patientId} 
              onChange={(e) => setPatientId(e.target.value)} 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-sm  text-sm outline-none focus:ring-1 focus:ring-red-300" 
            />
          </div>
          <div className="flex-1 relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select value={doctor} onChange={(e) => setDoctor(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-sm text-sm appearance-none outline-none">
              {doctors.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <button onClick={handleSearch} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2.5 rounded-sm  font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-100 transition-all active:scale-95">
            <Search size={16} /> Search
          </button>
        </div>

        {/* MOBILE VIEW (Card style) */}
        <div className="block md:hidden space-y-4">
          {filteredData.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-sm  border border-gray-100 shadow-sm relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-sm  mb-1 block w-fit">{item.id}</span>
                  <h3 className="text-lg font-black text-gray-800">{item.patient}</h3>
                </div>
                <span className="px-3 py-1 rounded-sm  text-[10px] font-black uppercase bg-red-100 text-red-700">Cancelled</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Doctor</p>
                  <p className="text-sm font-bold text-gray-700">{item.doctor}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Schedule</p>
                  <p className="text-sm font-bold text-gray-700">{item.date}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
                 <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-sm  text-xs font-bold"><FileText size={14}/> Reason</button>
                 <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-sm  text-xs font-bold"><Trash2 size={14}/> Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW (Table style) */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <DataTable
            columns={columns}
            data={filteredData}
            customStyles={customStyles}
            pagination
            paginationPerPage={5}
            paginationComponentOptions={{ 
              noRowsPerPage: true,
              rangeSeparatorText: 'of',
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
      </main>
    </div>
  );
}

export default CancelAppointment; 