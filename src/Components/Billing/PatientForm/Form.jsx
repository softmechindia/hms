import React, { useState,useRef } from "react";
import { Plus, Edit2, ChevronDown } from "lucide-react";
import PatientsHistory from "../Patient-History/Patient-history";
import AddOccupationPopup from "../Popup/AddOccupationPopup";
import EditOccupationPopup from "../Popup/EditOccupationPopup";
import AddEducationPopup from "../Popup/AddEducationPopup";
import EditEducationPopup from "../Popup/EditEducationPopup";
import AddCityPopup from "../Popup/AddCityPopup";
import EditCityPopup from "../Popup/EditCityPopup";
import { FaUser, FaSearch } from "react-icons/fa";


function Form() {

  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showAddEducations, setShowAddEducations] = useState(false);
  const [showEditEducations, setShowEditEducations] = useState(false);
  const [showAddOccupations, setShowAddOccupations] = useState(false);
  const [showEditOccupations, setShowEditOccupations] = useState(false);
  const [showAddCities, setShowAddCities] = useState(false);
  const [showEditCities, setShowEditCities] = useState(false);

  const [patientFound, setPatientFound] = useState(false);

  const [formData, setFormData] = useState({
    patientId: "",
    fullName: "",
    mobileNumber: "",
    patientType: "New Patient",
    doctor: "",
    consultancy: "",
    appointmentDate: new Date().toISOString().split('T')[0],
    dob: "",
    age: "",
    gender: "Male",
    maritalStatus: "",
    occupation: "",
    education: "",
    address: "",
    city: "",
    reserved: false,
    review: false,
  });

  const handleSearch = () => {
    if (!formData.patientId) return alert("Please Enter Patient ID");
    const dummyData = { fullName: "Rakhi", age: 25, mobileNumber: "9876543210", gender: "Female" };
    setFormData((prev) => ({ ...prev, ...dummyData }));
    setPatientFound(true);
  };


  const handleRefresh = () => {
    setFormData({
      patientId: "",
      fullName: "",
      mobileNumber: "",
      patientType: "",
      doctor: "",
      consultancy: "",
      appointmentDate: new Date().toISOString().split("T")[0],
      dob: "",
      age: "",
      gender: "Male",
      maritalStatus: "",
      occupation: "",
      education: "",
      address: "",
      city: "",
      reserved: false,
      review: false,
    });
    setPatientFound(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };



  const openPopup = (fieldName, mode) => {
    if (fieldName === "occupation") {
      mode === "add" ? setShowAddOccupations(true) : setShowEditOccupations(true);
    } else if (fieldName === "education") {
      mode === "add" ? setShowAddEducations(true) : setShowEditEducations(true);
    } else if (fieldName === "city") {
      mode === "add" ? setShowAddCities(true) : setShowEditCities(true);
    }
  };

  const handleDobChange = (e) => {
    const dob = e.target.value;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    setFormData(prev => ({ ...prev, dob, age: age >= 0 ? age : 0 }));
  };

  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2).toString().padStart(2, "0");
    const minute = (i % 2 === 0 ? "00" : "30");
    return `${hour}:${minute}`;
  });

  return (

    <div className="p-2 flex justify-center ">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-md overflow-hidden border border-gray-200">
  <div className="flex items-center justify-between 
                flex-nowrap 
                px-2 sm:px-4 py-2 
                bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF] 
                shadow-sm overflow-hidden">

  {/* Left */}
  <div className="flex items-center gap-1 sm:gap-2 
                  text-white font-medium 
                  whitespace-nowrap min-w-0">
    <FaUser className="text-white text-sm sm:text-lg font-bold flex-shrink-0" />
    <span className="text-[11px] sm:text-base truncate">
      Search Patient
    </span>
  </div>

  {/* Right */}
  <div className="flex items-center gap-1 sm:gap-2 flex-nowrap">

    <button
      type="button"
      onClick={() => window.print()}
      className="flex items-center gap-0.5
                 bg-white text-blue-700
                 px-1.5 sm:px-3 py-1
                 text-[10px] sm:text-sm
                 rounded whitespace-nowrap">
      🖨️ Re-Print
    </button>

    <button
      type="button"
      onClick={handleRefresh}
      className="flex items-center gap-0.5
                 bg-white text-gray-700
                 px-1.5 sm:px-3 py-1
                 text-[10px] sm:text-sm
                 rounded whitespace-nowrap">
      🔄 Reset
    </button>

  </div>
</div>

        <div className="bg-gray-100 p-2">
          <div className="flex items-center gap-2 w-full">
            <input
              type="text"
              name="search"
              value={formData.patientId}
              placeholder="Search patientId Name MobileNo"
              className="w-full flex-1 min-w-0 
             h-10 px-4 border border-gray-400
             focus:ring-2 focus:ring-orange-400 
             outline-none transition rounded"
              onChange={(e) =>
                setFormData((p) => ({ ...p, patientId: e.target.value }))
              }
            />
            <button
              type="button"
              onClick={handleSearch}
              className="flex items-center gap-1 
               h-10 bg-[#F97316] hover:bg-orange-600
               text-white px-4 text-sm transition rounded"
            >
              <FaSearch className="text-white" />
              Search
            </button>
          </div>
        </div>

    <form className="px-6 pt-4 pb-2 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            
            <InputField name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" />
            <InputField name="mobileNumber" type="tel" value={formData.mobileNumber} onChange={handleInputChange} placeholder="10 Digit Mobile" />
            <SelectField name="patientType" value={formData.patientType} onChange={handleInputChange} options={["New Patient", "Old Patient"]} />
            <SelectField name="doctor" value={formData.doctor} onChange={handleInputChange} options={["Dr. Bharti Aggarwal", "Dr. Ritesh", "Dr. S. Sharma"]} />
            <SelectField name="consultancy" value={formData.consultancy} onChange={handleInputChange} options={["General", "Emergency", "Follow-up"]} />

            {/* Date & Scrollable Time Selection */}
            <div className="flex items-center border border-gray-300 bg-white">
 <input 
  type="date" 
  name="appointmentDate" 
  min={new Date().toISOString().split('T')[0]} // today
  className="w-1/2 px-3 py-1.5 text-sm outline-none" 
  value={formData.appointmentDate} 
  onChange={handleInputChange}
/>

              <div className="w-[1px] h-6 bg-gray-300"></div>
              <div className="relative w-1/2" ref={dropdownRef}>
                <div 
                  onClick={() => setIsTimeOpen(!isTimeOpen)} 
                  className="px-3 py-1.5 text-sm cursor-pointer flex justify-between items-center text-gray-600"
                >
                  {formData.appointmentTime || "Select Time"}
                  <ChevronDown size={14} />
                </div>
                {isTimeOpen && (
                  <div className="absolute z-50 left-0 mt-1 w-full bg-white border border-gray-300 shadow-xl rounded-md">
                    <div className="max-h-48 overflow-y-auto custom-scrollbar">
                      {timeOptions.map((time) => (
                        <div 
                          key={time} 
                          className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-500 hover:text-white transition-colors ${formData.appointmentTime === time ? 'bg-gray-500 text-white' : ''}`}
                          onClick={() => {
                            setFormData({ ...formData, appointmentTime: time });
                            setIsTimeOpen(false);
                          }}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

{/* DOB + Age + Gender one line (mobile optimized) */}
<div className="flex gap-1 col-span-1 md:col-span-2 lg:col-span-3">


  <div className="w-[45%]">
    <input
      type="date"
      name="dob"
      value={formData.dob}
      onChange={handleDobChange}
      className="w-full h-9 px-2 text-xs border border-gray-300 outline-none"
    />
  </div>

  {/* Age smaller */}
  <div className="w-[25%]">
    <input
      type="text"
      name="age"
      value={formData.age}
      readOnly
      placeholder="Age"
      className="w-full h-9 px-2 text-xs border border-gray-300 bg-gray-100"
    />
  </div>

  {/* Gender */}
  <div className="w-[30%]">
    <select
      name="gender"
      value={formData.gender}
      onChange={handleInputChange}
      className="w-full h-9 px-1 text-xs border border-gray-300 bg-white"
    >
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>
  </div>

</div>

            {[
              { name: "occupation", value: formData.occupation, placeholder: "Select Occupation", options: ["Student", "Private Job", "Housewife", "Other"] },
              { name: "education", value: formData.education, placeholder: "Select Education", options: ["Primary", "Graduate", "Other"] },
              { name: "city", value: formData.city, placeholder: "Select City", options: ["Mumbai", "Delhi", "Pune"] }
            ].map((field) => (
              <div key={field.name} className="relative flex items-center border border-gray-300">
                <select
                  name={field.name}
                  value={field.value}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1.5 text-sm outline-none bg-white cursor-pointer appearance-none"
                >
                  <option value="">{field.placeholder}</option>
                  {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <div className="absolute right-2 flex items-center gap-1">
                  <button type="button" onClick={() => openPopup(field.name, "add")} className="p-1 bg-orange-500 text-white rounded-sm"><Plus size={12}/></button>
                  <button type="button" onClick={() => openPopup(field.name, "edit")} className="p-1 bg-orange-500 text-white rounded-sm"><Edit2 size={12}/></button>
                </div>
              </div>
            ))}
          </div>

<div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 pt-2">

  <div className="flex-grow">
    <textarea
      name="address"
      value={formData.address}
      onChange={handleInputChange}
      rows={1}
      className="w-full px-3 py-2 border border-gray-300 text-sm outline-none resize-none focus:ring-1 focus:ring-blue-400 h-[34px] sm:h-10 flex items-center"
      placeholder="Full Address"
    />
  </div>

  {/* Checkboxes aur Button: Right side pe fix rahenge */}
 <div className="flex flex-row items-center 
                justify-center sm:justify-end 
                gap-1 sm:gap-2">

  {/* Reserved / Review */}
  <div className="flex items-center gap-2 sm:gap-4 bg-gray-50 px-2 sm:px-4 
                  h-[34px] sm:h-10 border border-gray-200 rounded-sm">
    
    <label className="flex items-center gap-1 text-[11px] sm:text-sm 
                      font-bold text-gray-700 whitespace-nowrap">
      <input
        type="checkbox"
        name="reserved"
        checked={formData.reserved}
        onChange={handleInputChange}
        className="w-3 h-3 sm:w-4 sm:h-4 accent-blue-600"
      />
      Reserved
    </label>

    <div className="w-[1px] h-4 sm:h-5 bg-gray-300"></div>

    <label className="flex items-center gap-1 text-[11px] sm:text-sm 
                      font-bold text-gray-700 whitespace-nowrap">
      <input
        type="checkbox"
        name="review"
        checked={formData.review}
        onChange={handleInputChange}
        className="w-3 h-3 sm:w-4 sm:h-4 accent-blue-600"
      />
      Review
    </label>
  </div>

  {/* Button */}
  <button
    type="button"
    className="bg-[#22C55E] text-white px-3 sm:px-6 
               h-[34px] sm:h-10 text-[11px] sm:text-sm 
               font-bold rounded-sm whitespace-nowrap 
               flex items-center justify-center">
    Save & Print
  </button>

</div>


</div>

          <div className="mt-4">
            <PatientsHistory />
          </div>
        </form>
      </div>
      {showAddOccupations && <AddOccupationPopup onClose={() => setShowAddOccupations(false)} />}
      {showEditOccupations && <EditOccupationPopup onClose={() => setShowEditOccupations(false)} />}
      {showAddEducations && <AddEducationPopup onClose={() => setShowAddEducations(false)} />}
      {showEditEducations && <EditEducationPopup onClose={() => setShowEditEducations(false)} />}
      {showAddCities && <AddCityPopup onClose={() => setShowAddCities(false)} />}
      {showEditCities && <EditCityPopup onClose={() => setShowEditCities(false)} />}
    </div>
  );
}


// InputField component
const InputField = ({ label, name, value, onChange, type = "text", readOnly = false, placeholder = "" }) => (
  <div className="flex flex-col">
    {label && <label className="text-sm font-semibold text-gray-600 mb-1">{label}</label>}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
      className={`px-4 py-2 border border-gray-300 text-sm text-gray-500 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none transition ${readOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"
        }`}
    />
  </div>
);
// SelectField component
const SelectField = ({ label, name, value, onChange, options, placeholder }) => (
  <div className="flex flex-col">
    {label && <label className="text-sm font-semibold text-gray-600 mb-1">{label}</label>}
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="px-4 py-2 border border-gray-300 text-sm text-gray-500 focus:ring-2 focus:ring-blue-400 outline-none bg-white cursor-pointer"
    >
      <option value="" disabled hidden>
        {placeholder || `Select ${label || "Option"}`}
      </option>
      {options.map((o, i) => (
        <option key={i} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);


// CheckboxField component
const CheckboxField = ({ label, name, checked, onChange }) => (
  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer group">
    <input type="checkbox" name={name} checked={checked} onChange={onChange} className="w-5 h-5 accent-blue-600 " />
    <span className="group-hover:text-blue-600 transition">{label}</span>
  </label>
);




export default Form;