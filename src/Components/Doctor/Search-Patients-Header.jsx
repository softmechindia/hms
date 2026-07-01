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

      console.log("API RESP", response);

      const apiData = response?.fullData || response;

      if (apiData && apiData.success === 1 && Array.isArray(apiData.data)) {
        const formatted = apiData.data.map((patient) => ({
          id: patient.userID,
          name: patient.user_name,
          mobile: patient.mobile_no,
          gender: patient.gender,
          age: patient.age
        }));

        setDropdownPatients(formatted);
      } else {
        setDropdownPatients([]);
        console.warn("API structure match failed or success !== 1");
      }
    } catch (err) {
      console.error("Error fetching patients:", err);
      setDropdownPatients([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Navbar Container */}
      <div className="bg-[#4F6EEA] min-h-12 py-2 rounded-t-sm flex items-center shadow-sm px-4">
        <div className="flex w-full flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-5">
          
          {/* Logo / Title Space placeholder */}
          <div className="flex-shrink-0 text-white font-bold text-sm">
            HMS Dashboard
          </div>

          <div className="flex-grow"></div>

          {/* Search Box Wrapper Container (Responsive Width) */}
          <div className="relative w-full sm:w-[320px] md:w-[380px]">
            <div className="flex items-center bg-white border border-slate-200 rounded-sm shadow-sm px-3 py-1.5 w-full">
              <Search size={18} className="text-slate-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search Patient ID & Mobile Number..."
                className="bg-transparent outline-none text-sm w-full text-slate-700 font-medium placeholder:text-slate-400"
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
                    className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer border-b last:border-0 text-sm flex flex-col gap-0.5 group transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      {/* FIX 2: Fixed incorrect keys, used mapping formatted names */}
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-[#4F6EEA]">
                        {patient.name || "Unknown Name"}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        ID: {patient.id}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>Mob: {patient.mobile || "N/A"}</span>
                      <span>
                        {patient.age ? `${patient.age} Yrs (${patient.gender})` : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Result Found Popup Message */}
            {/* {!loading && searchQuery && dropdownPatients.length === 0 && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-sm shadow-lg p-3 text-center text-xs text-gray-400 z-50">
                No match found
              </div>
            )} */}
          </div>

        </div>
      </div>
    </div>
  );
}

export default DoctorHeader;