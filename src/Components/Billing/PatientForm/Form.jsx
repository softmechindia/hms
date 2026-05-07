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
import { bookAppointment, getAvailableSlots, getEducations, getOccupations, getCity, searchPatient } from "../../../api/endpoints/authApi";
import { saveEducation } from "../../../api/endpoints/authApi";
import { saveCity } from "../../../api/endpoints/authApi";
function Form() {


  const [availableSlots, setAvailableSlots] = useState([]);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [occupationsList, setOccupationsList] = useState([]);
  const [educationList, setEducationsList] = useState([]);
  const [cityList, setCityList] = useState([]);

  //SEARCH & DROPDOWN STATES 
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);



  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Popups States
  const [showAddEducations, setShowAddEducations] = useState(false);
  const [showEditEducations, setShowEditEducations] = useState(false);
  const [showAddOccupations, setShowAddOccupations] = useState(false);
  const [showEditOccupations, setShowEditOccupations] = useState(false);
  const [showAddCities, setShowAddCities] = useState(false);
  const [showEditCities, setShowEditCities] = useState(false);


  // OccupationPopup, EducationPopup, CityPopup 
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [patientFound, setPatientFound] = useState(false);

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
    created_by: ""
  };

  const [formData, setFormData] = useState(initialFormState);



  const handleSearchInput = async (value) => {
    setFormData(prev => ({ ...prev, patient_id: value }));

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

  const selectPatient = (patient) => {
    setFormData(prev => ({
      ...prev,
      patient_id: patient.userID || patient.id || "",
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
    setShowSearchDropdown(false);
  };







  // --- Auto Age Calculation ---
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


  const handleSave = async () => {
    if (!formData.name || !formData.mobile_no || !formData.doctor_id) {
      alert("Please fill required fields (Name, Mobile, Doctor)!");
      return;
    }
    if (!formData.appointment_time || formData.appointment_time === "Select Time") {
      alert("Please select a valid time slot!");
      return;
    }

    const payload = {
      ...formData,
      reserved: formData.reserved ? "Yes" : "No",
      review_patient: formData.review_patient ? "Yes" : "No",
      paid_amount: formData.paid_amount.toString()
    };

    try {
      const response = await bookAppointment(payload);
      if (response.success === 1 || response.status === true) {
        alert(`Success: ${response.message || "Appointment Booked!"}`);
        setFormData(initialFormState);
        const updatedSlots = await getAvailableSlots(initialFormState.appointment_date);
        setAvailableSlots(updatedSlots?.fullData?.slots || updatedSlots?.slots || []);
      } else {
        alert(`Warning: ${response.message || "Unable to book"}`);
      }
    } catch (err) {
      console.error("Booking Error", err);
      alert("Server connection failed. Check console for details.");
    }
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

  // --- Fetch Available Slots ---
  useEffect(() => {
    const fetchSlots = async () => {
      if (!formData.appointment_date) return;

      try {
        const response = await getAvailableSlots(formData.appointment_date);
        console.log("Full API Response:", response);


        const slotsData = response?.fullData?.slots || response?.slots || [];

        // API status check
        if (response.status === true && Array.isArray(slotsData)) {
          setAvailableSlots(slotsData);
        } else {
          console.warn("API returned status false or no slots in fullData");
          setAvailableSlots([]);
        }
      } catch (err) {
        console.error("Critical API Error:", err);
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
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    fetchData();
  }, [])

  // Occupation, Educatons, City

  const fetchData = async () => {
    try {
      const occ = await getOccupations();
      const edu = await getEducations();
      const cit = await getCity();

      setOccupationsList(occ?.fullData?.data || occ?.data || []);
      setEducationsList(edu?.fullData?.data || edu?.data || []);
      setCityList(cit?.fullData?.data || cit?.data || []);

      console.log("Data refreshed successfully!");
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };
  // OccupationPopup
  const handleEditClick = (fieldName) => {
    if (fieldName === "occupation") {

      if (!formData.occupation) {
        alert("Select First occupation  ");
        return;
      }

      const selected = occupationsList.find(
        (item) => item.occupation_name === formData.occupation
      );

      if (!selected) {
        alert("Occupation not found");
        return;
      }

      setSelectedOccupation(selected);
      setShowEditOccupations(true);
    }
  };

  // EditEducation
  const handleEditEducation = () => {
    if (!formData.education) {
      alert("Select first education");
      return;
    }

    const selected = educationList.find(
      (item) => item.education_name === formData.education
    );
    if (!selected) {
      alert("Education not found");
      return;
    }
    setSelectedEducation(selected);
    setShowEditEducations(true);

  }


  // EditCity

  const handleEditCity = () => {
    console.log(" formData.city:", formData.city);
    console.log(" cityList:", cityList);

    if (!formData.city) {
      alert("Please select a city first");
      return;
    }

    const selected = cityList.find(
      (item) =>
        item.city_name?.trim().toLowerCase() ===
        formData.city?.trim().toLowerCase()
    );

    console.log(" matched city:", selected);

    if (!selected) {
      alert("City not found in the list!");
      return;
    }

    setSelectedCity(selected);
    setShowEditCities(true);
  };

  return (
    <div className=" rounded-md h-fit  bg-white">
      <div className="flex flex-col items-center  gap-4">
        <div className="w-full  bg-white shadow-xl rounded-md overflow-hidden border border-gray-200">

          <div className="flex items-center justify-between flex-nowrap
                px-3 py-2 
                bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF] 
                shadow-sm overflow-hidden">

            {/* Left */}
            <div className="flex items-center gap-1 text-white font-medium whitespace-nowrap min-w-0">
              <FaUser className="text-white text-lg font-bold flex-shrink-0" />
              <span className="text-[14px] truncate">
                Search Patient
              </span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              <button onClick={() => window.print()} className="bg-white text-blue-700 px-3 py-2 text-sm rounded cursor-pointer ">🖨️ Re-Print</button>
              <button onClick={() => setFormData(initialFormState)} className="bg-white text-gray-700 px-3 py-2 text-sm rounded cursor-pointer ">🔄 Reset</button>
            </div>
          </div>
          <div className="bg-gray-100 p-2" >
            <div className="flex items-center gap-2 w-full px-1">

              <div className="flex items-center gap-2 w-full px-1">
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="patient_id"
                    value={formData.patient_id}
                    onChange={(e) => handleSearchInput(e.target.value)}
                    placeholder="Search ID, Name or Mobile..."
                    autoComplete="off"
                    className="w-full h-10 px-3 border border-gray-400 rounded outline-none focus:ring-2 focus:ring-orange-400"
                  />

                  {/* Dropdown UI */}
                  {showSearchDropdown && searchResults.length > 0 && (
                    <div className="absolute top-11 left-0 w-full bg-white border border-gray-300 shadow-2xl z-[9999] rounded-md max-h-60 overflow-y-auto">
                      {searchResults.map((p, idx) => (
                        <div
                          key={idx}
                          onClick={() => selectPatient(p)}
                          className="p-2 hover:bg-gray-300 cursor-pointer  flex justify-between items-center"
                        >
                          <div>

                            <p className="text-sm text-black">{p.user_name}-{p.mobile_no}-{p.userID}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button className="bg-[#F97316] cursor-pointer  text-white px-5 h-10 rounded text-sm flex items-center gap-2">
                  {isSearching ? "..." : <><FaSearch /> Search</>}
                </button>
              </div>
            </div>
          </div>

          <form className="px-2 pt-4 pb-1 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">

              <div className="relative flex items-center text-black border border-gray-300 rounded overflow-hidden ">
                <div className="pl-3 text-gray-500"><User size={15} /></div>
                <input name="name" value={formData.name} onChange={handleInputChange}
                  placeholder="Full Name" className="w-full px-2 py-1 placeholder-gray-500  text-sm outline-none" />
              </div>
              <div className="relative flex items-center border border-gray-300 rounded overflow-hidden">
                <div className="pl-3 text-gray-500"><Phone size={15} /></div>
                <input name="mobile_no" value={formData.mobile_no} onChange={handleInputChange} placeholder="10 Digit Mobile" className="placeholder-gray-500   w-full px-2 py-1 text-sm outline-none" />
              </div>
              <div className="relative flex items-center border border-gray-300 rounded overflow-hidden">
                <div className="pl-3 text-gray-500">
                  <UserCheck size={15} />
                </div>

                <select
                  name="patient_type"
                  value={formData.patient_type}
                  onChange={handleInputChange}
                  className={`w-full px-2 py-1 text-sm outline-none bg-white cursor-pointer ${formData.patient_type === ""
                    ? "text-gray-500"
                    : "text-black"
                    }`}
                >
                  {/* Placeholder */}
                  <option value="">
                    Select Patient Type
                  </option>

                  <option value="1" className="text-black">
                    New Patient
                  </option>

                  <option value="0" className="text-black">
                    Old Patient
                  </option>
                </select>
              </div>
             <div className="relative flex items-center border border-gray-300 rounded overflow-hidden">
                <select
                  name="doctor_id"
                  value={formData.doctor_id}
                  onChange={handleInputChange}
                  className={`w-full px-2 py-1 text-sm outline-none bg-white ${formData.doctor_id === "" ? "text-gray-400" : "text-black"
                    }`}
                >
                  <option value="">
                    Select Doctor
                  </option>
                  <option value="DR1001">Dr. Bharti Aggarwal</option>
                  <option value="DR1002">Dr. Ritesh</option>
                  <option value="DR1003">Dr. S. Sharma</option>
                </select>
              </div>




              

              



              <div className="relative flex items-center border border-gray-300 rounded overflow-hidden">
                <select
                  name="consultancy"
                  value={formData.consultancy}
                  onChange={handleInputChange}
                  className={`w-full px-2 py-1 text-sm outline-none bg-white ${formData.consultancy === "" ? "text-gray-400" : "text-black"
                    }`}
                >
                  <option value="">Select Consultancy</option>
                  <option value="DR1001">Dr. Bharti Aggarwal</option>
                  <option value="DR1002">Dr. Ritesh</option>
                </select>
              </div>




              <div className="flex items-center border border-gray-300 bg-white rounded">
                <input
                  type="date"
                  name="appointment_date"
                  value={formData.appointment_date}
                  onChange={handleInputChange}
                  className="w-1/2 px-2 py-1 text-sm outline-none border-r border-gray-300  "
                />

                <div className="relative w-1/2" ref={dropdownRef}>
                  <div
                    onClick={() => setIsTimeOpen(!isTimeOpen)}
                    className={`px-2 py-1 text-sm cursor-pointer flex justify-between items-center ${formData.appointment_time ? "text-black" : "text-gray-500"}`}
                  >
                    {formData.appointment_time || "Select Time"}
                    <ChevronDown size={14} />
                  </div>

                  {isTimeOpen && (
                    <div className="absolute z-50 left-0 mt-1 w-full bg-white border border-gray-300 shadow-xl rounded-md">
                      <div className="max-h-60 overflow-y-auto custom-scrollbar bg-white">
                        {availableSlots.length > 0 ? (
                          availableSlots.map((slot, index) => (
                            <div
                              key={index}
                              className={`px-3 py-2 text-sm cursor-pointer border-b border-gray-50
                             ${slot.available === 0 ? 'bg-red-50 text-gray-400 cursor-not-allowed' : 'hover:bg-blue-600 hover:text-white text-black'}`}
                              onClick={() => {
                                if (slot.available !== 0) {

                                  setFormData({ ...formData, appointment_time: slot.time || slot.slot_time });
                                  setIsTimeOpen(false);
                                }
                              }}
                            >
                              {/* Yahan check karein ki property name 'time' hai ya 'slot_time' */}
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


              <div className="flex gap-1 col-span-1 md:col-span-2 lg:col-span-3">


                <div className="flex-1">
                  <input
                    type="number"
                    name="birth_of_year"
                    value={formData.birth_of_year}
                    onChange={handleInputChange}
                    placeholder="Birth Year"

                    className="w-full  placeholder-gray-500 px-2 py-1 text-sm border border-gray-300 bg-white text-black"

                  />
                </div>

                {/* Age smaller */}
                <div className="flex-1">
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    readOnly
                    placeholder="Age"
                    className="w-full  placeholder-gray-500 px-2 py-1 text-sm border border-gray-300 bg-white text-black"
                  />
                </div>

                {/* Gender */}
                <div className="flex-1">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-2 py-1 text-sm border border-gray-300 bg-white h-[30px] ${formData.gender ? "text-black" : "text-gray-500"
                      }`}
                  >
                    <option value="">
                      Gender
                    </option>

                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

              </div>



              {[
                {
                  name: "occupation",
                  value: formData.occupation,
                  placeholder: "Select Occupation",
                  options: occupationsList,
                },
                {
                  name: "education",
                  value: formData.education,
                  placeholder: "Select Education",
                  options: educationList,
                },
                {
                  name: "city",
                  value: formData.city,
                  placeholder: "Select City",
                  options: cityList,
                },
              ].map((field) => (
                <div key={field.name} className="  relative flex items-center border border-gray-300 rounded bg-white h-9">
                  <input
                    list={`${field.name}-list`}
                    name={field.name}
                    value={field.value}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="w-full h-full px-2 py-1 items-center text-sm outline-none  "
                  />
                  <div>

                  </div>
                  <datalist id={`${field.name}-list`}>
                    {field.options?.map((opt) => {
                      const label =
                        opt.occupation_name ||
                        opt.education_name ||
                        opt.city_name;

                      return (
                        <option key={opt.id} value={label} className="px-12" />
                      );
                    })}
                  </datalist>
                  <div className="absolute right-1 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        field.name === "occupation"
                          ? setShowAddOccupations(true)
                          : field.name === "education"
                            ? setShowAddEducations(true)
                            : field.name === "city"
                              ? setShowAddCities(true)
                              : null
                      }
                      className="p-1 bg-orange-500 text-white rounded-sm"
                    >
                      <Plus size={12} />
                    </button>



                    <button
                      type="button"
                      onClick={() =>
                        field.name === "occupation"
                          ? handleEditClick("occupation")
                          : field.name === "education"
                            ? handleEditEducation()
                            : field.name === "city"
                              ? handleEditCity()
                              : null
                      }
                      className="p-1 bg-blue-500 text-white rounded-sm"
                    >
                      <Edit2 size={12} />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            <div className="flex text-black flex-col lg:flex-row items-stretch lg:items-center gap-2 ">

              <div className="flex-grow">
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={1}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded outline-none resize-none focus:ring-1 focus:ring-blue-400 flex items-center min-h-[32px] placeholder-gray-500 placeholder-opacity-100" placeholder="Full Address"
                />
              </div>


              <div className="flex flex-row items-center 
                justify-center sm:justify-end 
                gap-1 sm:gap-2">

                {/* Reserved / Review */}
                <div className="flex items-center gap-2 sm:gap-4 bg-gray-50 px-2 sm:px-4 
                  px-2 py-1 border border-gray-200 rounded-sm">

                  <label className="flex items-center gap-1 text-xs
                      font-bold text-gray-700 whitespace-nowrap">
                    <input
                      type="checkbox"
                      name="reserved"
                      checked={formData.reserved}
                      onChange={handleInputChange}
                      className="w-3 h-3 sm:w-4 sm:h-4  accent-blue-600"
                    />
                    Reserved
                  </label>

                  <div className="w-[1px] h-4 sm:h-5 bg-gray-300"></div>

                  <label className="flex items-center gap-1 text-xs 
                      font-bold text-gray-700 whitespace-nowrap">
                    <input
                      type="checkbox"
                      name="review_patient"
                      checked={formData.review_patient}
                      onChange={handleInputChange}
                      className="w-3 h-3 sm:w-4 sm:h-4 accent-blue-600"
                    />
                    Review
                  </label>
                </div>

                {/* Button */}
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-[#22C55E] cursor-pointer  text-white px-2 py-1
                text-[11px] sm:text-sm 
               font-bold rounded-sm whitespace-nowrap 
               flex items-center justify-center">
                  Save & Print
                </button>

              </div>


            </div>


          </form>
        </div>

        <div className="w-full mt-1">
          <PatientsHistory userID={formData.patient_id} />
        </div>

        {/* --- Popups Logic with onSuccess --- */}
        {showAddOccupations && (
          <AddOccupationPopup
            onClose={() => setShowAddOccupations(false)}
            onSuccess={fetchData} // Yeh add kiya hai
          />
        )}
        {showEditOccupations && (
          <EditOccupationPopup
            initialData={selectedOccupation}
            onClose={() => setShowEditOccupations(false)}
            onSuccess={fetchData}
          />
        )}
        {showAddEducations && (
          <AddEducationPopup
            onClose={() => setShowAddEducations(false)}
            onSuccess={fetchData}
          />
        )}
        {showEditEducations && (
          <EditEducationPopup
            initialData={selectedEducation}
            onClose={() => setShowEditEducations(false)}
            onSuccess={fetchData}
          />
        )}

        {showAddCities && (
          <AddCityPopup
            onClose={() => setShowAddCities(false)}
            onSuccess={fetchData} />
        )}

        {showEditCities && (
          <EditCityPopup
            initialData={selectedCity}
            onClose={() => setShowEditCities(false)}
            onSuccess={fetchData}
          />
        )}

      </div>
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
    {label && <label className="font-semibold text-gray-600 mb-1">{label}</label>}
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="px-4 py-2 border border-gray-300  text-gray-500 focus:ring-2 focus:ring-blue-400 outline-none bg-white cursor-pointer"
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