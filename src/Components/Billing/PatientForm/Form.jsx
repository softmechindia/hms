import React, { useState, useRef, useEffect } from "react";
import { Plus, Edit2, ChevronDown, User, Phone, UserCheck } from "lucide-react";
import PatientsHistory from "../Patient-History/Patient-history";
import AddOccupationPopup from "../Popup/AddOccupationPopup";
import EditOccupationPopup from "../Popup/EditOccupationPopup";
import AddEducationPopup from "../Popup/AddEducationPopup";
import EditEducationPopup from "../Popup/EditEducationPopup";
import AddCityPopup from "../Popup/AddCityPopup";
import EditCityPopup from "../Popup/EditCityPopup";
import { FaUser, FaSearch } from "react-icons/fa";
import Patients from "../Patients/Patient";
import { bookAppointment, getAvailableSlots, getEducations, getOccupations, getCity, searchPatient, getDoctors } from "../../../api/endpoints/authApi";
import { useOutletContext } from "react-router-dom";

function Form() {
  const { triggerRefresh } = useOutletContext();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [occupationsList, setOccupationsList] = useState([]);
  const [educationList, setEducationsList] = useState([]);
  const [cityList, setCityList] = useState([]);

  // SEARCH & DROPDOWN STATES 
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState("");

  const dropdownRef = useRef(null);

  // Popups States
  const [showAddEducations, setShowAddEducations] = useState(false);
  const [showEditEducations, setShowEditEducations] = useState(false);
  const [showAddOccupations, setShowAddOccupations] = useState(false);
  const [showEditOccupations, setShowEditOccupations] = useState(false);
  const [showAddCities, setShowAddCities] = useState(false);
  const [showEditCities, setShowEditCities] = useState(false);
  const [patientHistory, setPatientHistory] = useState([]);

  // Popup selections
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // Success message state
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Appointment states 
  const [hasTodayAppointment, setHasTodayAppointment] = useState(false);
  const [doctorsList, setDoctorsList] = useState([]);
  const [todayUpdatedIDs, setTodayUpdatedIDs] = useState([]);

  const initialFormState = {
    patient_id: "",
    name: "",
    mobile_no: "",
    patient_type: "",
    email: "",
    gender: "",
    birth_of_year: "",
    age: "",
    occupation: "",
    education: "",
    marital_status: "",
    city: "",
    address: "",
    doctor_id: "",
    consultancy: "",
    appointment_date: new Date().toISOString().split("T")[0],
    appointment_time: "",
    appointment_by: "Billing",
    appointment_mode: "Offline",
    payment_mode: "Cash",
    paid_amount: "0",
    reserved: "No",
    review_patient: "No",
    review_payment: "No",
    ref_by: "",
    vstatus: "confirmed",
    created_by: "ST0001"
  };

  const [formData, setFormData] = useState(initialFormState);

  // Reset form handler
  const handleResetForm = () => {
    setFormData(initialFormState);
    setSelectedPatientId("");
    setPatientHistory([]);
    setHasTodayAppointment(false);
    setSearchResults([]);
    setShowSearchDropdown(false);
    setSuccessMessage("");
  };

  // SEARCH INPUT FUNCTION
  const handleSearchInput = async (value) => {
    if (!value || value.trim() === "") {
      handleResetForm();
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    setFormData((prev) => ({ ...prev, patient_id: value }));
    setSelectedPatientId("");

    if (todayUpdatedIDs.includes(value.trim())) {
      setHasTodayAppointment(true);
    } else {
      setHasTodayAppointment(false);
    }

    if (value.length < 3) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    try {
      setIsSearching(true);
      const response = await searchPatient({ search_by: value });
      const actualData = response.fullData;

      if (actualData && actualData.success === 1) {
        const results = Array.isArray(actualData.user_data)
          ? actualData.user_data
          : [actualData.user_data];
        setSearchResults(results);
        setShowSearchDropdown(true);

        const matchedPatient = results.find(p => (p.userID || p.id) === value.trim());
        if (matchedPatient) {
          const todayStr = new Date().toISOString().split("T")[0];
          const appointmentsArray = matchedPatient.appointment_data || [];
          const isToday = appointmentsArray.some(appt => (appt.appointment_date || appt.date || "").split(" ")[0] === todayStr);
          if (isToday) setHasTodayAppointment(true);
        }
      } else {
        setSearchResults([]);
        setShowSearchDropdown(false);
      }
    } catch (err) {
      console.error("Search Error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  // EXISTING PATIENT SELECT FUNCTION ✅ (Syntax Corrected Here)
  const selectPatient = (patient) => {
    const pId = patient.userID || patient.id || "";
    setFormData(prev => ({
      ...prev,
      patient_id: pId,
      name: patient.user_name || "",
      mobile_no: patient.mobile_no || "",
      email: patient.email_id || "",
      gender: patient.gender || "",
      age: patient.age || "",
      birth_of_year: patient.birth_of_year || "",
      occupation: patient.occupation || "",
      education: patient.education || "",
      city: patient.city || "",
      address: patient.address || "",
      patient_type: "0",
    }));
    setSelectedPatientId(pId);
    setShowSearchDropdown(false);

    // Date checker logic is now safely inside the function
    const todayStr = new Date().toISOString().split("T")[0];
    const appointmentsArray = patient.appointment_data || [];
    const checkTodayRecord = appointmentsArray.some(appt => {
      const recordDate = appt.appointment_date || appt.date;
      return recordDate && recordDate.split(" ")[0] === todayStr;
    });

    if (checkTodayRecord || todayUpdatedIDs.includes(pId)) {
      setHasTodayAppointment(true);
    } else {
      setHasTodayAppointment(false);
    }
  };

  // Auto Age Calculation
  useEffect(() => {
    const yearStr = formData.birth_of_year?.toString();
    if (yearStr?.length === 4) {
      const currentYear = new Date().getFullYear();
      const calculatedAge = currentYear - parseInt(yearStr);
      if (!isNaN(calculatedAge)) {
        setFormData((prev) => ({ ...prev, age: calculatedAge.toString() }));
      }
    }
  }, [formData.birth_of_year]);

  // Success Message Timer
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // SAVE & UPDATE HANDLER
  const handleSave = async () => {
    setErrorMessage("");

    if (!formData.name) {
      setErrorMessage("Please fill name!");
      return;
    }
    if (!formData.mobile_no) {
      setErrorMessage("Please fill Mobile No!");
      return;
    }
    if (!formData.patient_type) {
      setErrorMessage("Please select Patient Type!");
      return;
    }
    if (!formData.doctor_id) {
      setErrorMessage("Please select Doctor");
        return;
    }
    if (!formData.consultancy) {
      setErrorMessage("Please select consultancy");
        return;
    }
    if (!formData.appointment_time || formData.appointment_time === "Select Time") {
      setErrorMessage("Please select valid Appointment Time!");
      return;
      
    }
    if (!formData.gender) {
      setErrorMessage("Please select Gender!");
      return;
    }
  

  

  const currentId = formData.patient_id ? formData.patient_id.trim() : "";
  const payload = {
    ...formData,
    reserved: formData.reserved ? "Yes" : "No",
    review_patient: formData.review_patient ? "Yes" : "No",
    paid_amount: formData.paid_amount.toString()
  };

  try {
    if (hasTodayAppointment || (currentId && todayUpdatedIDs.includes(currentId))) {
      setSuccessMessage("Patient data updated!");
      if (triggerRefresh) triggerRefresh();
      return;
    }

    const response = await bookAppointment(payload);
    if (response.success === 1 || response.status === true) {
      const msg = response.message || "Appointment Booked!";
      setSuccessMessage(msg);

      if (currentId) {
        setTodayUpdatedIDs(prev => [...prev, currentId]);
      }
      setHasTodayAppointment(true);

      const updatedSlots = await getAvailableSlots(formData.appointment_date);
      setAvailableSlots(updatedSlots?.fullData?.slots || updatedSlots?.slots || []);

      if (triggerRefresh) {
        triggerRefresh();
      }
    } else {
      alert(`Warning: ${response.message || "Unable to book"}`);
    }
  } catch (err) {
    console.error("Booking Error", err);
    alert("Server connection failed.");
  }
};

// Fetch Slots
useEffect(() => {
  const fetchSlots = async () => {
    if (!formData.appointment_date) return;
    try {
      const response = await getAvailableSlots(formData.appointment_date);
      const slotsData = response?.fullData?.slots || response?.slots || [];
      if (response.status === true && Array.isArray(slotsData)) {
        setAvailableSlots(slotsData);
      } else {
        setAvailableSlots([]);
      }
    } catch (err) {
      console.error("Slots Fetch Error:", err);
      setAvailableSlots([]);
    }
  };
  fetchSlots();
}, [formData.appointment_date]);

// Click Outside to close dropdown
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsTimeOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  const updatedValue = type === "checkbox" ? (checked ? "Yes" : "No") : value;

  // 1. Update the form data state
  setFormData((prev) => ({
    ...prev,
    [name]: updatedValue,
  }));

  // 2. Automatically clear the error message if the user is fixing the field!
  if (errorMessage) {
    if (name === "name" && updatedValue) setErrorMessage("");
    if (name === "mobile_no" && updatedValue) setErrorMessage("");
    if (name === "patient_type" && updatedValue) setErrorMessage("");
    if (name === "doctor_id" && updatedValue) setErrorMessage("");
    if (name === "consultancy" && updatedValue) setErrorMessage("");
    if (name === "appointment_time" && updatedValue && updatedValue !== "Select Time") setErrorMessage("");
    if (name === "gender" && updatedValue) setErrorMessage("");
  }
};

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    const [occ, edu, cit, docResponse] = await Promise.all([
      getOccupations(),
      getEducations(),
      getCity(),
      getDoctors()
    ]);

    setOccupationsList(occ?.fullData?.data || occ?.data || []);
    setEducationsList(edu?.fullData?.data || edu?.data || []);
    setCityList(cit?.fullData?.data || cit?.data || []);
    setDoctorsList(docResponse?.Getdoctorsdata || docResponse?.fullData?.Getdoctorsdata || []);
  } catch (err) {
    console.error("Fetch Error:", err);
  }
};

const handleEditClick = (fieldName) => {
  if (fieldName === "occupation") {
    if (!formData.occupation) {
      alert("Select First occupation");
      return;
    }
    const selected = occupationsList.find((item) => item.occupation_name === formData.occupation);
    if (!selected) return;
    setSelectedOccupation(selected);
    setShowEditOccupations(true);
  }
};

const handleEditEducation = () => {
  if (!formData.education) {
    alert("Select first education");
    return;
  }
  const selected = educationList.find((item) => item.education_name === formData.education);
  if (!selected) return;
  setSelectedEducation(selected);
  setShowEditEducations(true);
};

const handleEditCity = () => {
  if (!formData.city) {
    alert("Please select a city first");
    return;
  }
  const selected = cityList.find(
    (item) => item.city_name?.trim().toLowerCase() === formData.city?.trim().toLowerCase()
  );
  if (!selected) return;
  setSelectedCity(selected);
  setShowEditCities(true);
};

return (
  <div className="rounded-md h-fit bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-full bg-white shadow-xl rounded-md overflow-hidden border border-gray-200">

        {/* Header */}
        <div className="flex items-center justify-between flex-nowrap px-3 py-2 bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF] shadow-sm overflow-hidden">
          <div className="flex items-center gap-1 text-white font-medium whitespace-nowrap min-w-0">
            <FaUser className="text-white text-lg font-bold flex-shrink-0" />
            <span className="text-[14px] truncate">Search Patient</span>
          </div>
          <div className="flex-1 flex justify-center items-center px-2">
            {successMessage && (
              <div className=" bg-green-500/90 rounded-md  shadow-md text-white font-bold text-xs sm:text-sm px-4 py-1 text-center max-w-sm sm:max-w-md truncate">
                ✓ {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className=" bg-red-500  rounded-md shadow-md text-white font-bold text-xs sm:text-sm px-4 py-1  text-center max-w-sm sm:max-w-md truncate">
                ⚠ {errorMessage}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="bg-white text-blue-700 px-3 py-2 text-sm rounded cursor-pointer">🖨️ Re-Print</button>
            <button type="button" onClick={handleResetForm} className="bg-white text-gray-700 px-3 py-2 text-sm rounded cursor-pointer ">🔄 Reset</button>            </div>
        </div>

        {/* Search Bar */}
        <div className="bg-gray-100 p-2">
          <div className="flex items-center gap-2 w-full px-1">
            <div className="relative flex-1">
              <input
                type="text"
                name="patient_id"
                value={formData.patient_id}
                onChange={(e) => handleSearchInput(e.target.value)}
                placeholder="Search ID, Name or Mobile..."
                autoComplete="off"
                className="w-full h-10 px-3 border border-gray-400 rounded outline-none text-black focus:ring-2 focus:ring-orange-400"
              />
              {showSearchDropdown && searchResults.length > 0 && (
                <div className="absolute top-11 left-0 w-full bg-white border border-gray-300 shadow-2xl z-[9999] rounded-md max-h-60 overflow-y-auto">
                  {searchResults.map((p, idx) => (
                    <div
                      key={idx}
                      onClick={() => selectPatient(p)}
                      className="p-2 hover:bg-gray-300 cursor-pointer flex justify-between items-center"
                    >
                      <p className="text-sm text-black">{p.user_name}-{p.mobile_no}-{p.userID}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button type="button" className="bg-[#F97316] cursor-pointer text-white px-5 h-10 rounded text-sm flex items-center gap-2">
              {isSearching ? "..." : <><FaSearch /> Search</>}
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <form className="px-2 pt-4 pb-1 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="relative flex items-center text-black border border-gray-300 rounded overflow-hidden">
              <div className="pl-3 text-gray-500"><User size={15} /></div>
              <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="w-full px-2 py-1 placeholder-gray-500 text-sm outline-none" />
            </div>
            <div className="relative flex items-center border border-gray-300 rounded overflow-hidden">
              <div className="pl-3 text-gray-500"><Phone size={15} /></div>
              <input name="mobile_no" value={formData.mobile_no} onChange={handleInputChange} placeholder="10 Digit Mobile" className="placeholder-gray-500 w-full px-2 py-1 text-sm outline-none" />
            </div>
            <div className="relative flex items-center border border-gray-300 rounded overflow-hidden">
              <div className="pl-3 text-gray-500"><UserCheck size={15} /></div>
              <select name="patient_type" value={formData.patient_type} onChange={handleInputChange} className={`w-full px-2 py-1 text-sm outline-none bg-white cursor-pointer ${formData.patient_type === "" ? "text-gray-500" : "text-black"}`}>
                <option value="">Select Patient Type</option>
                <option value="1">New Patient</option>
                <option value="0">Old Patient</option>
              </select>
            </div>
            <div className="relative flex items-center border border-gray-300 rounded overflow-hidden">
              <select name="doctor_id" value={formData.doctor_id} onChange={handleInputChange} className={`w-full px-2 py-1 text-sm outline-none bg-white ${formData.doctor_id === "" ? "text-gray-400" : "text-black"}`}>
                <option value="">Select Doctor</option>
                {doctorsList.map((doc) => (<option key={doc.id} value={doc.userID}>{doc.user_name}</option>))}
              </select>
            </div>
            <div className="relative flex items-center border border-gray-300 rounded overflow-hidden">
              <select name="consultancy" value={formData.consultancy} onChange={handleInputChange} className={`w-full px-2 py-1 text-sm outline-none bg-white ${formData.consultancy === "" ? "text-gray-400" : "text-black"}`}>
                <option value="">Select Consultancy</option>
                {doctorsList.map((doc) => (<option key={doc.id} value={doc.userID}>{doc.user_name}</option>))}
              </select>
            </div>

            {/* Date & Time */}
            <div className="flex items-center border border-gray-300 bg-white rounded">
              <input type="date" name="appointment_date" value={formData.appointment_date} onChange={handleInputChange} className="w-1/2 px-2 py-1 text-sm outline-none border-r border-gray-300" />
              <div className="relative w-1/2" ref={dropdownRef}>
                <div onClick={() => setIsTimeOpen(!isTimeOpen)} className={`px-2 py-1 text-sm cursor-pointer flex justify-between items-center ${formData.appointment_time ? "text-black" : "text-gray-500"}`}>
                  {formData.appointment_time || "Select Time"}
                  <ChevronDown size={14} />
                </div>
                {isTimeOpen && (
                  <div className="absolute z-50 left-0 mt-1 w-full bg-white border border-gray-300 shadow-xl rounded-md">
                    <div className="max-h-60 overflow-y-auto custom-scrollbar bg-white">
                      {availableSlots.length > 0 ? (
                        availableSlots.map((slot, index) => (
                          <div key={index} className={`px-3 py-2 text-sm cursor-pointer border-b border-gray-50 ${slot.available === 0 ? 'bg-red-50 text-gray-400 cursor-not-allowed' : 'hover:bg-blue-600 hover:text-white text-black'}`}
                            onClick={() => { if (slot.available !== 0) { setFormData({ ...formData, appointment_time: slot.time || slot.slot_time }); setIsTimeOpen(false); } }}
                          >
                            {slot.time || slot.slot_time}
                            {slot.available === 0 && <span className="ml-2 text-[10px] text-red-400">(Booked)</span>}
                          </div>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-xs text-gray-500">No slots for this date</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Birth, Age, Gender */}
            <div className="flex gap-1 col-span-1 md:col-span-2 lg:col-span-3">
              <div className="flex-1"><input type="number" name="birth_of_year" value={formData.birth_of_year} onChange={handleInputChange} placeholder="Birth Year" className="w-full placeholder-gray-500 px-2 py-1 text-sm border border-gray-300 bg-white text-black" /></div>
              <div className="flex-1"><input type="number" name="age" value={formData.age} readOnly placeholder="Age" className="w-full placeholder-gray-500 px-2 py-1 text-sm border border-gray-300 bg-gray-100 text-black cursor-not-allowed" /></div>
              <div className="flex-1">
                <select name="gender" value={formData.gender} onChange={handleInputChange} className={`w-full px-2 py-1 text-sm border border-gray-300 bg-white h-[30px] ${formData.gender ? "text-black" : "text-gray-500"}`}>
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Combobox Datalists */}
            {[
              { name: "occupation", value: formData.occupation, placeholder: "Select Occupation", options: occupationsList },
              { name: "education", value: formData.education, placeholder: "Select Education", options: educationList },
              { name: "city", value: formData.city, placeholder: "Select City", options: cityList },
            ].map((field) => (
              <div key={field.name} className="relative flex items-center border border-gray-300 rounded bg-white h-9">
                <input list={`${field.name}-list`} name={field.name} value={field.value} onChange={handleInputChange} placeholder={field.placeholder} className="w-full h-full px-2 py-1 text-sm outline-none text-black" />
                <datalist id={`${field.name}-list`}>
                  {field.options?.map((opt) => {
                    const label = opt.occupation_name || opt.education_name || opt.city_name;
                    return <option key={opt.id} value={label} />;
                  })}
                </datalist>
                <div className="absolute right-1 flex items-center gap-1">
                  <button type="button" onClick={() => field.name === "occupation" ? setShowAddOccupations(true) : field.name === "education" ? setShowAddEducations(true) : setShowAddCities(true)} className="p-1 bg-orange-500 text-white rounded-sm"><Plus size={12} /></button>
                  <button type="button" onClick={() => field.name === "occupation" ? handleEditClick("occupation") : field.name === "education" ? handleEditEducation() : handleEditCity()} className="p-1 bg-blue-500 text-white rounded-sm"><Edit2 size={12} /></button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Controls */}
          <div className="flex text-black flex-col lg:flex-row items-stretch lg:items-center gap-2">
            <div className="flex-grow">
              <textarea name="address" value={formData.address} onChange={handleInputChange} rows={1} className="w-full px-2 py-1 text-sm border border-gray-300 rounded outline-none resize-none min-h-[32px] placeholder-gray-500" placeholder="Full Address" />
            </div>
            <div className="flex flex-row items-center justify-center sm:justify-end gap-1 sm:gap-2">
              <div className="flex items-center gap-2 sm:gap-4 bg-gray-50 px-2 sm:px-4 py-1 border border-gray-200 rounded-sm">
                <label className="flex items-center gap-1 text-xs font-bold text-gray-700 whitespace-nowrap">
                  <input type="checkbox" name="reserved" checked={formData.reserved === "Yes" || formData.reserved === true} onChange={handleInputChange} className="w-3 h-3 sm:w-4 sm:h-4 accent-blue-600" />
                  Reserved
                </label>
                <div className="w-[1px] h-4 sm:h-5 bg-gray-300"></div>
                <label className="flex items-center gap-1 text-xs font-bold text-gray-700 whitespace-nowrap">
                  <input type="checkbox" name="review_patient" checked={formData.review_patient === "Yes" || formData.review_patient === true} onChange={handleInputChange} className="w-3 h-3 sm:w-4 sm:h-4 accent-blue-600" />
                  Review
                </label>
              </div>
              <button type="button" onClick={handleSave} className={`cursor-pointer text-white px-3 py-1.5 text-[11px] sm:text-sm font-bold rounded-sm whitespace-nowrap flex items-center justify-center transition shadow-sm ${hasTodayAppointment ? "bg-amber-500" : "bg-[#22C55E]"}`}>
                {hasTodayAppointment ? "Update Info" : "Save & Print"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="w-full mt-1">
        <PatientsHistory userID={selectedPatientId} />
      </div>

      {/* Popups */}
      {showAddOccupations && <AddOccupationPopup onClose={() => setShowAddOccupations(false)} onSuccess={fetchData} />}
      {showEditOccupations && <EditOccupationPopup initialData={selectedOccupation} onClose={() => setShowEditOccupations(false)} onSuccess={fetchData} />}
      {showAddEducations && <AddEducationPopup onClose={() => setShowAddEducations(false)} onSuccess={fetchData} />}
      {showEditEducations && <EditEducationPopup initialData={selectedEducation} onClose={() => setShowEditEducations(false)} onSuccess={fetchData} />}
      {showAddCities && <AddCityPopup onClose={() => setShowAddCities(false)} onSuccess={fetchData} />}
      {showEditCities && <EditCityPopup initialData={selectedCity} onClose={() => setShowEditCities(false)} onSuccess={fetchData} />}
    </div>
  </div>
);
}

export default Form;