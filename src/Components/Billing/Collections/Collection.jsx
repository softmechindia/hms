import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import {
  Search,
  User,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  ChevronDown,
  Calendar
} from "lucide-react";

function Collections() {
  const [patientId, setPatientId] = useState("");
  const [doctor, setDoctor] = useState("All Doctor");
  const [filterPatientId, setFilterPatientId] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("All Doctor");
  const [date, setDate] = useState("");
const [toDate, setToDate] = useState("");

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
        backgroundColor: "#082cbb",
        color: "#ffffff",
        fontWeight: "800",
        fontSize: "12px",
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
   <div className="w-full min-h-screen pt-16 md:pt-6 overflow-x-hidden p-1 md:p-6">

             {/* FILTER SECTION */}
      <div className="bg-white p-4 rounded-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center">

        {/* FROM DATE */}
        <div className="w-full flex-1">
          <label className="block text-xs text-gray-500 mb-1">
            From Date
          </label>

          <div className="relative">
      

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-sm text-sm outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* TO DATE */}
        <div className="w-full flex-1">
          <label className="block text-xs text-gray-500 mb-1">
            To Date
          </label>

          <div className="relative">
   

            <input
              type="date"
              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* DOCTOR */}
        <div className="w-full flex-1">
          <label className="block text-xs text-gray-500 mb-1">
            Doctor
          </label>

          <div className="relative">
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-sm text-sm appearance-none outline-none focus:ring-1 focus:ring-blue-400"
            >
              {doctors.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

        </div>
        {/* SEARCH BUTTON */}

        <button
          onClick={handleSearch}
          className="w-full md:w-auto mt-0 md:mt-5 border border-gray-200 bg-blue-600 hover:bg-blue-700 text-white  text-gray-700 px-6 py-2.5 rounded-sm text-sm flex items-center justify-center gap-2 transition-all"
        >
          <Search size={16} />
          Search
        </button>

   



      </div>

        <div className=" mt-4">

      <div className="bg-white p-4 rounded-sm border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">

  {/* Total Collections */}
  <div className="flex items-center gap-4 w-full">
    <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 text-purple-600"
        fill="none" 
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6c-4.418 0-8 1.343-8 3s3.582 3 8 3 8-1.343 8-3-3.582-3-8-3zm0 0v12m-8-9v6c0 1.657 3.582 3 8 3s8-1.343 8-3V9"
        />
      </svg>
    </div>

    <div>
      <p className="text-sm text-gray-500 font-medium">
        Total Collections
      </p>
      <h2 className="text-3xl font-bold text-purple-700">
        ₹ 24,560.00
      </h2>
      <p className="text-xs text-gray-400 mt-1">
        In Selected Range
      </p>
    </div>
  </div>

  {/* Divider */}
  <div className="hidden md:block h-16 w-px bg-gray-200"></div>

  {/* Cash Collection */}
  <div className="flex items-center gap-3 w-full">
    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
      💵
    </div>

    <div>
      <p className="text-sm text-gray-500 font-medium">
        Cash Collection
      </p>
      <h3 className="text-2xl font-bold text-green-600">
        ₹ 15,240.00
      </h3>
    </div>
  </div>

  {/* Divider */}
  <div className="hidden md:block h-16 w-px bg-gray-200"></div>
{/* Refund Amount */}
  <div className="flex items-center gap-3 w-full">
    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
      ↩️
    </div>

    <div>
      <p className="text-sm text-gray-500 font-medium">
        Refund Amount
      </p>
      <h3 className="text-2xl font-bold text-red-500">
        ₹ 500.00
      </h3>
    </div>
  </div>

</div>
</div>

      {/* TABLE SECTION */}
      <div className=" mt-4">
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
  
  );
}

export default Collections;