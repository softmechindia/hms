import React, { useState } from "react";

import SendLetterModal from "../../Components/Doctor/Popup/Send-Letter-Popup";
function PatientForm() {

  
  const cities = [
    "Amritsar", "Jalandhar", "Kapurthala", "Patiala", "Malout", "Malerkotla",
    "Mansa", "Moga", "Phillour", "Ajitgarh", "Muktsar", "Rupnagar", "Himachal",
    "Jammu", "Ambala", "Sangrur", "Faridkot", "Pathankot", "Kharar [Mohali]",
    "Firozpur", "Fatahbad", "Fatehgarh Sahib", "Bhogpur", "Hoshiarpur"
  ];

  const Occupations = [
    "Architect", "Agriculture", "Businessman", "Driver", "Electrician", "Engineer", "Farmer",
    "Labour", "Lawyer", "Mechanic", "Policeman", "Teacher", "Workers", "House Wife",
    "Student", "Retired", "Govt Job", "NRI", "Doctor", "Service", "Self Employed"
  ];

  const treatments = ["Select Treatment", "Ankylosing Spondylitis", "URTI", "Deworming", "Deworming double",
    "RA", "PIVD", "IBANDRONATE", "OA", "Central sensitisation", "VAGINITIS", "Scleroderma", "Gout", "Plantar fasciitis"
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allTreatments, setAllTreatments] = useState(treatments);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Select Treatment");

  const specialInstructions = [
    "Cold", "Alc/Tob", "Cnt", "Prec", "R/BP", "N/Sugar",
    "OA", "S/S", "Hypo", "PF", "DC", "F/P", "Wt", "no steroid"
  ];
  const inputStyle = "border border-gray-300 p-1 w-full outline-none";

  const [rows, setRows] = useState([
    { id: 1, medicine: '', description: '', remark: '' },
    { id: 2, medicine: '', description: '', remark: '' },
    { id: 3, medicine: '', description: '', remark: '' }
  ]);

  const addRow = () => {
    const newRow = {
      id: Date.now(), 
      medicine: '',
      description: '',
      remark: ''
    };
    setRows([...rows, newRow]);
  };


  const removeRow = (id) => {
  
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    }
  };


  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  return (

    <div className="max-w-7xl mx-auto">

     <div className="bg-[#fdfdf7] p-3 border-t border-l border-r border-gray-300 text-sm space-y-3 rounded-t-sm">

    
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          <input type="text" placeholder="Patient Id" className={inputStyle} />
          <input type="date" className={inputStyle} />
          <input type="text" placeholder="Patient Name" className={inputStyle} />

          <select className={inputStyle}>
            <option>Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input type="number" placeholder="Year" className={inputStyle} />
          <input type="number" placeholder="Age" className={inputStyle} />

          <select className={inputStyle}>
            <option>Marital</option>
            <option>Married</option>
            <option>Unmarried</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <input type="text" placeholder="Select Educations" className={inputStyle} />
          <select className={inputStyle} >
            <option>Occupations</option>
            {Occupations.map((Occupation, index) => (
              <option key={index}>{Occupation}</option>
            ))}
          </select>


          <input type="text" placeholder="Address" className={inputStyle} />

          <select className={inputStyle}>
            <option>City</option>
            {cities.map((city, index) => (
              <option key={index}>{city}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Mobile Number"
            className={inputStyle}
            maxLength={10}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
          />

          <button className="border border-gray-300 px-4 py-1 rounded-full text-gray-400 bg-white hover:bg-gray-50">
            + REVIEW
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
          <input type="text" placeholder="Comments" className={inputStyle} />
          <input type="text" placeholder="Ref By" className={inputStyle} />

          <button onClick={() => setIsModalOpen(true)} className="bg-[#F97316] hover:bg-orange-600 text-white px-4 py-1 rounded shadow-sm">
            Send Letter
          </button>

          <button className="bg-[#4F6EEA] text-white px-4 py-1 rounded border border-gray-300">
            Last Reports
          </button>

          <button className="bg-[#3d4a61] text-white px-4 py-1 rounded border border-gray-300">
            Update Data
          </button>

          <SendLetterModal isOpen={isModalOpen} onClose={() =>setIsModalOpen(false)}/>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-2">
          <input type="text" placeholder="BP S" className={inputStyle} />
          <input type="text" placeholder="BP D" className={inputStyle} />
          <input type="text" placeholder="Fever" className={inputStyle} />
          <input type="text" placeholder="WT" className={inputStyle} />
          <input type="text" placeholder="FT" className={inputStyle} />
          <input type="text" placeholder="INC" className={inputStyle} />
          <input type="text" placeholder="BMI" className={inputStyle} />

          <select className={inputStyle}>
            <option>Vegetarian</option>
            <option>Non Vegetarian</option>
            <option>Eggitarian</option>
          </select>
        </div>

 
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {["HB", "TLC", "PLT", "CREATININE", "SGOT", "CRP", "ESR"].map((item) => (
            <div key={item} className="flex items-center gap-1">
              <span className="font-bold text-xs">{item}</span>
              <input
                type="text"
                placeholder={item}
                className="border border-gray-300 p-1 w-full outline-none"
              />
              <input
                type="text"
                placeholder={item}
                className="border border-gray-300 p-1 w-full outline-none"
              />
            </div>
          ))}
        </div>

      </div>

<div className=" p-1 border-gray-200 border-t border-l border-r bg-[#FBFCFF]">
  <table className="w-full text-sm border-separate border-spacing-y-2">
    <tbody>


      <tr>
        <td className="pl-3 pr-4 py-3 font-bold text-gray-700 w-32 whitespace-nowrap">
          Diagnosis
        </td>
        <td className="py-2">
    <textarea
  placeholder="Enter Diagnosis"
  className="w-full outline-none border-b border-gray-300 focus:border-orange-500 pb-0.5 text-sm leading-none transition-all bg-transparent placeholder:text-slate-400"
/>
        </td>
      </tr>

      <tr>
        <td className="pl-3 pr-4 py-3 font-bold text-gray-700 w-32 whitespace-nowrap">
          Notes
        </td>
        <td className="py-2">
          <textarea
            type="text"
            placeholder="Enter Notes"
  className="w-full outline-none border-b border-gray-300 focus:border-orange-500 pb-0.5 text-sm leading-none transition-all bg-transparent placeholder:text-slate-400"
          />
        </td>
      </tr>

      {/* Self Notes */}
      <tr>
        <td className="pl-3 pr-4 py-3 font-bold text-gray-700 w-32 whitespace-nowrap">
          Self Notes
        </td>
        <td className="py-2">
          <textarea
            placeholder="Enter Self Notes"
            className="w-full outline-none border-b border-gray-300 focus:border-orange-500 pb-0.5 text-sm leading-none transition-all bg-transparent placeholder:text-slate-400"
          />
        </td>
      </tr>

      {/* Special Instructions */}
      <tr>
        <td className="pl-3 pr-4 py-3 font-bold text-gray-700 w-32 whitespace-nowrap align-top pt-5">
          Spl. Inst.
        </td>
        <td className="py-2">

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 mb-3">
            {specialInstructions.map((item, index) => (
              <button
                key={index}
                type="button"
                className="bg-white text-red-600 text-[11px] font-bold border border-red-200 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white transition-colors shadow-sm"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Underline Input */}
          <textarea
            type="text"
            placeholder="Enter Spl. Instruction"
            className="w-full outline-none border-b border-gray-300 focus:border-orange-500 pb-0.5 text-sm leading-none transition-all bg-transparent placeholder:text-slate-400"
          />
        </td>
      </tr>

    </tbody>
  </table>
</div>


 <div className="flex flex-col items-center justify-center w-full border-t border-l border-r border-gray-300 ">
  <div className="flex items-center justify-center gap-4 mt-2 mb-2">
          <h2 className="font-bold text-slate-700 whitespace-nowrap">
            Treatment
          </h2>

          <div className="relative w-full md:w-[500px]">

            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="border border-slate-300 p-2 w-full rounded-md bg-white text-sm cursor-pointer shadow-sm flex justify-between items-center hover:border-orange-400"
            >
              <span className={selectedValue === "Select Treatment" ? "text-gray-400" : "text-slate-700"}>
                {selectedValue}
              </span>
              <svg className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {showDropdown && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-md shadow-xl p-2 animate-in fade-in zoom-in duration-100">


           <div className="flex gap-2 mb-2">
  <input
    type="text"
    autoFocus
    placeholder="Type new or search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter" && searchTerm && !allTreatments.includes(searchTerm)) {
    
        setAllTreatments([searchTerm, ...allTreatments]);
        setSelectedValue(searchTerm);
        setSearchTerm("");
        setShowDropdown(false);
      }
    }}
    className="flex-1 border border-orange-200 p-1.5 text-sm rounded outline-none focus:border-orange-500"
  />
</div>


      
                <div className="max-h-48 overflow-y-auto border-t border-slate-100 pt-1">
                  {allTreatments
                    .filter(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((treatment, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedValue(treatment);
                          setShowDropdown(false);
                          setSearchTerm("");
                        }}
                        className="px-3 py-2 text-sm text-slate-600 hover:bg-orange-50 hover:text-orange-700 cursor-pointer rounded"
                      >
                        {treatment}
                      </div>
                    ))}
                  {allTreatments.filter(t => t.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && !searchTerm && (
                    <div className="text-center py-2 text-gray-400 text-xs italic">No treatments found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

<div className="w-full flex justify-center  ">
  <div className="w-full max-w-12xl  bg-white  overflow-hidden mb-2 ">
    <div className="overflow-x-auto">
      <table className="w-full text-left  ">
        <thead>
          <tr className="bg-slate-50">
            <th className="p-2 font-semibold text-slate-700 w-1/3  border-t border-b border-r border-slate-200">Medicine</th>
            <th className="p-2 font-semibold text-slate-700 w-1/4   border-t border-b border-r border-slate-200">Description</th>
            <th className="p-2 font-semibold text-slate-700 w-1/4  border-t border-b border-r border-slate-200">Remark</th>
            <th className="p-2 text-center border-t border-b border-slate-200">
              <button
                onClick={addRow}
                className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded text-sm font-medium transition-colors whitespace-nowrap"
              >
                Add More
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="p-1 border-t border-b border-slate-200">
                <input
                  type="text"
                  placeholder="Medicine"
                  value={row.medicine}
                  onChange={(e) => handleInputChange(row.id, 'medicine', e.target.value)}
                  className="w-full py-1.5 px-2 rounded outline-none placeholder-slate-400 text-slate-600 text-sm"
                />
              </td>

              <td className="p-1 border border-slate-200">
                <input
                  type="text"
                  placeholder="Description"
                  value={row.description}
                  onChange={(e) => handleInputChange(row.id, 'description', e.target.value)}
                  className="w-full py-1.5 px-2 rounded outline-none placeholder-slate-400 text-slate-600 text-sm"
                />
              </td>

              <td className="p-1 border border-slate-200">
                <input
                  type="text"
                  placeholder="Notes"
                  value={row.remark}
                  onChange={(e) => handleInputChange(row.id, 'remark', e.target.value)}
                  className="w-full py-1.5 px-2 rounded outline-none placeholder-slate-400 text-slate-600 text-sm"
                />
              </td>

              <td className="p-1 text-center border-t border-b border-slate-200">
                <button
                  onClick={() => removeRow(row.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-medium transition-colors"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>





  <div className=" border-gray-200 border-l border-r p-3">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">

      <div className="md:col-span-2 flex flex-col sm:flex-row items-start gap-2 sm:gap-4 py-4 group">
        <label className="text-sm w-full sm:w-32 shrink-0 mt-1.5 font-bold text-gray-800">
          Tests
        </label>
        <div className="flex flex-col w-full min-w-0">
    
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar whitespace-nowrap">
            {["1", "2", "Oa", "Fm", "An", "Scl", "Vaginitis", "RA", "PIVD", "Gout", "PIVD L"].map((test, index) => (
              <span
                key={index}
                className="bg-white border border-orange-200 text-orange-600 text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm hover:bg-orange-500 hover:text-white cursor-pointer transition-all flex-shrink-0"
              >
                {test}
              </span>
            ))}
          </div>

          <div className="relative w-full">
            <input
              type="text"
              placeholder="Select Test"
              className="w-full outline-none border-b border-gray-300 focus:border-orange-500 pb-1 text-sm transition-all bg-transparent placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3 group">
        <label className="text-sm w-full sm:w-32 shrink-0 font-bold text-gray-800">
          Additional Test 
        </label>
        <input
          type="text"
          placeholder="Enter Notes"
          className="w-full outline-none border-b border-gray-300 focus:border-orange-500 pb-0.5 text-sm leading-none transition-all bg-transparent placeholder:text-slate-400"

        />
      </div>


  
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3 group">
        <label className="text-sm w-full sm:w-32 shrink-0 font-bold text-gray-800">
      Followup
        </label>
        <input
          type="text"
        placeholder="Enter Diagnosis"
          className="w-full outline-none border-b border-gray-300 focus:border-orange-500 pb-0.5 text-sm leading-none transition-all bg-transparent placeholder:text-slate-400"

        />
      </div>

    </div>
  </div>


    <div className="bg-[#f7f5d1] p-3 border-l border-r border-b border-gray-300">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 overflow-x-auto no-scrollbar">

    <div className="flex flex-wrap md:flex-nowrap items-center gap-4 min-w-max">
      {[
        { id: "exercise", label: "Daily Exercise" },
        { id: "physio", label: "Physiotherapist" },
      ].map((item) => (
        <label key={item.id} className="flex items-center gap-2 cursor-pointer group whitespace-nowrap">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <span className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
            {item.label}
          </span>
        </label>
      ))}
    </div>

    <div className="flex flex-wrap md:flex-nowrap items-center gap-2 min-w-max">

      <button className="bg-[#F97316] hover:bg-orange-600 text-white p-2 rounded shadow-sm transition-all flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      <button className="bg-[#F97316] hover:bg-orange-600 text-white px-4 py-2 rounded font-bold text-xs uppercase tracking-tight shadow-sm transition-all">
        Create New Visit
      </button>

      <button className="bg-[#3d4a61] hover:bg-[#23272b] text-white px-4 py-2 rounded font-bold text-xs uppercase tracking-tight shadow-sm transition-all">
        Save & Update
      </button>

      <button className="bg-[#00d05a] hover:bg-[#00b34d] text-white px-4 py-2 rounded font-bold text-xs uppercase tracking-tight shadow-sm transition-all">
        Save & Print
      </button>
    </div>
  </div>
</div>


   
      <style jsx>{`
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`}</style>


    </div>
  );
}

export default PatientForm;