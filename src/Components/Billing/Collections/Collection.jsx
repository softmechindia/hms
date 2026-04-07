import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import {
  Search, User, ChevronRight,
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
        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-black uppercase tracking-wider">
          {row.method}
        </span>
      )
    },
    {
      name: "ACTION",
      width: "80px",
      cell: () => (
        <button className="p-2 hover:bg-orange-100 text-orange-500 rounded-md transition-all active:scale-90">
          <ChevronRight size={18} />
        </button>
      )
    }
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
        paddingRight: "40px",
      },
    },
  };

  return (
    <div className="w-full h-[100vh]    overflow-hidden ">
      <div className=" bg-white rounded-md shadow-sm border border-gray-200 mt-6">

        <div className="p-1 md:p-12">
          <h1 className="text-xl font-black font-roboto text-gray-800 mb-6 tracking-tight uppercase text-center md:text-left">
           Collections
          </h1>


          <div className="bg-gray-50 p-4 md:p-5 rounded-md border border-gray-100 flex flex-col md:flex-row gap-4 mb-8 items-center">
            <div className="w-full md:flex-[2] relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Patient ID..."
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-orange-300"
              />
            </div>

            <div className="w-full md:flex-1 relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-md text-sm appearance-none outline-none focus:ring-1 focus:ring-orange-300"
              >
                {doctors.map((doc) => <option key={doc} value={doc}>{doc}</option>)}
              </select>
            </div>

            <button
              onClick={handleSearch}
              className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-10 py-2.5 rounded-md font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-100 transition-all active:scale-95"
            >
              <Search size={18} /> Search
            </button>
          </div>

          {/* MOBILE VIEW - Modern Cards */}
          <div className="block md:hidden space-y-4">
            {filteredData.map((item) => (
              <div key={item.id} className="bg-white p-5 border border-gray-100 shadow-sm rounded-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <span className="font-black text-emerald-600 text-lg">{item.amount}</span>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md uppercase mb-1 block w-fit">
                      {item.userId}
                    </span>
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
                    <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{item.method}</span>
                  </div>
                </div>
                <button className="w-full py-3 bg-orange-50 text-orange-600 rounded-md font-bold text-sm flex items-center justify-center gap-2 active:bg-orange-100">
                  View Receipt <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW - Balanced Table */}
          <div className="hidden md:block overflow-hidden border border-gray-50 rounded-md">
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
                  <p className="font-medium">No records found</p>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collections;