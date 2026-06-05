import React, { useState, useEffect, useCallback, useMemo } from "react";
import DataTable from "react-data-table-component";
import { getCancelledAppointments, getDoctors } from "../../../api/endpoints/authApi"; 
import { Search, ShieldCheck, Clock, ChevronDown } from "lucide-react";

function CancelledAppointment() {
 
  const [fromDate, setFromDate] = useState("2026-03-16");
  const [toDate, setToDate] = useState("2026-05-16");
  const [selectedDoctor, setSelectedDoctor] = useState("All Doctor");
  const [appointments, setAppointments] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Get Doctors Data Dynamically
  const fetchDoctor = useCallback(async () => {
    try {
      const docResponse = await getDoctors(); 
      const doctors = docResponse?.Getdoctorsdata || docResponse?.fullData?.Getdoctorsdata || [];
      setDoctorsList(doctors);
    } catch (err) {
      console.error("Doctors API Fetch Failure:", err);
    }
  }, []);


  const fetchCancelledAppointments = useCallback(async (startRange, endRange) => {
    setIsLoading(true);
    setApiError("");


    const finalFromDate = startRange || fromDate;
    const finalToDate = endRange || toDate;

    const payload = {
      user_id: "ST0001",
      from_date: finalFromDate,
      to_date: finalToDate,
      doctor_id: "" 
    };

    console.log("%c[DEBUG] Requesting Dynamic Payload:", "color: #00ff00; font-weight: bold;", payload);

    try {
      const res = await getCancelledAppointments(payload);
      console.log("%c[DEBUG] Raw API Target Response:", "color: #00ffff; font-weight: bold;", res);

      let fetchedList = [];

    
      if (res?.fullData && Array.isArray(res.fullData.data)) {
        fetchedList = res.fullData.data;
      } else if (res?.data && Array.isArray(res.data)) {
        fetchedList = res.data;
      } else if (res?.data?.data && Array.isArray(res.data.data)) {
        fetchedList = res.data.data;
      } else if (Array.isArray(res)) {
        fetchedList = res;
      }

      console.log("%c[DEBUG] Setting Active Appointments State:", "color: #ffff00; font-weight: bold;", fetchedList);
      setAppointments(fetchedList);
    } catch (err) {
      console.error("[DEBUG] Network Layer Breakdown Exception:", err);
      setApiError("Failed to synchronize cancelled dataset from infrastructure endpoints.");
    } finally {
      setIsLoading(false);
    }
  }, [fromDate, toDate]);


  useEffect(() => {
  
    fetchCancelledAppointments("2026-03-16", "2026-05-16");
    fetchDoctor();
  }, []); 

 
  const handleSearch = (e) => {
    e.preventDefault();
    fetchCancelledAppointments(fromDate, toDate);
  };

  const filteredAppointments = useMemo(() => {
    if (!appointments || appointments.length === 0) return [];
    if (selectedDoctor === "All Doctor") return appointments;
    
    return appointments.filter((item) => {
      return item.doctor_name && item.doctor_name.toLowerCase().trim() === selectedDoctor.toLowerCase().trim();
    });
  }, [appointments, selectedDoctor]);

  const columns = [
    {
      name: "SNO.",
      selector: (row, index) => index + 1,
      width: "70px",
      cell: (row, index) => <span className="font-bold text-gray-500">{index + 1}.</span>,
    },
    {
      name: "DATE & TIME",
      selector: (row) => row.appointment_date,
      cell: (row) => (
        <div className="py-2">
          <div className="font-bold text-gray-800">{row.appointment_date}</div>
          <div className="text-[12px] font-bold text-gray-400 flex items-center gap-1">
            <Clock size={10} />
            {row.appointment_time || "N/A"}
          </div>
        </div>
      ),
    },
    {
      name: "APPT ID",
      selector: (row) => row.appointment_id || row.id,
      cell: (row) => <span className="text-[#4F6EEA] font-bold text-xs">{row.appointment_id || row.id}</span>,
    },
    {
      name: "PATIENT",
      selector: (row) => row.patient_name,
      cell: (row) => <span className="font-bold text-gray-700">{row.patient_name || "N/A"}</span>,
    },
    {
      name: "DOCTOR",
      selector: (row) => row.doctor_name,
      cell: (row) => <span className="font-semibold text-gray-600">{row.doctor_name || "N/A"}</span>,
    },
    {
      name: "STATUS",
      selector: (row) => row.vstatus,
      cell: (row) => {
        const statusText = row.vstatus || "Cancelled";
        return (
          <span className="px-3 py-1 rounded-sm text-[10px] font-black uppercase bg-red-100 text-red-700">
            {statusText}
          </span>
        );
      },
    },
    {
      name: "VERIFY BY",
      width: "150px",
      cell: (row) => (
        <div className="flex items-center gap-1.5 text-gray-600 font-medium">
          <ShieldCheck size={14} className="text-blue-500" />
          {row.verified_by || "N/A"}
        </div>
      ),
    },
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
        justify: "flex-end",
        paddingRight: "40px",
        paddingTop: "10px",
        paddingBottom: "10px",
      },
    },
  };

  return (
    <div className="w-full min-h-screen pt-16 md:pt-6 overflow-x-hidden p-1 md:p-6">
      <form onSubmit={handleSearch} className="bg-white p-4 rounded-sm border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="w-full">
          <label className="block text-xs text-gray-500 mb-1 font-semibold">From Date</label>
          <div className="relative">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-sm text-sm outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer pr-10"
            />
          </div>
        </div>

        <div className="w-full">
          <label className="block text-xs text-gray-500 mb-1 font-semibold">To Date</label>
          <div className="relative">
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-sm text-sm outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer pr-10"
            />
          </div>
        </div>

        <div className="w-full">
          <label className="block text-xs text-gray-500 mb-1 font-semibold">Doctor</label>
          <div className="relative">
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-sm text-sm appearance-none outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer pr-10"
            >
              <option value="All Doctor">All Doctor</option>
              {doctorsList.map((doc) => (
                <option key={doc.id || doc.userID} value={doc.user_name}>
                  {doc.user_name}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full border border-gray-200 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-sm text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 font-medium h-[38px]"
        >
          <Search size={16} />
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {apiError && <div className="mt-4 p-3 bg-red-100 text-red-700 text-sm rounded-sm">{apiError}</div>}

      <div className="mt-4">
        {isLoading ? (
          <div className="text-center py-10 font-medium text-gray-500">Loading appointments...</div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-10 font-medium text-gray-500 bg-white border border-gray-200 rounded-sm">
            No dynamic records found matching current timeline parameters.
          </div>
        ) : (
          <div className="hidden md:block overflow-hidden border border-gray-50 rounded-sm bg-white">
            <DataTable
              columns={columns}
              data={filteredAppointments}
              customStyles={customStyles}
              pagination
              paginationPerPage={5}
              highlightOnHover
              responsive
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CancelledAppointment;