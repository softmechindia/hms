import React, { useEffect, useRef, useState } from "react";
import {
  getEducations,
  getOccupations,
  getCity,
  refByData,
  SplInstructionCategories,
  SplInstructions,
  TreatmentList
} from "../../api/endpoints/authApi";
import SendLetterModal from "../../Components/Doctor/Popup/Send-Letter-Popup";

// Reusable Custom Searchable Select Dropdown
const CustomSelect = ({ options, value, onChange, placeholder, getLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = (options || []).filter((item) => {
    const label = getLabel(item);
    return label?.toLowerCase().includes((search || value || "").toLowerCase());
  });

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            onChange(e.target.value);
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          className="w-full border border-gray-300 p-1 text-xs outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white pr-6"
        />
        <svg
          onClick={() => setIsOpen(!isOpen)}
          className={`w-3 h-3 absolute right-2 text-gray-500 cursor-pointer transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-sm shadow-md max-h-48 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((item, index) => {
              const label = getLabel(item);
              const key = typeof item === "object" ? item._id || item.id || index : index;
              return (
                <div
                  key={key}
                  onClick={() => {
                    onChange(label);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className="px-2 py-1.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors border-b border-gray-50 last:border-b-0"
                >
                  {label}
                </div>
              );
            })
          ) : (
            <div className="px-2 py-2 text-xs text-gray-400 text-center italic">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

function Form() {
  const initialFormState = {
    patient_id: "",
    name: "",
    mobile_no: "",
    education: "",
    occupation: "",
    city: "",
    address: "",
    ref_by: "",
    review_patient: "No",
    spl_instruction: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [educationList, setEducationsList] = useState([]);
  const [occupationsList, setOccupationsList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [referencesList, setReferencesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Special Instructions dynamic states
  const [categories, setCategories] = useState([]);
  const [activeCatId, setActiveCatId] = useState(null);
  const [subInstructions, setSubInstructions] = useState([]);
  const [loadingSub, setLoadingSub] = useState(false);

  // Treatment Dropdown States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allTreatments, setAllTreatments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Select Treatment");
  const treatmentDropdownRef = useRef(null);

  const errorMap = {};
  const msg = "";

  const inputStyle = "border border-gray-300 p-1 w-full outline-none text-xs";

  const getBorderClass = (field) => {
    if (!errorMessage) return "border-gray-300 focus-within:ring-2 focus-within:ring-blue-400";
    const isError = errorMap[field] && msg.includes(errorMap[field]);
    return isError
      ? "border-red-500 ring-2 ring-red-200"
      : "border-gray-300 focus-within:ring-2 focus-within:ring-blue-400";
  };

  const [rows, setRows] = useState([
    { id: 1, medicine: '', description: '', remark: '' },
    { id: 2, medicine: '', description: '', remark: '' },
    { id: 3, medicine: '', description: '', remark: '' }
  ]);

  const addRow = () => {
    const newRow = { id: Date.now(), medicine: '', description: '', remark: '' };
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

  // Utility function to extract data arrays safely
  const extractData = (res) => {
    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.fullData?.data)) return res.fullData.data;
    if (Array.isArray(res?.data?.data)) return res.data.data;
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eduRes, occRes, citRes, refRes, catRes, treatRes] = await Promise.all([
          getEducations().catch(() => []),
          getOccupations().catch(() => []),
          getCity().catch(() => []),
          refByData({}).catch(() => []),
          SplInstructionCategories().catch(() => []),
          TreatmentList ? TreatmentList().catch(() => []) : Promise.resolve([])
        ]);

        setEducationsList(extractData(eduRes));
        setOccupationsList(extractData(occRes));
        setCityList(extractData(citRes));
        setReferencesList(extractData(refRes));
        setCategories(extractData(catRes));
        setAllTreatments(extractData(treatRes));
      } catch (error) {
        console.error("Error fetching form options:", error);
      }
    };

    fetchData();
  }, []);

  // Treatment dropdown click outside handler
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (treatmentDropdownRef.current && !treatmentDropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Special Instruction Category handler
  const handleCategoryClick = async (cat) => {
    const catId = cat.id || cat._id;

    if (activeCatId === catId) {
      setActiveCatId(null);
      setSubInstructions([]);
      return;
    }

    setActiveCatId(catId);
    setLoadingSub(true);

    try {
      const res = await SplInstructions({ cat_id: String(catId) });
      const fetchedData = extractData(res);
      setSubInstructions(fetchedData);
    } catch (err) {
      console.error("Error fetching sub instructions:", err);
      setSubInstructions([]);
    } finally {
      setLoadingSub(false);
    }
  };

  // Special Instruction Option click handler
  const handleOptionClick = (item) => {
    const textToAdd =
      typeof item === "string"
        ? item
        : item.spl_instruction || item.instruction || item.name || item.title || "";

    if (!textToAdd.trim()) return;

    setFormData((prev) => ({
      ...prev,
      spl_instruction: prev.spl_instruction
        ? `${prev.spl_instruction}, ${textToAdd}`
        : textToAdd,
    }));
  };

  const handleFormInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Treatment display helper
  const getTreatmentName = (item) => {
    if (typeof item === "object" && item !== null) {
      return item.treatment_name || "";
    }
    return String(item || "");
  };

  // Treatment selection & dynamic table row fill handler
  const handleTreatmentSelect = (treatment) => {
    const displayName = getTreatmentName(treatment);
    setSelectedValue(displayName);
    setShowDropdown(false);
    setSearchTerm("");

    if (treatment && typeof treatment === "object") {
      // 1. Agar treatment object me medicines array maujood ho
      if (Array.isArray(treatment.medicines) && treatment.medicines.length > 0) {
        const formattedRows = treatment.medicines.map((med, idx) => ({
          id: Date.now() + idx,
          medicine: med.medicine_name || med.medicine || "",
          description: med.generic_name || med.description || "",
          remark: med.remark || med.notes || "",
        }));
        setRows(formattedRows);
      } 
      // 2. Agar object me single medicine data direct fields me ho
      else if (treatment.medicine_name || treatment.generic_name) {
        setRows([
          {
            id: Date.now(),
            medicine: treatment.medicine_name || "",
            description: treatment.generic_name || "",
            remark: treatment.remark || "",
          },
        ]);
      }
    }
  };

  // Treatment search filter
  const filteredTreatments = (allTreatments || []).filter((treatment) => {
    const name = getTreatmentName(treatment);
    return name.toLowerCase().includes((searchTerm || "").toLowerCase());
  });

  return (
    <div className="w-full min-h-screen max-w-full mx-auto flex flex-col gap-1 p-4 bg-slate-50">
      <div className="bg-[#fdfdf7] p-3 border-t border-l border-r border-gray-300 text-sm space-y-3 rounded-t-sm shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          <input type="text" placeholder="Patient Id" className={inputStyle} />
          <input type="date" className={inputStyle} />
          <input type="text" placeholder="Patient Name" className={inputStyle} />

          <select className={inputStyle}>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input type="number" placeholder="Year" className={inputStyle} />
          <input type="number" placeholder="Age" className={inputStyle} />

          <select className={inputStyle}>
            <option value="">Marital</option>
            <option>Married</option>
            <option>Unmarried</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <CustomSelect
            options={educationList}
            value={formData.education}
            placeholder="Select Education"
            onChange={(val) => setFormData((prev) => ({ ...prev, education: val }))}
            getLabel={(item) => (typeof item === "object" ? item.education_name || item.name || item.education || item.title : item)}
          />

          <CustomSelect
            options={occupationsList}
            value={formData.occupation}
            placeholder="Select Occupation"
            onChange={(val) => setFormData((prev) => ({ ...prev, occupation: val }))}
            getLabel={(item) => (typeof item === "object" ? item.occupation_name || item.name || item.occupation || item.title : item)}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleFormInputChange}
            className={`w-full ${inputStyle} ${getBorderClass("address")}`}
          />

          <CustomSelect
            options={cityList}
            value={formData.city}
            placeholder="Select City"
            onChange={(val) => setFormData((prev) => ({ ...prev, city: val }))}
            getLabel={(item) => (typeof item === "object" ? item.city_name || item.name || item.cityName || item.city : item)}
          />

          <input
            type="text"
            name="mobile_no"
            placeholder="Mobile Number"
            value={formData.mobile_no}
            maxLength={10}
            onChange={handleFormInputChange}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
            className={`w-full ${inputStyle} ${getBorderClass("mobile_no")}`}
          />

          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                review_patient: prev.review_patient === "Yes" ? "No" : "Yes",
              }))
            }
            className={`border px-4 py-1 rounded-full text-xs font-semibold transition-colors ${
              formData.review_patient === "Yes"
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"
            }`}
          >
            + REVIEW
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
          <input type="text" placeholder="Comments" className={inputStyle} />

          <CustomSelect
            options={referencesList}
            value={formData.ref_by}
            placeholder="Select Ref By"
            onChange={(val) => setFormData((prev) => ({ ...prev, ref_by: val }))}
            getLabel={(item) => (typeof item === "object" ? item.reference_name || item.ref_name || item.name || item.title : item)}
          />

          <button type="button" onClick={() => setIsModalOpen(true)} className="bg-[#F97316] hover:bg-orange-600 text-white px-4 py-1 rounded shadow-sm text-xs transition-colors">
            Send Letter
          </button>

          <button type="button" className="bg-[#4F6EEA] hover:bg-blue-600 text-white px-4 py-1 rounded border border-gray-300 text-xs transition-colors">
            Last Reports
          </button>

          <button type="button" className="bg-[#3d4a61] hover:bg-[#23272b] text-white px-4 py-1 rounded border border-gray-300 text-xs transition-colors">
            Update Data
          </button>

          <SendLetterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
            <option value="">Dietary</option>
            <option>Vegetarian</option>
            <option>Non Vegetarian</option>
            <option>Eggitarian</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {["HB", "TLC", "PLT", "CREATININE", "SGOT", "CRP", "ESR"].map((item) => (
            <div key={item} className="flex items-center gap-1">
              <span className="font-bold text-xs text-slate-600">{item}</span>
              <input
                type="text"
                placeholder={item}
                className="border border-gray-300 p-1 w-full outline-none text-xs"
              />
              <input
                type="text"
                placeholder={item}
                className="border border-gray-300 p-1 w-full outline-none text-xs"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="p-2 border-gray-200 border-t border-l border-r bg-[#FBFCFF]">
        <table className="w-full text-sm border-separate border-spacing-y-2">
          <tbody>
            <tr>
              <td className="pl-3 pr-4 py-1 font-bold text-gray-700 w-32 whitespace-nowrap text-xs">
                Diagnosis
              </td>
              <td className="py-1">
                <textarea
                  placeholder="Enter Diagnosis"
                  rows={1}
                  className="w-full outline-none border-b border-gray-300 focus:border-orange-500 pb-0.5 text-xs leading-normal transition-all bg-transparent placeholder:text-slate-400 resize-y"
                />
              </td>
            </tr>

            <tr>
              <td className="pl-3 pr-4 py-1 font-bold text-gray-700 w-32 whitespace-nowrap text-xs">
                Notes
              </td>
              <td className="py-1">
                <textarea
                  placeholder="Enter Notes"
                  rows={1}
                  className="w-full outline-none border-b border-gray-300 focus:border-orange-500 pb-0.5 text-xs leading-normal transition-all bg-transparent placeholder:text-slate-400 resize-y"
                />
              </td>
            </tr>

            <tr>
              <td className="pl-3 pr-4 py-1 font-bold text-gray-700 w-32 whitespace-nowrap text-xs">
                Self Notes
              </td>
              <td className="py-1">
                <textarea
                  placeholder="Enter Self Notes"
                  rows={1}
                  className="w-full outline-none border-b border-gray-300 focus:border-orange-500 pb-0.5 text-xs leading-normal transition-all bg-transparent placeholder:text-slate-400 resize-y"
                />
              </td>
            </tr>

            {/* Special Instructions Row */}
            <tr>
              <td className="pl-3 pr-4 py-3 font-bold text-gray-700 w-32 whitespace-nowrap text-xs align-top pt-3">
                Spl. Inst.
              </td>
              <td className="py-1">
                <div className="flex flex-wrap gap-1 mb-2">
                  {categories.map((cat, index) => {
                    const catId = cat.id || cat._id;
                    const catName = cat.category_name || cat.name || cat.title || cat.spl_title;
                    const isActive = activeCatId === catId;

                    return (
                      <button
                        key={catId || index}
                        type="button"
                        onClick={() => handleCategoryClick(cat)}
                        className={`text-[11px] font-bold border px-3 py-1 rounded-full transition-all shadow-sm ${
                          isActive
                            ? "bg-red-500 text-white border-red-500"
                            : "bg-white text-red-600 border-red-200 hover:bg-red-500 hover:text-white"
                        }`}
                      >
                        {catName}
                      </button>
                    );
                  })}
                </div>

                {loadingSub ? (
                  <div className="w-full border border-slate-200 rounded-lg p-3 bg-slate-50/50 mb-2 text-xs text-slate-400 italic">
                    Loading instructions...
                  </div>
                ) : subInstructions.length > 0 ? (
                  <div className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50/40 mb-2 min-h-[42px] flex flex-wrap gap-2 items-center">
                    {subInstructions.map((item, idx) => {
                      const label =
                        typeof item === "string"
                          ? item
                          : item.spl_instruction || item.instruction || item.name || item.title;

                      return (
                        <button
                          key={item.id || item._id || idx}
                          type="button"
                          onClick={() => handleOptionClick(item)}
                          className="bg-white border border-red-300 text-red-600 hover:bg-red-500 hover:text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm transition-colors cursor-pointer text-left leading-tight"
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                <textarea
                  name="spl_instruction"
                  value={formData.spl_instruction || ""}
                  onChange={handleFormInputChange}
                  placeholder="Enter Spl. Instruction"
                  rows={2}
                  className="w-full outline-none border-b border-gray-300 focus:border-orange-500 pb-0.5 text-xs leading-normal transition-all bg-transparent text-black font-normal placeholder:text-slate-400 mt-1 resize-y"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-center w-full border-t border-l border-r border-gray-300 bg-white">
        <div className="flex items-center justify-center gap-4 my-3 w-full px-4">
          <h2 className="font-bold text-slate-700 text-xs whitespace-nowrap">
            Treatment
          </h2>

          <div className="relative w-full md:w-[500px]" ref={treatmentDropdownRef}>
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="border border-slate-300 p-1.5 w-full rounded bg-white text-xs cursor-pointer shadow-sm flex justify-between items-center hover:border-orange-400 transition-colors"
            >
              <span className={selectedValue === "Select Treatment" ? "text-gray-400" : "text-slate-700"}>
                {selectedValue}
              </span>
              <svg
                className={`w-3.5 h-3.5 text-slate-500 transition-transform ${showDropdown ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {showDropdown && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded shadow-xl p-2">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    autoFocus
                    placeholder="Type new or search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchTerm.trim()) {
                        const matched = allTreatments.find(
                          (t) => getTreatmentName(t).toLowerCase() === searchTerm.trim().toLowerCase()
                        );
                        if (matched) {
                          handleTreatmentSelect(matched);
                        } else {
                          const newObj = { treatment_name: searchTerm.trim() };
                          setAllTreatments([newObj, ...allTreatments]);
                          handleTreatmentSelect(newObj);
                        }
                      }
                    }}
                    className="flex-1 border border-orange-200 p-1.5 text-xs rounded outline-none focus:border-orange-500"
                  />
                </div>

                <div className="max-h-48 overflow-y-auto border-t border-slate-100 pt-1">
                  {filteredTreatments.length > 0 ? (
                    filteredTreatments.map((treatment, index) => {
                      const displayName = getTreatmentName(treatment);
                      const itemKey =
                        typeof treatment === "object"
                          ? treatment._id || treatment.id || index
                          : index;

                      return (
                        <div
                          key={itemKey}
                          onClick={() => handleTreatmentSelect(treatment)}
                          className="px-3 py-1.5 text-xs text-slate-600 hover:bg-orange-50 hover:text-orange-700 cursor-pointer rounded transition-colors"
                        >
                          {displayName}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-2 text-gray-400 text-xs italic">
                      No treatments found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex justify-center px-2">
          <div className="w-full max-w-full bg-white overflow-hidden mb-2">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-200">
                    <th className="p-2 font-semibold text-slate-700 w-1/3 border-r border-slate-200">Medicine</th>
                    <th className="p-2 font-semibold text-slate-700 w-1/4 border-r border-slate-200">Description</th>
                    <th className="p-2 font-semibold text-slate-700 w-1/4 border-r border-slate-200">Remark</th>
                    <th className="p-2 text-center">
                      <button
                        type="button"
                        onClick={addRow}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap shadow-sm"
                      >
                        Add More
                      </button>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id} className="border-b border-slate-200">
                      <td className="p-1 border-r border-slate-200">
                        <input
                          type="text"
                          placeholder="Medicine"
                          value={row.medicine}
                          onChange={(e) => handleInputChange(row.id, 'medicine', e.target.value)}
                          className="w-full py-1 px-2 outline-none placeholder-slate-400 text-slate-600 text-xs bg-transparent"
                        />
                      </td>

                      <td className="p-1 border-r border-slate-200">
                        <input
                          type="text"
                          placeholder="Description"
                          value={row.description}
                          onChange={(e) => handleInputChange(row.id, 'description', e.target.value)}
                          className="w-full py-1 px-2 outline-none placeholder-slate-400 text-slate-600 text-xs bg-transparent"
                        />
                      </td>

                      <td className="p-1 border-r border-slate-200">
                        <input
                          type="text"
                          placeholder="Notes"
                          value={row.remark}
                          onChange={(e) => handleInputChange(row.id, 'remark', e.target.value)}
                          className="w-full py-1 px-2 outline-none placeholder-slate-400 text-slate-600 text-xs bg-transparent"
                        />
                      </td>

                      <td className="p-1 text-center">
                        <button
                          type="button"
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

      <div className="border-gray-200 border-l border-r border-t bg-white p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
          <div className="md:col-span-2 flex flex-col sm:flex-row items-start gap-2 sm:gap-4 py-2">
            <label className="text-xs w-full sm:w-32 shrink-0 mt-1 font-bold text-gray-800">
              Tests
            </label>
            <div className="flex flex-col w-full min-w-0">
              <div className="flex gap-2 mb-2 overflow-x-auto no-scrollbar whitespace-nowrap pb-1">
                {["1", "2", "Oa", "Fm", "An", "Scl", "Vaginitis", "RA", "PIVD", "Gout", "PIVD L"].map((test, index) => (
                  <span
                    key={index}
                    className="bg-white border border-orange-200 text-orange-600 text-[11px] font-semibold px-3 py-0.5 rounded-full shadow-sm hover:bg-orange-500 hover:text-white cursor-pointer transition-all flex-shrink-0"
                  >
                    {test}
                  </span>
                ))}
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Select Test"
                  className="w-full outline-none border-b border-gray-300 focus:border-orange-500 pb-0.5 text-xs transition-all bg-transparent placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-2">
            <label className="text-xs w-full sm:w-32 shrink-0 font-bold text-gray-800">
              Additional Test
            </label>
            <input
              type="text"
              placeholder="Enter Notes"
              className="w-full outline-none border-b border-gray-300 focus:border-orange-500 pb-0.5 text-xs leading-none transition-all bg-transparent placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-2">
            <label className="text-xs w-full sm:w-32 shrink-0 font-bold text-gray-800">
              Followup
            </label>
            <input
              type="text"
              placeholder="Enter Diagnosis"
              className="w-full outline-none border-b border-gray-300 focus:border-orange-500 pb-0.5 text-xs leading-none transition-all bg-transparent placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#f7f5d1] p-3 border-l border-r border-b border-gray-300 rounded-b-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex flex-wrap md:flex-nowrap items-center gap-4 min-w-max">
            {[
              { id: "exercise", label: "Daily Exercise" },
              { id: "physio", label: "Physiotherapist" },
            ].map((item) => (
              <label key={item.id} className="flex items-center gap-2 cursor-pointer group whitespace-nowrap">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-xs font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;