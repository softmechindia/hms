import React, { useState } from "react";
import { Search } from "lucide-react";
import { SearchPatients } from "../../api/endpoints/authApi";

function DoctorHeader() {
  // SEARCH & DROPDOWN STATES
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownPatients, setDropdownPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value) => {
    setSearchQuery(value);

    if (!value.trim()) {
      setDropdownPatients([]);
      return;
    }

    try {
      setLoading(true);
      const payload = { search_by: value };
      const response = await SearchPatients(payload);

      const apiData = response?.fullData || response?.data || response;
      
      const patientList = Array.isArray(apiData) 
        ? apiData 
        : Array.isArray(apiData?.data) 
        ? apiData.data 
        : [];

      if (patientList.length > 0) {
        const formatted = patientList.map((patient) => ({
          id: patient.userID || patient.id || patient.patient_id || "N/A",
          name: patient.user_name || patient.patient_name || patient.name || patient.full_name || "",
          mobile: patient.mobile_no || patient.mobile || patient.phone || "N/A",
          gender: patient.gender || "",
          age: patient.age || ""
        }));

        setDropdownPatients(formatted);
      } else {
        setDropdownPatients([]);
      }
    } catch (err) {
      console.error("Error fetching patients:", err);
      setDropdownPatients([]);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="flex flex-row w-full items-center h-10 overflow-visible z-30">
      

      <div className="bg-[#4F6EEA] h-full w-full lg:w-[78%] shrink-0 "></div>


      <div className="bg-[#4F6EEA]  h-full px-2 flex items-center justify-center w-full lg:flex-1 min-w-0 ">
        <div className="relative w-full">
          
          {/* Input container inside Red bar */}
         <div className="flex items-center bg-white border border-slate-200 rounded-sm shadow-sm px-2 py-0.5 w-full h-8 -ml-2">
            <Search size={15} className="text-slate-400 mr-1.5 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search Patient ID & Mobile No..."
              className="bg-transparent outline-none text-xs sm:text-sm w-full text-slate-700 font-medium placeholder:text-slate-400 min-w-0"
            />

            {/* Internal Loading Indicator */}
            {loading && (
              <div className="text-xs text-gray-400 animate-pulse ml-1">
                ...
              </div>
            )}
          </div>

          {/* Dropdown Card Options List */}
          {!loading && dropdownPatients.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-sm shadow-lg max-h-60 overflow-y-auto z-50 mt-1">
              {dropdownPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => {
                    setSearchQuery(patient.name);
                    setDropdownPatients([]);
                  }}
                  className="px-3 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-0 text-xs sm:text-sm flex flex-col gap-0.5 group transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-800 group-hover:text-[#4F6EEA] truncate">
                      {patient.name || "Unknown Name"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1 py-0.5 rounded shrink-0 ml-1">
                      ID: {patient.id}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-500">
                    <span>Mob: {patient.mobile}</span>
                    <span>
                      {patient.age ? `${patient.age} Yrs ${patient.gender ? `(${patient.gender})` : ""}` : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default DoctorHeader;