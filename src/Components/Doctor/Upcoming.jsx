import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { GetUpcomingAppointments } from "../../api/endpoints/authApi";
import { Search, Clock } from "lucide-react";

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

const columns = [
  { name: "Sno.", selector: (row, i) => i + 1, sortable: true, width: "80px" },
  { name: "Date", selector: (row) => row.appointment_date, sortable: true },
  {
    name: "Appt. Id",
    selector: (row) => row.appointment_id,
    sortable: true,
    cell: (row) => (
      <span className="font-bold text-indigo-600">{row.appointment_id}</span>
    ),
  },
  { name: "Appt. Time", selector: (row) => row.appointment_time, sortable: true },
  { name: "Patient Name", selector: (row) => row.patient_name, sortable: true },
  { name: "Assigned Doctor", selector: (row) => row.doctor_name, sortable: true },
];

// Helper Function: Normalizes any date input into standard YYYY-MM-DD format
const formatDateToYYYYMMDD = (dateStr) => {
  if (!dateStr) return "";

  if (typeof dateStr === "string" && dateStr.includes("T")) {
    return dateStr.split("T")[0];
  }

  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return String(dateStr).trim();

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

function UpComing() {
  // Aaj ki date YYYY-MM-DD format mein
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchUpcomingAppointment = async (dateToSearch) => {
    const searchDate = dateToSearch || selectedDate;

    // Prevents fetching past date records if typed manually
    if (searchDate < today) {
      alert("Past dates are not allowed. Please select today or a future date.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        doctor_id: "DR0001",
        appointment_date: searchDate,
      };

      const response = await GetUpcomingAppointments(payload);

      const rawList = response?.fullData?.data || response?.data || [];
   

      if (Array.isArray(rawList)) {
        const targetDate = formatDateToYYYYMMDD(searchDate);
        
        const filteredList = rawList.filter((item) => {
          if (!item.appointment_date) return false;
          const itemFormattedDate = formatDateToYYYYMMDD(item.appointment_date);
          return itemFormattedDate === targetDate;
        });

        setData(filteredList);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingAppointment(today);
  }, []);

  return (
    <div className="w-full h-[100vh] overflow-hidden">
      <div className="bg-white shadow-2xl overflow-hidden border border-slate-700/10">
        {/* Search Bar & Date Picker */}
        <div className="p-6 border-b border-gray-100 bg-slate-50/50">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-1">
                Filter by Date
              </label>
              <input
                type="date"
                min={today} /* 👈 Pure past dates ko UI calendar mein disable kar deta hai */
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-slate-700 transition-all w-full sm:w-64 font-medium"
              />
            </div>

            <button
              onClick={() => fetchUpcomingAppointment(selectedDate)}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20 active:scale-95 font-bold h-[46px] disabled:opacity-50 cursor-pointer"
            >
              <Search size={18} />
              {loading ? "Searching..." : "Search Records"}
            </button>
          </div>
        </div>

        {/* Results Table */}
        <div className="px-2 pb-2">
          <DataTable
            columns={columns}
            data={data}
            progressPending={loading}
            customStyles={customStyles}
            pagination
            highlightOnHover
            responsive
            pointerOnHover
            noDataComponent={
              <div className="py-20 text-center">
                <Clock size={48} className="mx-auto mb-4 text-slate-200" />
                <p className="text-slate-400 font-medium">
                  No appointments found for {selectedDate}.
                </p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default UpComing;