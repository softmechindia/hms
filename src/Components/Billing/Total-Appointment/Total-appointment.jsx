import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { 
  Search, Calendar, User, ShieldCheck, Clock, 
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight 
} from "lucide-react";

function Totalapp() {
  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState("All Doctor");
  const [filterDate, setFilterDate] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("All Doctor");

  const doctors = ["All Doctor", "Dr. Smith", "Dr. Johnson", "Dr. Brown"];

  const appointments = [
    { sno: 1, id: "APPT001", date: "2026-01-21", time: "10:30 AM", patient: "Ravi Kumar", status: "Pending", doctor: "Dr. Smith", verifyBy: "Admin" },
    { sno: 2, id: "APPT002", date: "2026-01-21", time: "11:00 AM", patient: "Amit Sharma", status: "Pending", doctor: "Dr. Johnson", verifyBy: "Admin" },
  ];

  const filteredData = useMemo(() => {
    return appointments.filter((a) => {
      const dateMatch = !filterDate || a.date === filterDate;
      const doctorMatch = filterDoctor === "All Doctor" || a.doctor === filterDoctor;
      return dateMatch && doctorMatch;
    });
  }, [filterDate, filterDoctor]);

  const handleSearch = () => {
    setFilterDate(date);
    setFilterDoctor(doctor);
  };

  const columns = [
    { name: "SNO.", selector: (row) => row.sno, width: "70px", cell: (row) => <span className="font-bold text-gray-500">{row.sno}.</span> },
    { 
      name: "DATE & TIME", 
      selector: (row) => row.date, 
      cell: (row) => (
        <div className="py-2">
          <div className="font-bold text-gray-800">{row.date}</div>
          <div className="text-[12px] font-bold text-gray-400 flex items-center gap-1"><Clock size={10}/> {row.time}</div>
        </div>
      )
    },
    { name: "APPT ID", selector: (row) => row.id, cell: (row) => <span className="text-[#4F6EEA] font-bold text-xs">{row.id}</span> },
    { name: "PATIENT", selector: (row) => row.patient, cell: (row) => <span className="font-bold text-gray-700">{row.patient}</span> },
    { name: "DOCTOR", selector: (row) => row.doctor, cell: (row) => <span className="font-semibold text-gray-600">{row.doctor}</span> },
    { name: "STATUS", cell: () => <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-amber-100 text-amber-700">Pending</span> },
    { 
      name: "VERIFY BY", 
      width: "150px",
      cell: (row) => (
        <div className="flex items-center gap-1.5 text-gray-600 font-medium">
          <ShieldCheck size={14} className="text-blue-500" /> {row.verifyBy}
        </div>
      )
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        background: "var(--bg-brand-gradient)",
        color: "#ffffff",
        fontWeight: "800",  
        fontSize: "12px",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
      },
    },
    pagination: {
      style: {
        border: "none",
        color: "#6b7280",
        justifyContent: "flex-end",
        paddingRight: "40px",
        paddingTop: "10px",
        paddingBottom: "10px",
      },
    },
  };

  return (

  <div className="w-full min-h-screen pt-16 md:pt-6 overflow-x-hidden">
<main className="bg-white rounded-md shadow-sm border border-gray-200 mt-0 md:mt-6">       
   <div className="p-1 md:p-12">
   

          {/* Filters Container */}
          <div className="bg-gray-50 p-5 rounded-md border border-gray-100 flex flex-col md:flex-row gap-4 mb-8 items-center">
        <div className="w-full flex-1 relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="date" 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-orange-300" 
            />
          </div>
           <div className="w-full flex-1 relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-md text-sm appearance-none outline-none">
              {doctors.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
            <button 
              onClick={handleSearch} 
              className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-10 py-2.5 rounded-md font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-100 transition-all active:scale-95"
            >
              <Search size={16} /> Search
            </button>
          </div>

          {/* MOBILE VIEW */}
          <div className="block md:hidden space-y-4">
            {filteredData.map((item) => (
              <div key={item.id} className="bg-white p-5 border border-gray-100 shadow-sm rounded-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md mb-1 block w-fit italic">{item.id}</span>
                    <h3 className="text-lg font-black text-gray-800">{item.patient}</h3>
                  </div>
                  <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase bg-amber-100 text-amber-700">Pending</span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Doctor</p>
                    <p className="text-sm font-bold text-gray-700">{item.doctor}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Schedule</p>
                    <p className="text-sm font-bold text-gray-700">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW */}
          <div className="hidden md:block overflow-hidden border border-gray-50 rounded-md">
            <DataTable
              columns={columns}
              data={filteredData}
              customStyles={customStyles}
              pagination
              paginationPerPage={5}
              highlightOnHover
              responsive
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Totalapp;