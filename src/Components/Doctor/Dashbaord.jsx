import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { GetDoctorDashboardData } from "../../api/endpoints/authApi";
import { Users, Calendar, CheckCircle, Clock, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, LayoutDashboard, FileText } from "lucide-react";

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
      paddingRight: "40px",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
  },
};



// Table Columns
const columns = [
  {
    name: "Patient Name",
    selector: row => row.patient_name,
    sortable: true,
    cell: row => <span className="font-bold text-gray-500">{row.patient_name}</span>,
  },
  {
    name: "Doctor Name",
    selector: row => row.doctor_name,
    sortable: true,
    cell: row => (
      <div>
        <div className="font-bold text-gray-800">{row.doctor_name}</div>
      </div>
    ),
  },
  {
    name: "Appt. Date",
    selector: row => row.appointment_date,
    sortable: true,
    cell: row => <span className="text-indigo-600 font-bold text-xs">{row.appointment_date}</span>,
  },
  {
    name: "Appt. ID",
    selector: row => row.appointment_id,
    sortable: true,
    cell: row => <span className="font-bold text-gray-700">{row.appointment_id}</span>,
  },
  {
    name: "Appt. Time",
    selector: row => row.appointment_time,
    sortable: true,
    cell: row => <span className="font-semibold text-gray-600">{row.appointment_time}</span>,
  },
  {
    name: "Patient Waiting",
    selector: row => row.visit_time,
    sortable: true,
    cell: row => <span className="px-3 py-2 font-semibold text-gray-600">{row.visit_time}</span>,
  },
  {
    name: "Status",
    selector: row => row.vstatus,
    sortable: true,
    cell: row => (
      <span className={`px-2 py-1 rounded text-xs font-bold ${row.vstatus === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
        {row.vstatus}
      </span>
    ),
  },
];

function Dashboard() {

  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    total_appointments: 0,
    confirmed: 0,
    completed: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const payload = {
          doctor_id: "DR0001",
          from_date: "2026-06-01",
          to_date: "2026-06-30"
        };

        const response = await GetDoctorDashboardData(payload);
        console.log("Aapka Dynamic Data Aa Gaya:", response);

        const dataObj = response?.data ? response.data : response;

        
        if (dataObj) {
          const actualData = dataObj.fullData ? dataObj.fullData : dataObj;

          console.log("Success! Extracted from fullData:", actualData);

          setScheduleData(actualData.schedule || []);
          setSummary({
            total_appointments: actualData.summary?.total_appointments ?? 0,
            confirmed: actualData.summary?.confirmed ?? 0,
            completed: actualData.summary?.completed ?? 0,
          });
        } else if (dataObj && dataObj.summary) {
      
          setScheduleData(dataObj.schedule || []);
          setSummary({
            total_appointments: dataObj.summary?.total_appointments ?? 0,
            confirmed: dataObj.summary?.confirmed ?? 0,
            completed: dataObj.summary?.completed ?? 0,
          });
        }

      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="w-full min-h-screen p-4 bg-white">

      <div className="max-w-6xl mx-auto">


        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard count={summary.total_appointments} label="Total Appointments" icon={<Calendar className="text-indigo-600" />} color="bg-indigo-50" />
          <StatCard count={summary.confirmed} label="Confirmed" icon={<CheckCircle className="text-emerald-600" />} color="bg-emerald-50" />
          <StatCard count={summary.completed} label="Completed" icon={<Users className="text-amber-600" />} color="bg-amber-50" />
        </div>


        {/* Table Section */}
        <div className="bg-white rounded-t-md shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">Today's Schedule</h2>
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              View All
            </button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={scheduleData}
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