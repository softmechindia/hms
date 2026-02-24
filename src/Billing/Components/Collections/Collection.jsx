import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { 
  Search, User, Wallet, ChevronRight, 
  ChevronLeft, ChevronsLeft, ChevronsRight, Clock 
} from "lucide-react";

function Collections() {
  const [patientId, setPatientId] = useState("");
  const [doctor, setDoctor] = useState("All Doctor");
  const [filterPatientId, setFilterPatientId] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("All Doctor");

  const doctors = ["All Doctor", "Dr. Smith", "Dr. Johnson", "Dr. Brown"];

  const appointments = [
    { id: 1, sno: 1, name: "Ravi Kumar", userId: "PAT001", appointment: "10:30 AM", date: "2026-01-22", doctor: "Dr. Smith", amount: "₹500", method: "UPI" },
    { id: 2, sno: 2, name: "Amit Sharma", userId: "PAT002", appointment: "11:00 AM", date: "2026-01-22", doctor: "Dr. Johnson", amount: "₹1200", method: "Cash" },
  ];

  const filteredData = useMemo(() => {
    return appointments.filter((item) => {
      const matchPatientId = !filterPatientId || item.userId.toLowerCase().includes(filterPatientId.toLowerCase());
      const matchDoctor = filterDoctor === "All Doctor" || item.doctor === filterDoctor;
      return matchPatientId && matchDoctor;
    });
  }, [filterPatientId, filterDoctor]);

  const handleSearch = () => {
    setFilterPatientId(patientId);
    setFilterDoctor(doctor);
  };

  const columns = [
    { 
      name: "SNO.", 
      selector: (row) => row.sno, 
      width: "70px", 
      cell: (row) => <span className="font-bold text-gray-500">{row.sno}.</span> 
    },
    {
      name: "PATIENT DETAILS",
      selector: (row) => row.name,
      cell: (row) => (
        <div className="flex flex-col py-2">
          <span className="font-bold text-gray-800">{row.name}</span>
          <span className="text-[10px] font-mono text-orange-500 font-bold uppercase tracking-tight">{row.userId}</span>
        </div>
      ),
    },
    {
      name: "DOCTOR",
      selector: (row) => row.doctor,
      cell: (row) => <span className="font-semibold text-gray-600">{row.doctor}</span>
    },
    {
      name: "TIME",
      selector: (row) => row.appointment,
      width: "100px",
      cell: (row) => (
        <div className="flex items-center gap-1 text-gray-800 font-bold">
          <Clock size={12} /> {row.appointment}
        </div>
      )
    },
    {
      name: "AMOUNT",
      selector: (row) => row.amount,
      cell: (row) => <span className="font-black text-emerald-600 text-sm">{row.amount}</span>
    },
    {
      name: "PAYMENT",
      selector: (row) => row.method,
      cell: (row) => (
        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-sm text-[10px] font-black uppercase tracking-wider">
          {row.method}
        </span>
      )
    },
    {
      name: "ACTION",
      width: "80px",
      cell: () => (
        <button className="p-2 hover:bg-orange-100 text-orange-500 rounded-sm transition-all active:scale-90">
          <ChevronRight size={18} />
        </button>
      )
    }
  ];

  const customStyles = {
    headRow: {
      style: {
        background: "linear-gradient(90deg, #5B7CFA, #7DA0FA)",
        color: "#ffffff",
        fontWeight: "800",
        fontSize: "12px",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px", // fully rounded top corners
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
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-xl font-black text-gray-800 mb-6">Collections</h1>

        {/* Filters */}
        <div className="bg-white p-5 rounded-sm shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-[2] relative group">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500" />
            <input
              type="text"
              placeholder="Patient ID..."
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-sm text-sm outline-none focus:ring-1 focus:ring-orange-300 transition-all"
            />
          </div>

          <div className="flex-1 relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-sm text-sm appearance-none outline-none focus:ring-1 focus:ring-orange-300 cursor-pointer"
            >
              {doctors.map((doc) => <option key={doc} value={doc}>{doc}</option>)}
            </select>
          </div>

          <button onClick={handleSearch} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2.5 rounded-sm font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-100 transition-all active:scale-95">
            <Search size={18} /> Search
          </button>
        </div>

        {/* MOBILE VIEW */}
        <div className="block md:hidden space-y-4">
          {filteredData.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-sm border border-gray-100 shadow-sm rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="font-black text-emerald-600">{item.amount}</span>
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-sm uppercase mb-1 block w-fit">{item.userId}</span>
                  <h3 className="text-lg font-black text-gray-800">{item.name}</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4 mb-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Doctor</p>
                  <p className="text-sm font-bold text-gray-700">{item.doctor}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Payment</p>
                  <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-50 px-2 py-1 rounded-sm">{item.method}</span>
                </div>
              </div>
              <button className="w-full py-2.5 bg-orange-50 text-orange-600 rounded-sm font-bold text-sm flex items-center justify-center gap-2">
                View Receipt <ChevronRight size={16}/>
              </button>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW */}
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

export default Collections;
