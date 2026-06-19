import React, { useState, useMemo, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import { getCollections, getDoctors } from "../../../api/endpoints/authApi";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  ChevronDown
} from "lucide-react";

function Collections() {

  // Helper to extract system local ISO Date dynamically
  const getLiveDateString = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - offset * 60 * 1000);
    return localToday.toISOString().split("T")[0];
  };

  const currentLiveDate = getLiveDateString();

  const [fromDate, setFromDate] = useState(currentLiveDate);
  const [toDate, setToDate] = useState(currentLiveDate);
  const [selectedDoctor, setSelectedDoctor] = useState("All Doctor");
  const [searchClickedDoctor, setSearchClickedDoctor] = useState("All Doctor");

  // Dynamic state pools
  const [appointments, setAppointments] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Storage for response's summary structure
  const [summaryMetrics, setSummaryMetrics] = useState({
    total_collections: 0,
    cash_collection: 0,
    refund_amount: 0
  });

  // 1. Fetch Active Doctors dynamically for the dropdown
  const fetchDoctorsData = useCallback(async () => {
    try {
      const response = await getDoctors();
      const fetchedDocs = response?.Getdoctorsdata || response?.fullData?.Getdoctorsdata || [];
      setDoctorsList(fetchedDocs);
    } catch (err) {
      console.error("Failed to load active doctors list:", err);
    }
  }, []);

  // 2. Fetch Dynamic Collections and Summary Metrics from API
  const fetchCollectionsDataset = useCallback(async (searchFromDate = "", searchToDate = "") => {
    setIsLoading(true);
    setApiError("");


    const payload = {
      user_id: "ST0001",
      from_date: searchFromDate,
      to_date: searchToDate,
    };




    try {
      const res = await getCollections(payload);
      console.log("[DEBUG] Raw API Response:", res);

      let rawRecords = [];
      if (res && Array.isArray(res.data)) {
        rawRecords = res.data;
      } else if (res?.fullData && Array.isArray(res.fullData.data)) {
        rawRecords = res.fullData.data;
      } else if (res?.data?.data && Array.isArray(res.data.data)) {
        rawRecords = res.data.data;
      }

      // Live Summary Object Extractor
      const summarySource = res?.summary || res?.fullData?.summary || res?.data?.summary;
      if (summarySource) {
        setSummaryMetrics({
          total_collections: summarySource.total_collections || 0,
          cash_collection: summarySource.cash_collection || 0,
          refund_amount: summarySource.refund_amount || 0
        });
      } else {
        setSummaryMetrics({ total_collections: 0, cash_collection: 0, refund_amount: 0 });
      }

      console.log("[DEBUG] State Me Set Hone Wala Final Data:", rawRecords);
      setAppointments(rawRecords);
    } catch (err) {
      console.error("Error synchronized with collections dataset stream:", err);
      setApiError("Failed to synchronize active financial ledger streams.");
    } finally {
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {

    fetchCollectionsDataset(currentLiveDate, currentLiveDate);
    fetchDoctorsData();
  }, [fetchCollectionsDataset, fetchDoctorsData, currentLiveDate]);

  // 3. Form Submission Handler
  const handleSearch = (e) => {
    e.preventDefault();

    if (!fromDate || !toDate) {
      alert("Please select both From Date and To Date first!");
      return;
    }

    // Sync current selection state to filter variable on submission
    setSearchClickedDoctor(selectedDoctor);
    fetchCollectionsDataset(fromDate, toDate);
  };

  // 4. Client side secondary filter for Doctor selection
  const filteredData = useMemo(() => {
    if (!appointments || appointments.length === 0) return [];
    if (searchClickedDoctor === "All Doctor") return appointments;

    return appointments.filter((item) => {
      const docName = item.doctor_name || "";
      return docName.toLowerCase().trim() === searchClickedDoctor.toLowerCase().trim();
    });
  }, [appointments, searchClickedDoctor]);

  // Columns layout schema matching the updated database payload structures
  const columns = [
    {
      name: "SNO.",
      selector: (row, index) => index + 1,
      width: "70px",
      cell: (row, index) => <span className="font-bold text-gray-500">{index + 1}.</span>
    },
    {
      name: "PATIENT DETAILS",
      selector: (row) => row.patient_name,
      cell: (row) => (
        <div className="flex flex-col py-2">
          <span className="font-bold text-xs text-gray-800">{row.patient_name || "N/A"}</span>
          <span className="text-xs font-bold text-gray-400">
            {row.user_id || "N/A"}
          </span>
        </div>
      ),
    },
    {
      name: "DOCTOR",
      selector: (row) => row.doctor_name,
      cell: (row) => <span className="font-semibold text-gray-600">{row.doctor_name || "N/A"}</span>
    },
    {
      name: "DATE & TIME",
      selector: (row) => row.created_date,
      cell: (row) => (
        <div className="py-2">

          <div className="font-bold text-xs text-gray-800">
            {row.created_date || "N/A"}
          </div>


        </div>
      )
    },
    {
      name: "AMOUNT",
      selector: (row) => row.grand_total,
      cell: (row) => <span className="font-black text-emerald-600 text-sm">₹{row.grand_total || "0"}</span>
    },
    {
      name: "PAYMENT-MODE",
      selector: (row) => row.payment_mode,
      cell: (row) => (
        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold">
          {row.payment_mode || "N/A"}
        </span>
      )
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
    <div className="w-full min-h-screen">

      {/* FILTER SECTION */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-4 rounded-md border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        <div className="flex-1 w-full">
          <label className="block text-xs text-gray-500 mb-1 font-semibold">From Date</label>
          <div className="relative">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-sm text-sm appearance-none outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer pr-2" />
          </div>
        </div>

        <div className="flex-1 w-full">
          <label className="block text-xs text-gray-500 mb-1 font-semibold">To Date</label>
          <div className="relative">
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-sm text-sm appearance-none outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer pr-3" />
          </div>
        </div>

        <div className="flex-1 w-full">
          <label className="block text-xs text-gray-500 mb-1 font-semibold">Doctor</label>
          <div className="relative">
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-sm text-sm appearance-none outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer pr-10"            >
              <option value="All Doctor">All Doctor</option>
              {doctorsList.map((doc) => (
                <option key={doc.id || doc.userID || doc.user_name} value={doc.user_name}>
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
          className="w-full md:w-24 shrink-0 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm flex items-center justify-center gap-2 transition-all disabled:bg-blue-400"
        >
          <Search size={16} />
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {apiError && <div className="mt-4 p-3 bg-red-100 text-red-700 text-sm rounded-sm">{apiError}</div>}

      {/* KPI METRICS VIEW AREA */}
      <div className="mt-4">
        <div className="bg-white p-4 rounded-sm border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Total Collections */}
          <div className="flex items-center gap-4 w-full">
            <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c-4.418 0-8 1.343-8 3s3.582 3 8 3 8-1.343 8-3-3.582-3-8-3zm0 0v12m-8-9v6c0 1.657 3.582 3 8 3s8-1.343 8-3V9" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Collections</p>
              <h2 className="text-3xl font-bold text-purple-700">
                ₹ {Number(summaryMetrics.total_collections).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </h2>
              <p className="text-xs text-gray-400 mt-1">In Selected Range</p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-16 w-px bg-gray-200"></div>

          {/* Cash Collection */}
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">💵</div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Cash Collection</p>
              <h3 className="text-2xl font-bold text-green-600">
                ₹ {Number(summaryMetrics.cash_collection).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </h3>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-16 w-px bg-gray-200"></div>

          {/* Refund Amount */}
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">↩️</div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Refund Amount</p>
              <h3 className="text-2xl font-bold text-red-500">
                ₹ {Number(summaryMetrics.refund_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </h3>
            </div>
          </div>

        </div>
      </div>

      {/* DATA VIEW AREA */}
      <div className="mt-4">
        {isLoading ? (
          <div className="text-center py-20 font-medium text-gray-400 bg-white border border-gray-200 rounded-sm">Syncing system ledgers...</div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-10 font-medium text-gray-500 bg-white border border-gray-200 rounded-sm">
            No dynamic records found matching current timeline parameters.
          </div>
        ) : (
          <>
            {/* MOBILE VIEW */}
            <div className="block md:hidden space-y-4">
              {filteredData.map((item, index) => (
                <div key={item.id || index} className="bg-white p-5 border border-gray-100 shadow-sm rounded-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4">
                    <span className="font-black text-emerald-600 text-lg">₹{item.grand_total || "0"}</span>
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-sm mb-1 block w-fit italic">
                        ID: {item.user_id || "N/A"}
                      </span>
                      <h3 className="text-lg font-black text-gray-800">{item.patient_name || "N/A"}</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4 mb-4">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Doctor</p>
                      <p className="text-sm font-bold text-gray-700">{item.doctor_name || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Payment</p>
                      <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 py-1 rounded-sm">
                        {item.payment_mode || "N/A"}
                      </span>
                    </div>
                  </div>
                  <button type="button" className="w-full py-3 bg-orange-50 text-orange-600 rounded-sm font-bold text-sm flex items-center justify-center gap-2 active:bg-orange-100">
                    View Receipt <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* DESKTOP VIEW */}
            <div className="hidden md:block overflow-hidden border border-gray-50 rounded-sm bg-white">
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
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Collections;