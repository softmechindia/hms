import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { DoctorGetPatientList, SearchPatients } from "../../api/endpoints/authApi";
import { Search, Clock, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react";

const getTodayDate = () => new Date().toISOString().split('T')[0];

const customStyles = {
  headRow: { style: { background: "linear-gradient(90deg, #5B7CFA, #7DA0FA)", fontWeight: "800", fontSize: "12px", color: "#ffffff" } },
  pagination: { style: { border: "none", color: "#6b7280", justifyContent: "flex-end", paddingRight: "50px" } },
};

const columns = [
  { name: "#", selector: (row, index) => index + 1, sortable: true, width: "60px" },
  { name: "Patient Name", selector: row => row.user_name || "N/A", sortable: true },
  { name: "Patient ID", selector: row => row.userID, sortable: true },
  { name: "Mobile Number", selector: row => row.mobile_no, sortable: true },
  { name: "Address", selector: row => row.address, sortable: true },
  { name: "View Details", cell: () => <button className="text-indigo-600 font-medium hover:underline text-sm">View</button>, ignoreRowClick: true },
];

function PatientSearch() {
  const [searchPatient, setSearchPatient] = useState("");
  const [fromDate, setFromDate] = useState("2026-01-01"); // Set broad start date
  const [toDate, setToDate] = useState(getTodayDate());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      let response;
      if (searchPatient.trim() !== "") {
        response = await SearchPatients({ search_by: searchPatient });
      } else {
        response = await DoctorGetPatientList({
          doctor_id: "DR0001",
          search: "",
          from_date: fromDate,
          to_date: toDate,
        });
      }
      // Accessing the 'data' array based on your provided JSON structure
      const results = response?.data || response?.fullData?.data || [];
      setData(results);
    } catch (error) {
      console.error("API Error:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="w-full min-h-screen p-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="p-4 mb-6 bg-white shadow-sm border border-gray-100 rounded-md flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <input
              type="text"
              value={searchPatient}
              onChange={(e) => setSearchPatient(e.target.value)}
              placeholder="Search Patient ID/Mobile/Name"
              className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 w-full sm:w-64"
            />
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">From</label>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border border-gray-300 px-3 py-2 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">To</label>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border border-gray-300 px-3 py-2 rounded" />
            </div>
          </div>
          <button onClick={handleSearch} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded flex items-center gap-2 font-medium">
            <Search size={18} /> Search
          </button>
        </div>

        <div className="hidden md:block">
          <DataTable
            columns={columns}
            data={data}
            progressPending={loading}
            customStyles={customStyles}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30]}
            paginationIconFirstPage={<ChevronsLeft size={18} />}
            paginationIconLastPage={<ChevronsRight size={18} />}
            paginationIconNextPage={<ChevronRight size={18} />}
            paginationIconPreviousPage={<ChevronLeft size={18} />}
            highlightOnHover
            responsive
            noDataComponent={
              <div className="py-20 text-center text-gray-300">
                <Clock size={48} className="mx-auto mb-3 opacity-20" />
                <p className="font-medium">No patients found</p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default PatientSearch;