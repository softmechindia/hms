import React, { useState, useMemo } from "react";

import DataTable from "react-data-table-component";
import { 
  Search, Calendar, User, ShieldCheck, Clock, 
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CheckCircle 
} from "lucide-react";

function TodayConf() {
  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState("All Doctor");
  const [filterDate, setFilterDate] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("All Doctor");

  const doctors = ["All Doctor", "Dr. Smith", "Dr. Johnson", "Dr. Brown"];

  const appointments = [
    { sno: 1, id: "APPT001", date: "2026-01-21", time: "10:30 AM", patient: "Ravi Kumar", status: "Completed", doctor: "Dr. Smith", verifyBy: "Admin" },
    { sno: 2, id: "APPT002", date: "2026-01-21", time: "11:00 AM", patient: "Amit Sharma", status: "Confirmed", doctor: "Dr. Johnson", verifyBy: "Admin" },
  ];

  const filteredData = useMemo(() => {
    return appointments.filter((a) => {
      const matchStatus = a.status === "Completed" || a.status === "Confirmed";
      const matchDate = !filterDate || a.date === filterDate;
      const matchDoctor = filterDoctor === "All Doctor" || a.doctor === filterDoctor;
      return matchStatus && matchDate && matchDoctor;
    });
  }, [filterDate, filterDoctor]);

  const handleSearch = () => {
    setFilterDate(date);
    setFilterDoctor(doctor);
  };

 
  const columns = [
    { name: "SNO.", selector: (row) => row.sno, width: "70px", cell: (row) => <span className="font-bold text-gray-500">{row.sno}.</span> },
    { 
      name: "SCHEDULE", 
      selector: (row) => row.date, 
      cell: (row) => (
        <div className="py-2">
          <div className="font-bold text-gray-800">{row.date}</div>
          <div className="text-[12px] font-bold text-gray-800 flex items-center gap-1"><Clock size={10}/> {row.time}</div>
        </div>
      )
    },
    { name: "APPT ID", selector: (row) => row.id, cell: (row) => <span className="text-[#4F6EEA]  font-bold text-xs">{row.id}</span> },
    { name: "PATIENT", selector: (row) => row.patient, cell: (row) => <span className="font-bold text-gray-700">{row.patient}</span> },
    { name: "DOCTOR", selector: (row) => row.doctor, cell: (row) => <span className="font-semibold text-gray-600">{row.doctor}</span> },
    { 
      name: "STATUS", 
      cell: (row) => (
        <span className={`px-3 py-1 rounded-sm  text-[10px] font-black uppercase ${
          row.status === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
        }`}>
          {row.status}
        </span>
      ) 
    },
    { 
      name: "VERIFIED", 
      width: "150px",
      cell: (row) => (
        <div className="flex items-center gap-1.5 text-gray-600 font-medium">
          <ShieldCheck size={14} className="text-emerald-500" /> {row.verifyBy}
        </div>
      )
    },
  ];

  const customStyles = {
    headRow: {
      style: {
         background: "linear-gradient(90deg, #5B7CFA, #7DA0FA)",
       
        fontWeight: "800",
            color: "#ffffff",
        fontSize: "12px",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "20px",
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

  return (
    <div className="flex min-h-screen bg-gray-50">
   
      
      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-xl font-black text-gray-800 mb-6  tracking-tight">Confirmed List</h1>

   
        <div className="bg-white p-5 rounded-sm  shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
<input 
  type="date" 
  value={date} 
  onChange={(e) => setDate(e.target.value)} 
  min="2026-01-01"  
  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-sm  text-sm outline-none focus:ring-1 focus:ring-orange-300" 
/>          </div>
          <div className="flex-1 relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select value={doctor} onChange={(e) => setDoctor(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-sm  text-sm appearance-none outline-none">
              {doctors.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <button onClick={handleSearch} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2.5 rounded-sm  font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-100 transition-all active:scale-95">
            <Search size={16} /> Search List
          </button>
        </div>


        <div className="block md:hidden space-y-4 rounded-sm  ">
          {filteredData.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-sm border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md mb-1 block w-fit">{item.id}</span>
                  <h3 className="text-lg font-black text-gray-800">{item.patient}</h3>
                </div>
                <span className={`px-3 py-1 rounded-sm  text-[10px] font-black uppercase ${item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                  {item.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4 rounded-sm" >
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Doctor</p>
                  <p className="text-sm font-bold text-gray-700">{item.doctor}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Date</p>
                  <p className="text-sm font-bold text-gray-700">{item.date}</p>
                  <p className="text-[11px] text-gray-500 italic">{item.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

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

export default TodayConf;