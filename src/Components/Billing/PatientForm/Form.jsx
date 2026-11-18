import React, { useState, useRef, useEffect } from "react";
import { Plus, Edit2, ChevronDown, User, Phone, UserCheck } from "lucide-react";
import PatientsHistory from "../Patient-History/Patient-history";
import AddOccupationPopup from "../Popup/AddOccupationPopup";
import EditOccupationPopup from "../Popup/EditOccupationPopup";
import AddEducationPopup from "../Popup/AddEducationPopup";
import EditEducationPopup from "../Popup/EditEducationPopup";
import AddCityPopup from "../Popup/AddCityPopup";
import EditCityPopup from "../Popup/EditCityPopup";
import { printAppointmentReceipt } from "../../../utils/printAppointmentReceipt";
import { FaUser } from "react-icons/fa";
import {
  bookAppointment,
  updateAppointment,
  getAvailableSlots,
  getEducations,
  getOccupations,
  getCity,
  searchPatient,
  getDoctors,
  getConsultancy,
} from "../../../api/endpoints/authApi";
import { useOutletContext } from "react-router-dom";

import { validateAppointment } from "../../../Appointment/validation";
import { getFieldBorderClass } from "../../../Appointment/helpers";
import { hasActiveAppointmentOnDate } from "../../../Appointment/activeAppointment";

// ─────────────────────────────────────────────────────────────────
// Form Component
// Handles patient search, form fill, and appointment booking/update.
// ─────────────────────────────────────────────────────────────────
function Form({ onBookingSuccess }) {
  // triggerRefresh comes from Layout via outlet context.
  // Calling it updates the Navbar appointment counters.
  const { triggerRefresh } = useOutletContext();

  // Available time slots fetched from API for the selected date
  const [availableSlots, setAvailableSlots] = useState([]);

  // Controls open/close state of the custom time slot dropdown
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  // Dropdown option lists loaded on component mount
  const [occupationsList, setOccupationsList] = useState([]);
  const [educationList, setEducationsList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]);
  const [consultancyList, setConsultancyList] = useState([]);

  // Today's date in YYYY-MM-DD format (local India time)
  const getToday = () => new Date().toLocaleDateString("en-CA");
  const todayDateString = getToday();

  // Patient search: results list, loading state, dropdown visibility, selected patient ID
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState("");

  // Ref attached to the time dropdown container to detect outside clicks
  const dropdownRef = useRef(null);

  // Popup visibility states for Add/Edit modals
  const [showAddEducations, setShowAddEducations] = useState(false);
  const [showEditEducations, setShowEditEducations] = useState(false);
  const [showAddOccupations, setShowAddOccupations] = useState(false);
  const [showEditOccupations, setShowEditOccupations] = useState(false);
  const [showAddCities, setShowAddCities] = useState(false);
  const [showEditCities, setShowEditCities] = useState(false);

  // Holds the currently selected item passed into edit popups
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Name of the form field that failed validation (drives the red border)
  const [errorField, setErrorField] = useState("");

  const [hasActiveDateAppointment, setHasActiveDateAppointment] = useState(false);

  // Stores the loaded history list so we can re-check when the date changes
  const [loadedHistory, setLoadedHistory] = useState([]);

  // Incrementing this key forces PatientsHistory to re-fetch after a booking or cancel
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);

  // Stop double-click saves:
  // ref = instant guard inside the code, state = makes the button show "Saving..."
  const [isSaving, setIsSaving] = useState(false);
  const isSavingRef = useRef(false);
  const searchTimerRef = useRef(null);
  const searchIdRef = useRef(0);

  // Default empty state for the form — used on mount and after reset
  const initialFormState = {
    patient_id: "",
    doctor_fees: "0",
    name: "",
    mobile_no: "",
    patient_type: "1",     // "1" = New Patient, "0" = Old Patient
    email: "",
    gender: "",
    birth_of_year: "",
    age: "",              // Auto-calculated from birth_of_year
    occupation: "",
    education: "",
    marital_status: "",
    city: "",
    address: "",
    doctor_id: "",
    consultancy: "",
    appointment_date: getToday(),
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
    created_by: "ST0001",
  };

  const [formData, setFormData] = useState(initialFormState);

  // ─────────────────────────────────────────────────────────────────
  // getBorderClass
  // Red border on the field that failed validation, normal otherwise.
  // "Old patient without ID" error is shown on the Patient Type box.
  // ─────────────────────────────────────────────────────────────────
  const getBorderClass = (field) => {
    const target =
      field === "patient_type" && errorField === "patient_id" ? "patient_id" : field;
    return getFieldBorderClass(errorField, target);
  };

  // Clears the error banner + red border together
  const clearError = () => {
    setErrorMessage("");
    setErrorField("");
  };

  //prrint PF  appbooking_print//
  const appbooking_print = (appointment_id, patient_id, invoice_no = "") => {
    printAppointmentReceipt({
      appointment_id,
      patient_id,
      invoice_no,
      fallbackData: formData,
      onError: setErrorMessage,
      onAfterWindowOpen: resetFormAfterPrint,
    });
  };

  // ─────────────────────────────────────────────────────────────────
  // handleResetForm — Full reset via Reset button or clearing search input.
  //  ─────────────────────────────────────────────────────────────────
  const handleResetForm = () => {
    setFormData(initialFormState);
    setSelectedPatientId("");
    setHasActiveDateAppointment(false);
    setLoadedHistory([]);
    setSearchResults([]);
    setShowSearchDropdown(false);
    setSuccessMessage("");
    clearError();
  };

  const resetFormAfterPrint = () => {
    setFormData(initialFormState);
    setSelectedPatientId("");
    setLoadedHistory([]);
    setHasActiveDateAppointment(false);
    setSearchResults([]);
    setShowSearchDropdown(false);
    setSuccessMessage("");
    clearError();
  };

  const handlePatientTypeChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      patient_type: value,
      patient_id: value === "1" ? "" : prev.patient_id,
    }));

    if (errorField === "patient_type" || errorField === "patient_id") clearError();

    if (value === "1") {
      setSelectedPatientId("");
      setLoadedHistory([]);
      setHasActiveDateAppointment(false);
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  };

  const normalize = (v) => String(v ?? "").trim().replace(/\s+/g, " ").toLowerCase();

  const handleSearchInput = (value) => {
    clearTimeout(searchTimerRef.current);

    if (!value || value.trim() === "") {
      searchIdRef.current += 1;
      handleResetForm();
      return;
    }

    setFormData((prev) => ({ ...prev, patient_id: value }));
    setSelectedPatientId("");
    setHasActiveDateAppointment(false);
    setLoadedHistory([]);

    if (value.length < 2) {
      searchIdRef.current += 1;
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    searchTimerRef.current = setTimeout(() => runSearch(value), 300);
  };

  const runSearch = async (value) => {
    const myId = ++searchIdRef.current;

    try {
      setIsSearching(true);
      const response = await searchPatient({ search_by: value });
      if (myId !== searchIdRef.current) return;

      const actualData = response?.fullData || response;

      if (actualData?.success === 1 || actualData?.user_data) {
        const results = Array.isArray(actualData.user_data)
          ? actualData.user_data
          : [actualData.user_data];

        const q = normalize(value);
        const isDigits = /^\d+$/.test(q);

        const filtered = results.filter(Boolean).filter((p) =>
          normalize(p.user_name).startsWith(q) ||
          normalize(p.userID || p.id).startsWith(q) ||
          (isDigits && String(p.mobile_no || "").startsWith(q))
        );

        setSearchResults(filtered);
        setShowSearchDropdown(filtered.length > 0);
      } else {
        setSearchResults([]);
        setShowSearchDropdown(false);
      }
    } catch (err) {
      if (myId !== searchIdRef.current) return;
      setSearchResults([]);
      setShowSearchDropdown(false);
      setErrorMessage("Patient search failed. Please try again.");
    } finally {
      if (myId === searchIdRef.current) setIsSearching(false);
    }
  };










  const selectPatient = (patient) => {
    const pId = patient.userID || patient.id || patient.patient_id || "";



    // Derive birth_of_year from age when the API returns it empty
    const rawBirthYear = patient.birth_of_year || "";
    const derivedBirthYear = rawBirthYear
      ? rawBirthYear
      : patient.age
        ? String(new Date().getFullYear() - parseInt(patient.age))
        : "";

    setFormData((prev) => ({
      ...prev,
      patient_id: pId,
      name: patient.user_name || "",
      mobile_no: patient.mobile_no || "",
      email: patient.email_id || "",
      gender: patient.gender || "",
      age: patient.age || "",
      birth_of_year: derivedBirthYear,
      occupation: patient.occupation || "",
      education: patient.education || "",
      city: patient.city || "",
      address: patient.address || "",
      patient_type: "0",
    }));

    setSelectedPatientId(pId);
    setShowSearchDropdown(false);
    setHasActiveDateAppointment(false);
    setLoadedHistory([]);
    clearError();


  };

  // ─────────────────────────────────────────────────────────────────
  // Auto Age Calculation
  // When the user types a 4-digit birth year, age is automatically
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const yearStr = formData.birth_of_year?.toString();
    if (yearStr?.length === 4) {
      const age = new Date().getFullYear() - parseInt(yearStr);
      if (!isNaN(age)) setFormData((prev) => ({ ...prev, age: age.toString() }));
    }
  }, [formData.birth_of_year]);

  // Auto-dismiss success banner after 4 seconds
  useEffect(() => {
    if (successMessage) {
      const t = setTimeout(() => setSuccessMessage(""), 4000);
      return () => clearTimeout(t);
    }
  }, [successMessage]);

  // Auto-dismiss error banner (and red border) after 3 seconds
  useEffect(() => {
    if (errorMessage) {
      const t = setTimeout(() => {
        setErrorMessage("");
        setErrorField("");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [errorMessage]);

  // Update Info vs Save & Print:
  // patient ki selected date par active appointment hai ya nahi
  useEffect(() => {
    setHasActiveDateAppointment(
      Boolean(selectedPatientId) &&
      hasActiveAppointmentOnDate(loadedHistory, formData.appointment_date)
    );
  }, [loadedHistory, formData.appointment_date, selectedPatientId]);


  //________________________________________________handleSave______________________________________________
  const handleSave = async () => {
    // A save is already running: ignore this click
    if (isSavingRef.current) return;

    setErrorMessage("");
    setErrorField("");

    // Validation lives in validation.js (pure function, unit tested)
    const check = validateAppointment({ ...formData, patient_id: selectedPatientId });
    if (!check.valid) {
      setErrorField(check.field);
      return setErrorMessage(check.message);
    }

    // Lock only after validation passes, so a failed validation never locks the button
    isSavingRef.current = true;
    setIsSaving(true);

    const currentId = formData.patient_id?.trim() || "";
    const selectedDate = formData.appointment_date;

    // Build payload — reserved and review are optional checkboxes, never block submission
    const payload = {
      ...formData,
      doctor_fees: (formData.doctor_fees || "0").toString(),
      reserved: formData.reserved === "Yes" || formData.reserved === true ? "Yes" : "No",
      review_patient: formData.review_patient === "Yes" || formData.review_patient === true ? "Yes" : "No",
      paid_amount: (formData.paid_amount || "0").toString(),
    };

    try {
      // Patient already has an active appointment on the selected date: UPDATE
      if (hasActiveDateAppointment) {
        const response = await updateAppointment(payload);
        const fullData = response?.fullData || {};
        const ok =
          typeof fullData === "object" &&
          (fullData?.success === 1 || fullData?.success === "1" || response?.status === true);

        if (ok) {
          setSuccessMessage(fullData?.message || "Appointment updated successfully!");
          setHistoryRefreshKey((prev) => prev + 1);
          if (onBookingSuccess) onBookingSuccess();
          if (triggerRefresh) triggerRefresh();
        } else {
          setErrorMessage(
            typeof fullData === "string"
              ? "Server error: the update was not saved. Please contact the admin."
              : fullData?.message || "Update failed. Please try again."
          );
        }
        return;
      }

      // No active appointment today: BOOK NEW
      const response = await bookAppointment(payload);

      // Expected API response: { success: 1, Appointment_id, Invoice_no, user_id, message, history }
      const fullData = response?.fullData || {};
      const isSuccess = fullData?.success === 1 || fullData?.success === "1";

      if (isSuccess) {
        setSuccessMessage(fullData?.message || "Appointment booked successfully!");

        const newAppt = {
          appointment_id: fullData?.Appointment_id || "",
          appointment_date: selectedDate,
          vstatus: "booking",
        };
        setLoadedHistory((prev) => [newAppt, ...prev]);
        setHistoryRefreshKey((prev) => prev + 1);

        try {
          const updatedSlots = await getAvailableSlots(formData.appointment_date);
          setAvailableSlots(updatedSlots?.fullData?.slots || updatedSlots?.slots || []);
        } catch (e) {
          // Booking already saved; slot refresh failure should not block printing
        }

        // Open print receipt window
        const apptId = fullData?.Appointment_id || "APT-" + Date.now();
        const userId = fullData?.user_id || currentId || "PAT-NEW";
        const invoice = fullData?.Invoice_no || "";
        appbooking_print(apptId, userId, invoice);

        if (onBookingSuccess) onBookingSuccess();
        if (triggerRefresh) triggerRefresh();
      } else {
        // If the server sends an HTML error page, fullData is a string
        setErrorMessage(
          typeof fullData === "string"
            ? "Server error: the appointment was not saved. Please contact the admin."
            : fullData?.message || "Booking failed. Please try again."
        );
      }
    } catch (err) {
      setErrorMessage("Server error. Please try again.");
    } finally {
      // Runs on every path (success, failure, early return), so the button never stays locked
      isSavingRef.current = false;
      setIsSaving(false);
    }
  };


  // ─────────────────────────────────────────────────────────────────
  // fetchSlots
  // Whenever the appointment date changes, fetch the available time
  // slots for that date from the API.
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchSlots = async () => {
      if (!formData.appointment_date) return;
      try {
        const response = await getAvailableSlots(formData.appointment_date);
        const slotsData = response?.fullData?.slots || response?.slots || [];
        setAvailableSlots(Array.isArray(slotsData) ? slotsData : []);
      } catch (err) {
        setAvailableSlots([]);
        setErrorMessage("Could not load time slots. Please try again.");
      }
    };
    fetchSlots();
  }, [formData.appointment_date]);

  // Close the time slot dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsTimeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //__________________________________________handleInputChange _______________________________________

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updated = type === "checkbox" ? (checked ? "Yes" : "No") : value;
    setFormData((prev) => ({
      ...prev, [name]: updated,
      ...(name === "appointment_date" ? { appointment_time: "" } : {})
    }));

    // Clear the error as soon as the field that failed is edited
    if (errorField === name && updated) clearError();
  };

  // ─────────────────────────────────────────────────────────────────
  // Occupations, Educations, Cities, Doctors, Consultancy.
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [occ, edu, cit, docRes, consRes] = await Promise.all([
        getOccupations(),
        getEducations(),
        getCity(),
        getDoctors(),
        getConsultancy(),
      ]);
      setOccupationsList(occ?.fullData?.data || occ?.data || []);
      setEducationsList(edu?.fullData?.data || edu?.data || []);
      setCityList(cit?.fullData?.data || cit?.data || []);
      setDoctorsList(docRes?.Getdoctorsdata || docRes?.fullData?.Getdoctorsdata || []);
      setConsultancyList(consRes?.Getconsultancydata || consRes?.fullData?.Getconsultancydata || []);
    } catch (err) {
      setErrorMessage("Could not load doctors/lists. Please refresh the page.");
    }
  };

  // ─────────────────────────────────────────────────────────────────
  // Edit Popup Handlers
  // ─────────────────────────────────────────────────────────────────
  const handleEditClick = (field) => {
    if (field === "occupation") {
      if (!formData.occupation) return setErrorMessage("Select an occupation first.");
      const found = occupationsList.find((i) => i.occupation_name === formData.occupation);
      if (found) { setSelectedOccupation(found); setShowEditOccupations(true); }
    }
  };

  const handleEditEducation = () => {
    if (!formData.education) return setErrorMessage("Select an education first.");
    const found = educationList.find((i) => i.education_name === formData.education);
    if (found) { setSelectedEducation(found); setShowEditEducations(true); }
  };

  const handleEditCity = () => {
    if (!formData.city) return setErrorMessage("Select a city first.");
    const found = cityList.find(
      (i) => i.city_name?.trim().toLowerCase() === formData.city?.trim().toLowerCase()
    );
    if (found) { setSelectedCity(found); setShowEditCities(true); }
  };

  // ─────────────────────────────────────────────────────────────────
  // handleDoctorChange
  //  ─────────────────────────────────────────────────────────────────
  const handleDoctorChange = (e) => {
    const selectedId = e.target.value;
    const doctorObj = doctorsList.find((d) => d.userID === selectedId);
    const fees = doctorObj?.fees || doctorObj?.consulting_fees || "0";

    if (errorField === "doctor_id") clearError();

    setFormData((prev) => ({
      ...prev,
      doctor_id: selectedId,
      doctor_fees: fees.toString(),
    }));
  };

  // ─────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────
  return (
    <div className="rounded-md h-fit bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-full bg-white shadow-xl rounded-md overflow-hidden border border-gray-200">

          {/* Header: title on left, success/error banner in center, action buttons on right */}
          <div className="flex items-center justify-between flex-nowrap px-3 py-2 bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF] shadow-sm overflow-hidden">
            <div className="flex items-center gap-1 text-white font-medium whitespace-nowrap min-w-0">
              <FaUser className="text-white text-lg font-bold flex-shrink-0" />
              <span className="text-[14px] truncate">Search Patient</span>
            </div>

            {/* Notification banners — only one shows at a time */}
            <div className="flex-1 flex justify-center items-center px-2">
              {successMessage && (
                <div className="bg-green-500/90 rounded-md text-white font-bold text-xs px-4 py-1 truncate">
                  ✓ {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="bg-red-500 rounded-md text-white font-bold text-xs px-4 py-1 truncate">
                  ⚠ {errorMessage}
                </div>
              )}
            </div>

            {/* Re-Print only visible when a patient is selected; Reset always visible */}
            <div className="flex items-center gap-2">
              {selectedPatientId && (
                <button
                  type="button"
                  onClick={() => appbooking_print("RE-PRINT", selectedPatientId, "")}
                  className="bg-white text-blue-700 px-3 py-2 text-sm rounded cursor-pointer font-semibold"
                >
                  🖨️ Re-Print
                </button>
              )}
              <button
                type="button"
                onClick={handleResetForm}
                className="bg-white text-gray-700 px-3 py-2 text-sm rounded cursor-pointer font-semibold"
              >
                🔄 Reset
              </button>
            </div>
          </div>

          {/* Search bar — type patient ID, name, or mobile to search */}
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
                  className="w-full text-xs h-10 px-3 border border-gray-400 rounded outline-none text-black focus:ring-2 focus:ring-orange-400"
                />

                {/* Dropdown list of matching patients */}
                {showSearchDropdown && searchResults.length > 0 && (
                  <div className="absolute top-11 left-0 w-full bg-white border border-gray-300 shadow-2xl z-[9999] rounded-md max-h-64 overflow-y-auto divide-y divide-gray-200">
                    {searchResults.map((p, idx) => (
                      <div
                        key={idx}
                        onClick={() => selectPatient(p)}
                        className="p-2 hover:bg-gray-50 cursor-pointer"
                      >
                        <span className="font-semibold text-gray-800 text-sm">
                          {p.user_name || "N/A"} — {p.userID || p.id} — {p.mobile_no}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form fields grid */}
          <form className="px-2 pt-4 pb-1 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

              {/* Full Name */}
              <div className={`relative flex items-center text-black border rounded overflow-hidden transition-all duration-200 ${getBorderClass("name")}`}>
                <div className="pl-3 text-gray-500"><User size={15} /></div>
                <input name="name" value={formData.name} onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full text-xs px-2 py-1 placeholder-gray-500 outline-none" />
              </div>

              {/* Mobile — digits only, max 10 characters */}
              <div className={`relative flex items-center border rounded overflow-hidden transition-all duration-200 ${getBorderClass("mobile_no")}`}>
                <div className="pl-3 text-gray-500"><Phone size={15} /></div>
                <input
                  type="tel" name="mobile_no" value={formData.mobile_no}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 10) handleInputChange({ target: { name: "mobile_no", value: val } });
                  }}
                  maxLength={10} placeholder="10 Digit Mobile"
                  className="placeholder-gray-500 w-full px-2 py-1 text-xs outline-none"
                />
              </div>

              <div className={`relative flex items-center border rounded overflow-hidden transition-all duration-200 ${getBorderClass("patient_type")}`}>
                <div className="pl-3 text-gray-500">
                  <UserCheck size={15} />
                </div>

                <select
                  name="patient_type"
                  value={formData.patient_type}
                  onChange={handlePatientTypeChange}
                  className="w-full px-2 py-1 text-xs outline-none bg-white"
                >
                  <option value="1">New Patient</option>
                  <option value="0">Old Patient</option>
                </select>
              </div>

              {/* Doctor — selecting a doctor auto-fills doctor_fees */}
              <div className={`relative flex items-center border rounded overflow-hidden transition-all duration-200 ${getBorderClass("doctor_id")}`}>
                <select name="doctor_id" value={formData.doctor_id} onChange={handleDoctorChange}
                  className={`w-full px-2 py-1 text-xs outline-none bg-white ${formData.doctor_id === "" ? "text-gray-400" : "text-black"}`}>
                  <option value="">Select Doctor</option>
                  {doctorsList.map((doc) => (
                    <option key={doc.id} value={doc.userID}>{doc.user_name}</option>
                  ))}
                </select>
              </div>

              {/* Consultancy */}
              <div className={`relative flex items-center border rounded overflow-hidden transition-all duration-200 ${getBorderClass("consultancy")}`}>
                <select name="consultancy" value={formData.consultancy} onChange={handleInputChange}
                  className={`w-full px-2 py-1 text-xs outline-none bg-white ${formData.consultancy === "" ? "text-gray-400" : "text-black"}`}>
                  <option value="">Select Consultancy</option>
                  {consultancyList?.map((doc) => (
                    <option key={doc.id} value={doc.userID}>{doc.user_name}</option>
                  ))}
                </select>
              </div>

              {/* Appointment Date + Time Slot picker */}
              <div className={`flex items-center bg-white border rounded transition-all duration-200 ${getBorderClass("appointment_time")}`}>
                <input type="date" name="appointment_date" min={todayDateString}
                  value={formData.appointment_date} onChange={handleInputChange}
                  className="w-1/2 px-2 py-1 text-xs outline-none border-r border-gray-300" />

                {/* Custom dropdown showing available/booked slots from API */}
                <div className="relative w-1/2" ref={dropdownRef}>
                  <div onClick={() => setIsTimeOpen(!isTimeOpen)}
                    className={`px-2 py-1 text-xs cursor-pointer flex justify-between items-center ${formData.appointment_time ? "text-black" : "text-gray-500"}`}>
                    {formData.appointment_time || "Select Time"}
                    <ChevronDown size={14} />
                  </div>
                  {isTimeOpen && (
                    <div className="absolute z-50 left-0 mt-1 w-full bg-white border border-gray-300 shadow-xl rounded-md">
                      <div className="max-h-60 overflow-y-auto">
                        {availableSlots.length > 0 ? availableSlots.map((slot, i) => (
                          <div key={i}
                            className={`px-3 py-2 text-xs border-b border-gray-50 ${slot.available === 0
                              ? "bg-red-50 text-gray-400 cursor-not-allowed"
                              : "hover:bg-blue-600 hover:text-white text-black cursor-pointer"}`}
                            onClick={() => {
                              if (slot.available !== 0) {
                                setFormData((prev) => ({
                                  ...prev,
                                  appointment_time: slot.time || slot.slot_time,
                                }));
                                if (errorField === "appointment_time") clearError();
                                setIsTimeOpen(false);
                              }
                            }}
                          >
                            {slot.time || slot.slot_time}
                            {slot.available === 0 && (
                              <span className="ml-2 text-[10px] text-red-400">(Booked)</span>
                            )}
                          </div>
                        )) : (
                          <div className="px-3 py-2 text-xs text-gray-500">No slots for this date</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Birth Year + Age (read-only, auto-calculated) + Gender */}
              <div className="flex gap-1 col-span-1 md:col-span-2 lg:col-span-3">
                <div className="flex-1">
                  <input type="number" name="birth_of_year" value={formData.birth_of_year}
                    onChange={handleInputChange} placeholder="Birth Year"
                    className="w-full placeholder-gray-500 px-2 py-1 text-xs border border-gray-300 bg-white text-black" />
                </div>
                {/* Age is read-only — calculated automatically from birth_of_year */}
                <div className="flex-1">
                  <input type="number" name="age" value={formData.age} readOnly placeholder="Age"
                    className="w-full placeholder-gray-500 px-2 py-1 text-xs border border-gray-300 bg-gray-100 text-black cursor-not-allowed" />
                </div>
                <div className="flex-1">
                  <select name="gender" value={formData.gender} onChange={handleInputChange}
                    className={`w-full px-2 py-1 text-xs border bg-white h-[30px] ${formData.gender ? "text-black" : "text-gray-500"} ${errorField === "gender" ? "border-red-500 ring-2 ring-red-200" : "border-gray-300"}`}>
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Occupation, Education, City — each has an Add (+) and Edit (pencil) button */}
              {[
                { name: "occupation", value: formData.occupation, placeholder: "Select Occupation", options: occupationsList },
                { name: "education", value: formData.education, placeholder: "Select Education", options: educationList },
                { name: "city", value: formData.city, placeholder: "Select City", options: cityList },
              ].map((field) => (
                <div key={field.name} className="relative flex items-center border border-gray-300 rounded bg-white h-9">
                  <input list={`${field.name}-list`} name={field.name} value={field.value}
                    onChange={handleInputChange} placeholder={field.placeholder}
                    className="w-full h-full px-2 py-1 text-xs outline-none text-black" />
                  <datalist id={`${field.name}-list`}>
                    {field.options?.map((opt, i) => {
                      // Support both MongoDB (_id) and custom (id) primary keys
                      const key = opt._id || opt.id || i;
                      // Extract label — try all known field name patterns + generic fallbacks
                      const label =
                        opt.occupation_name ||
                        opt.education_name ||
                        opt.city_name ||
                        opt.name ||
                        opt.title ||
                        (typeof opt === "string" ? opt : "");
                      // Skip rendering if label couldn't be resolved
                      if (!label) return null;
                      return <option key={key} value={label} />;
                    })}
                  </datalist>
                  <div className="absolute right-1 flex items-center gap-1">
                    {/* Orange plus — opens the Add new item popup */}
                    <button type="button" className="p-1 bg-orange-500 text-white rounded-sm"
                      onClick={() =>
                        field.name === "occupation" ? setShowAddOccupations(true) :
                          field.name === "education" ? setShowAddEducations(true) :
                            setShowAddCities(true)
                      }>
                      <Plus size={12} />
                    </button>
                    {/* Blue pencil — opens the Edit selected item popup */}
                    <button type="button" className="p-1 bg-blue-500 text-white rounded-sm"
                      onClick={() =>
                        field.name === "occupation" ? handleEditClick("occupation") :
                          field.name === "education" ? handleEditEducation() :
                            handleEditCity()
                      }>
                      <Edit2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom row: address textarea + optional checkboxes + submit button */}
            <div className="flex text-black flex-col lg:flex-row items-stretch lg:items-center gap-2">
              <div className="flex-grow">
                <textarea name="address" value={formData.address} onChange={handleInputChange}
                  rows={1} placeholder="Full Address"
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded outline-none resize-none min-h-[32px] placeholder-gray-500" />
              </div>

              <div className="flex flex-row items-center justify-end gap-1 sm:gap-2">
                {/* Reserved and Review are optional — they never block form submission */}
                <div className="flex items-center gap-2 sm:gap-4 bg-gray-50 px-2 sm:px-4 py-1 border border-gray-200 rounded-sm">
                  <label className="flex items-center gap-1 font-bold text-gray-700 text-xs">
                    <input type="checkbox" name="reserved"
                      checked={formData.reserved === "Yes" || formData.reserved === true}
                      onChange={handleInputChange}
                      className="w-3.5 h-3.5 accent-blue-600" />
                    Reserved
                  </label>
                  <div className="w-[1px] h-4 bg-gray-300" />
                  <label className="flex items-center gap-1 font-bold text-gray-700 text-xs whitespace-nowrap">
                    <input type="checkbox" name="review_patient"
                      checked={formData.review_patient === "Yes" || formData.review_patient === true}
                      onChange={handleInputChange}
                      className="w-3.5 h-3.5 accent-blue-600" />
                    Review
                  </label>
                </div>

                {/* Button label and color change based on whether today's appointment exists:
                    green "Save & Print" = fresh booking
                    amber "Update Info"  = updating existing today's appointment */}
                <button type="button" onClick={handleSave} disabled={isSaving}
                  className={`select-none cursor-pointer text-white px-3 py-1.5 text-xs font-bold rounded-sm whitespace-nowrap flex items-center justify-center transition shadow-sm ${hasActiveDateAppointment ? "bg-amber-500" : "bg-[#22C55E]"
                    } ${isSaving ? "opacity-60 cursor-not-allowed" : ""}`}>
                  {isSaving ? "Saving..." : hasActiveDateAppointment ? "Update Info" : "Save & Print"}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="w-full mt-1">
          <PatientsHistory
            userID={selectedPatientId}
            refreshKey={historyRefreshKey}
            onHistoryLoaded={setLoadedHistory}
            onCancelSuccess={setLoadedHistory}
          />
        </div>

        {/* Modals for adding and editing Occupation, Education, and City list items */}
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
