import React from "react";
import { Search } from "lucide-react";

function DoctorHeader() {
  return (
    <div className="w-full">

      <div className="bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF] h-12 rounded-t-sm flex items-center px-6 shadow-sm">

        <div className="flex w-full items-center justify-between lg:gap-6">

          <div className="hidden lg:block lg:flex-grow"></div>

          <div className="w-full lg:w-[calc(22%-24px)] min-w-[340px] flex items-center">
            <div className="flex items-center bg-white border border-slate-200 rounded-sm shadow-sm px-3 py-1.5 w-full">
              <Search size={18} className="text-slate-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search Patient ID & Mobile Number"
                className="bg-transparent outline-none text-sm w-full text-slate-700 font-medium"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DoctorHeader;