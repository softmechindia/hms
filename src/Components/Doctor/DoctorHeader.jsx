import React from "react";
import { Search } from "lucide-react";

function DoctorHeader() {
  return (
    <div className="w-full">
      {/* 
        Removed hidden mobile classes. 
        Using flex-row and min-w structural layouts ensures it preserves the desktop layout even on smaller screens.
      */}
      <div className="bg-[#4F6EEA] h-12 rounded-t-sm flex items-center shadow-sm px-4">
        <div className="flex w-full items-center justify-between gap-5">
          
          {/* Spacer that pushes the search box to the right side */}
          <div className="flex-grow"></div>

          {/* 
            Search box: Replaced 'lg:w-[calc(22%-24px)]' with a constant width/max-width.
            Using 340px ensures it exactly matches the width of your right-side patient queue table from image_708c85.png.
          */}
          <div className="w-[340px] flex items-center">
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