import React, { useState, useRef, useEffect } from "react";
import { Plus, Edit2, ChevronDown, User, Phone, UserCheck } from "lucide-react";
import PatientsHistory from "../Patient-History/Patient-history";
import AddOccupationPopup from "../Popup/AddOccupationPopup";
import EditOccupationPopup from "../Popup/EditOccupationPopup";
import AddEducationPopup from "../Popup/AddEducationPopup";
import EditEducationPopup from "../Popup/EditEducationPopup";
import AddCityPopup from "../Popup/AddCityPopup";
import EditCityPopup from "../Popup/EditCityPopup";
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

  // Today's date in YYYY-MM-DD format, used as the minimum selectable date
  const todayDateString = new Date().toLocaleDateString("en-CA");

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

  // User-facing notification banners (green = success, red = error)
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // True when the selected patient already has an active (non-cancelled) appointment
  // on the currently selected appointment_date.
  // Set exclusively by onHistoryLoaded / onCancelSuccess callbacks from real API data.
  // When true, the Save button switches to "Update Info" and a new booking is blocked.
  const [hasActiveDateAppointment, setHasActiveDateAppointment] = useState(false);

  // Stores the loaded history list so we can re-check when the date changes
  const [loadedHistory, setLoadedHistory] = useState([]);

  // Incrementing this key forces PatientsHistory to re-fetch after a booking or cancel
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);

  // Default empty state for the form — used on mount and after reset
  const initialFormState = {
    patient_id: "",
    doctor_fees: "0",
    name: "",
    mobile_no: "",
    patient_type: "",     // "1" = New Patient, "0" = Old Patient
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
    appointment_date: new Date().toISOString().split("T")[0], // Defaults to today
    appointment_time: "",
    appointment_by: "Billing",
    appointment_mode: "Offline",
    payment_mode: "Cash",
    paid_amount: "0",
    reserved: "No",       // Optional — does not block booking
    review_patient: "No", // Optional — does not block booking
    review_payment: "No",
    ref_by: "",
    vstatus: "confirmed",
    created_by: "ST0001",
  };

  const [formData, setFormData] = useState(initialFormState);

  // ─────────────────────────────────────────────────────────────────
  // getBorderClass
  // Returns a red border class when a validation error message
  // matches the given field name — visually highlights the problem field.
  // ─────────────────────────────────────────────────────────────────
  const getBorderClass = (field) => {
    if (!errorMessage) return "border-gray-300 focus-within:ring-2 focus-within:ring-blue-400";

    const msg = errorMessage.toLowerCase();
    const errorMap = {
      name: "name",
      mobile_no: "mobile",
      patient_type: "patient type",
      gender: "gender",
      doctor_id: "doctor",
      consultancy: "consultancy",
      appointment_time: "time",
    };

    const isError = errorMap[field] && msg.includes(errorMap[field]);
    return isError
      ? "border-red-500 ring-2 ring-red-200"
      : "border-gray-300 focus-within:ring-2 focus-within:ring-blue-400";
  };

  // ─────────────────────────────────────────────────────────────────
  // appbooking_print
  // Opens a new browser window and prints the appointment receipt.
  // Fetches receipt data from the backend print endpoint.
  // If the backend returns no data, falls back to building the receipt
  // from the current form state so printing never silently fails.
  // ─────────────────────────────────────────────────────────────────
  const appbooking_print = async (appointment_id, patient_id, invoice_no = "") => {
    const printWindow = window.open("", "_blank", "width=600,height=800");

    if (!printWindow) {
      setErrorMessage("Browser blocked the print window. Please allow popups.");
      return;
    }

    printWindow.document.write(
      "<h3 style='font-family:sans-serif;text-align:center;margin-top:50px;'>Generating Receipt... Please Wait.</h3>"
    );

    // Reset form fields after print window opens — history guard is preserved
    resetFormAfterPrint();

    try {
      const response = await fetch("/appbooking-print-details", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `appointment_id=${appointment_id}&patient_id=${patient_id}&invoice_no=${invoice_no}`,
      });

      const dataText = await response.text();
      let global_di = null;

      // The backend sometimes wraps JSON inside HTML.
      // Extract JSON by finding the first [ or { in the response text.
      try {
        const jsonStart = dataText.indexOf("[");
        const jsonEnd = dataText.lastIndexOf("]");
        if (jsonStart !== -1 && jsonEnd > jsonStart) {
          global_di = JSON.parse(dataText.substring(jsonStart, jsonEnd + 1));
        } else {
          const objStart = dataText.indexOf("{");
          const objEnd = dataText.lastIndexOf("}");
          if (objStart !== -1 && objEnd > objStart) {
            const parsed = JSON.parse(dataText.substring(objStart, objEnd + 1));
            global_di = Array.isArray(parsed) ? parsed : [parsed];
          }
        }
      } catch (e) {
        console.error("Print JSON parse error:", e);
      }

      // Fallback: build receipt data from current form state
      if (!global_di || global_di.length === 0) {
        global_di = [{
          invoice_no: invoice_no || "REC-" + Math.floor(100000 + Math.random() * 900000),
          today_date: new Date().toISOString(),
          user_id: patient_id,
          user_name: formData.name || "N/A",
          age: formData.age || "N/A",
          gender: formData.gender || "N/A",
          city: formData.city || "N/A",
          mobile_no: formData.mobile_no || "N/A",
          registration_fees: "0",
          consulting_fees: "0",
          grand_total: "0",
          appointment_time: formData.appointment_time || "",
          review_patient: formData.review_patient,
        }];
      }

      // Convert date from YYYY-MM-DD to DD-MM-YYYY for display
      const raw = global_di[0]["today_date"] || new Date().toISOString();
      const D = new Date(raw.substring(0, 10));
      const today_date =
        String(D.getDate()).padStart(2, "0") + "-" +
        String(D.getMonth() + 1).padStart(2, "0") + "-" +
        D.getFullYear();

      // Build the receipt HTML string
      let winHtml = `<!doctype html><html><head><meta charset="UTF-8"><title>Cash Receipt</title>
        <style>body{margin:0;padding:20px;font-family:sans-serif;}@media print{body{padding:10px;}}@page{size:auto;margin:0mm;}</style>
        </head><body><div style="text-align:center;width:100%;max-width:300px;margin:0 auto;">`;

      winHtml += `<h4 style="margin:0 0 4px;font-size:16px;"><u>PUNJAB RHEUMATOLOGY</u></h4>`;
      winHtml += `<p style="font-size:12px;margin:0;line-height:1.4;">B-35-922/2/1, Ferozepur Road<br>Near MBD Mall, Ludhiana (PB)<br>+91 98787-36644</p>`;
      winHtml += `<p style="font-size:13px;font-weight:bold;text-decoration:underline;margin:8px 0;">Cash Receipt</p>`;
      winHtml += `<div style="display:flex;justify-content:space-between;border-top:1px solid #000;border-bottom:1px solid #000;padding:2px 0;margin-bottom:5px;">
        <span style="font-size:11px;">Receipt ID: ${global_di[0]["invoice_no"] || invoice_no || "N/A"}</span>
        <span style="font-size:11px;">Date: ${today_date}</span></div>`;
      winHtml += `<p style="font-size:11px;text-align:left;margin:3px 0;"><b>Patient ID</b> : ${global_di[0]["user_id"] || patient_id}</p>`;
      winHtml += `<p style="font-size:11px;text-align:left;margin:3px 0;"><b>Name</b> : ${global_di[0]["user_name"] || "N/A"}</p>`;
      winHtml += `<p style="font-size:11px;text-align:left;margin:3px 0;"><b>Age/Sex</b> : ${global_di[0]["age"]} | ${global_di[0]["gender"]} | City: ${global_di[0]["city"]}</p>`;
      winHtml += `<p style="font-size:11px;text-align:left;margin:3px 0;"><b>Mobile</b> : ${global_di[0]["mobile_no"]}</p>`;

      // Review patients get a simplified receipt without fee breakdown
      if (global_di[0]["review_patient"] !== "1" && global_di[0]["review_patient"] !== "Yes") {
        winHtml += `<table style="width:100%;border-collapse:collapse;border:1px solid #000;margin-top:10px;font-size:11px;">
          <tr style="border-bottom:1px solid #000;font-weight:bold;"><td style="padding:4px;">Charges Desc</td><td style="padding:4px;text-align:right;">Fees</td></tr>
          <tr><td style="padding:4px;">Registration</td><td style="padding:4px;text-align:right;">${global_di[0]["registration_fees"] || "0"}/-</td></tr>
          <tr><td style="padding:4px;">Consultation</td><td style="padding:4px;text-align:right;">${global_di[0]["consulting_fees"] || "0"}/-</td></tr>
          <tr style="border-top:1px solid #000;"><td style="padding:4px;">Total Amount</td><td style="padding:4px;text-align:right;">${global_di[0]["grand_total"] || "0"}/-</td></tr>
          <tr style="border-top:1px solid #000;font-weight:bold;background:lightgray;"><td style="padding:4px;">Net Payable</td><td style="padding:4px;text-align:right;">${global_di[0]["grand_total"] || "0"}/-</td></tr>
          </table>`;
      } else {
        winHtml += `<div style="border-top:1px solid #000;border-bottom:1px solid #000;padding:5px 0;margin-top:10px;text-align:center;font-size:11px;font-weight:bold;">Reviewed Patient</div>`;
      }

      winHtml += `<p style="font-size:12px;font-weight:bold;text-align:left;margin-top:12px;">Time: ${global_di[0]["appointment_time"] || ""}</p>`;
      winHtml += `</div></body></html>`;

      printWindow.document.open();
      printWindow.document.write(winHtml);
      printWindow.document.close();
      setTimeout(() => { printWindow.focus(); printWindow.print(); printWindow.close(); }, 300);

    } catch (err) {
      console.error("Print error:", err);
      printWindow.document.body.innerHTML =
        "<h3 style='color:red;text-align:center;'>Print failed. Please try again.</h3>";
    }
  };

  // ─────────────────────────────────────────────────────────────────
  // handleResetForm — Full reset via Reset button or clearing search input.
  // Clears everything including history guard state.
  // ─────────────────────────────────────────────────────────────────
  const handleResetForm = () => {
    setFormData(initialFormState);
    setSelectedPatientId("");
    setHasActiveDateAppointment(false);
    setLoadedHistory([]);
    setSearchResults([]);
    setShowSearchDropdown(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  // resetFormAfterPrint — Called after print window opens.
  // Only clears form fields — preserves loadedHistory and hasActiveDateAppointment
  // so the duplicate booking guard stays active after a successful booking.
  const resetFormAfterPrint = () => {
    setFormData(initialFormState);
    setSelectedPatientId("");
    setSearchResults([]);
    setShowSearchDropdown(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  // ─────────────────────────────────────────────────────────────────
  // handleSearchInput
  // Fires on every keystroke in the search box.
  // Calls the searchPatient API and shows a dropdown of matching patients.
  // hasTodayAppointment is always reset to false here —
  // the correct value is set later by onHistoryLoaded once history loads.
  // ─────────────────────────────────────────────────────────────────
  const handleSearchInput = async (value) => {
    if (!value || value.trim() === "") {
      handleResetForm();
      return;
    }

    setFormData((prev) => ({ ...prev, patient_id: value }));
    setSelectedPatientId("");
    setHasActiveDateAppointment(false); // Reset — will be re-evaluated after history loads
    setLoadedHistory([]);

    if (value.length < 2) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    try {
      setIsSearching(true);
      const response = await searchPatient({ search_by: value });
      const actualData = response?.fullData || response;

      if (actualData?.success === 1 || actualData?.user_data) {
        const results = Array.isArray(actualData.user_data)
          ? actualData.user_data
          : [actualData.user_data];
        setSearchResults(results.filter(Boolean));
        setShowSearchDropdown(true);
      } else {
        setSearchResults([]);
        setShowSearchDropdown(false);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────
  // checkActiveForDate
  // Checks whether a patient already has an active appointment on
  // a specific date (defaults to formData.appointment_date).
  // Active statuses: booking, confirmed, pending.
  // Cancelled and completed appointments do NOT block a new booking.
  // Works for both current date and future dates.
  // ─────────────────────────────────────────────────────────────────
  const checkActiveForDate = (historyList, targetDate) => {
    const dateToCheck = targetDate || formData.appointment_date;
    if (!dateToCheck) return false;

    const activeStatuses = ["booking", "confirmed", "pending"];

    return historyList.some((appt) => {
      const apptDate = (appt.appointment_date || appt.date || "").split(" ")[0];
      const status = (appt.vstatus || appt.status || "").toLowerCase();
      return apptDate === dateToCheck && activeStatuses.includes(status);
    });
  };

  // ─────────────────────────────────────────────────────────────────
  // selectPatient
  // Called when a patient is picked from the search dropdown.
  // Fills the form with that patient's existing data.
  // If birth_of_year is missing, it is derived from age.
  // hasTodayAppointment is reset here — PatientsHistory will load
  // and onHistoryLoaded will set the correct value.
  // ─────────────────────────────────────────────────────────────────
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
      patient_type: "0", // Existing patient found by search is always "Old"
    }));

    setSelectedPatientId(pId);
    setShowSearchDropdown(false);
    setHasActiveDateAppointment(false); // Correct value set by onHistoryLoaded after history loads
    setLoadedHistory([]);
  };

  // ─────────────────────────────────────────────────────────────────
  // Auto Age Calculation
  // When the user types a 4-digit birth year, age is automatically
  // calculated and filled into the read-only age field.
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const yearStr = formData.birth_of_year?.toString();
    if (yearStr?.length === 4) {
      const age = new Date().getFullYear() - parseInt(yearStr);
      if (!isNaN(age)) setFormData((prev) => ({ ...prev, age: age.toString() }));
    }
  }, [formData.birth_of_year]);

  // Re-evaluate active appointment check whenever the selected date changes.
  // If the patient has history loaded and they change the date,
  // immediately check if they already have an active appointment on the new date.
  useEffect(() => {
    if (loadedHistory.length > 0) {
      setHasActiveDateAppointment(checkActiveForDate(loadedHistory, formData.appointment_date));
    }
  }, [formData.appointment_date]);

  // Auto-dismiss success banner after 4 seconds
  useEffect(() => {
    if (successMessage) {
      const t = setTimeout(() => setSuccessMessage(""), 4000);
      return () => clearTimeout(t);
    }
  }, [successMessage]);

  // Auto-dismiss error banner after 3 seconds
  useEffect(() => {
    if (errorMessage) {
      const t = setTimeout(() => setErrorMessage(""), 3000);
      return () => clearTimeout(t);
    }
  }, [errorMessage]);

  // ─────────────────────────────────────────────────────────────────
  // handleSave — Main submit handler for Save & Print / Update Info
  //
  // Flow:
  //   1. Validate required fields — show specific field-level errors
  //   2. Pre-flight check — re-verify against loadedHistory directly
  //      (guards against state being wiped by reset after print)
  //   3. If hasActiveDateAppointment → call updateAppointment API
  //   4. If no active appointment → call bookAppointment API
  //   5. On success: message, history refresh, My Patient refresh, print
  //
  // Duplicate rule: ONE patient = ONE active appointment per date,
  // regardless of doctor, time, or number of form submissions.
  // ─────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setErrorMessage("");

    // Step 1 — Required field validation with specific messages
    if (!formData.name?.trim())           return setErrorMessage("Patient name is required.");
    if (!formData.mobile_no?.trim())      return setErrorMessage("Mobile number is required.");
    if (formData.mobile_no.trim().length !== 10)
                                          return setErrorMessage("Mobile number must be 10 digits.");
    if (!formData.patient_type)           return setErrorMessage("Please select Patient Type (New/Old).");
    if (!formData.gender)                 return setErrorMessage("Please select Gender.");
    if (!formData.doctor_id)              return setErrorMessage("Please select a Doctor.");
    if (!formData.consultancy)            return setErrorMessage("Please select Consultancy.");
    if (!formData.appointment_time || formData.appointment_time === "Select Time")
                                          return setErrorMessage("Please select an Appointment Time.");

    const currentId = formData.patient_id?.trim() || "";
    const selectedDate = formData.appointment_date;

    // Step 2 — Pre-flight duplicate check directly against loadedHistory.
    // This re-checks the history list in memory regardless of hasActiveDateAppointment state,
    // so it catches cases where the state was cleared by reset/print.
    // Rule: same patient + same date + active status → block, regardless of doctor.
    const activeStatuses = ["booking", "confirmed", "pending"];
    const alreadyActive = loadedHistory.some((appt) => {
      const apptDate = (appt.appointment_date || appt.date || "").split(" ")[0];
      const status = (appt.vstatus || appt.status || "").toLowerCase();
      return apptDate === selectedDate && activeStatuses.includes(status);
    });

    if (alreadyActive) {
      setHasActiveDateAppointment(true); // Sync state with reality
      return setErrorMessage(
        `This patient already has an active appointment on ${selectedDate}. Cancel it first to book another.`
      );
    }

    // Build payload — reserved and review are optional checkboxes, never block submission
    const payload = {
      ...formData,
      doctor_fees: (formData.doctor_fees || "0").toString(),
      reserved: formData.reserved === "Yes" || formData.reserved === true ? "Yes" : "No",
      review_patient: formData.review_patient === "Yes" || formData.review_patient === true ? "Yes" : "No",
      paid_amount: (formData.paid_amount || "0").toString(),
    };

    try {
      // Step 2 — Patient already has an active appointment on the selected date: UPDATE
      if (hasActiveDateAppointment) {
        const response = await updateAppointment(payload);
        const fullData = response?.fullData || {};
        const ok = fullData?.success === 1 || fullData?.success === "1" || response?.status === true;

        if (ok) {
          setSuccessMessage(fullData?.message || "Appointment updated successfully!");
          setHistoryRefreshKey((prev) => prev + 1);
          if (onBookingSuccess) onBookingSuccess();
          if (triggerRefresh) triggerRefresh();
        } else {
          setErrorMessage(fullData?.message || "Update failed. Please try again.");
        }
        return;
      }

      // Step 3 — No active appointment today: BOOK NEW
      const response = await bookAppointment(payload);

      // Expected API response: { success: 1, Appointment_id, Invoice_no, user_id, message, history }
      const fullData = response?.fullData || {};
      const isSuccess = fullData?.success === 1 || fullData?.success === "1";

      if (isSuccess) {
        setSuccessMessage(fullData?.message || "Appointment booked successfully!");

        // Switch to Update mode — prevents duplicate booking for the same date.
        // Also inject the new appointment into loadedHistory so the pre-flight
        // check in handleSave will catch any repeated submissions immediately.
        setHasActiveDateAppointment(true);
        const newAppt = {
          appointment_id: fullData?.Appointment_id || "",
          appointment_date: selectedDate,
          vstatus: "booking",
        };
        setLoadedHistory((prev) => [newAppt, ...prev]);
        setHistoryRefreshKey((prev) => prev + 1);

        // Refresh available slots so the booked slot shows as unavailable
        const updatedSlots = await getAvailableSlots(formData.appointment_date);
        setAvailableSlots(updatedSlots?.fullData?.slots || updatedSlots?.slots || []);

        // Open print receipt window
        const apptId  = fullData?.Appointment_id || "APT-" + Date.now();
        const userId  = fullData?.user_id || currentId || "PAT-NEW";
        const invoice = fullData?.Invoice_no || "";
        appbooking_print(apptId, userId, invoice);

        if (onBookingSuccess) onBookingSuccess(); // Refresh My Patient panel
        if (triggerRefresh) triggerRefresh();     // Refresh Navbar counters

      } else {
        // API returned success: 0 — show the API's own message in the center banner
        setErrorMessage(fullData?.message || "Booking failed. Please try again.");
      }
    } catch (err) {
      // Network or server-level failure
      console.error("Booking error:", err);
      setErrorMessage("Server error. Please try again.");
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
        console.error("Slots fetch error:", err);
        setAvailableSlots([]);
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

  // ─────────────────────────────────────────────────────────────────
  // handleInputChange
  // Generic change handler for all text inputs, selects, and checkboxes.
  // Also clears the error banner when the user fills in the problem field.
  // ─────────────────────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updated = type === "checkbox" ? (checked ? "Yes" : "No") : value;
    setFormData((prev) => ({ ...prev, [name]: updated }));

    // Clear error banner as soon as the relevant field is filled
    if (errorMessage) {
      const clearFields = ["name", "mobile_no", "patient_type", "doctor_id", "consultancy", "gender"];
      if (clearFields.includes(name) && updated) setErrorMessage("");
      if (name === "appointment_time" && updated && updated !== "Select Time") setErrorMessage("");
    }
  };

  // ─────────────────────────────────────────────────────────────────
  // fetchData
  // Runs once on component mount.
  // Loads all dropdown option lists in parallel:
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
      console.error("fetchData error:", err);
    }
  };

  // ─────────────────────────────────────────────────────────────────
  // Edit Popup Handlers
  // Each handler validates that a value is selected before opening
  // the corresponding edit popup with the matching list item.
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
  // When a doctor is selected, automatically populate doctor_fees
  // from the doctor's data in the doctors list.
  // ─────────────────────────────────────────────────────────────────
  const handleDoctorChange = (e) => {
    const selectedId = e.target.value;
    const doctorObj = doctorsList.find((d) => d.userID === selectedId);
    const fees = doctorObj?.fees || doctorObj?.consulting_fees || "0";

    if (errorMessage?.toLowerCase().includes("doctor")) setErrorMessage("");

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

              {/* Patient Type: New or Old */}
              <div className={`relative flex items-center border rounded overflow-hidden transition-all duration-200 ${getBorderClass("patient_type")}`}>
                <div className="pl-3 text-gray-500"><UserCheck size={15} /></div>
                <select name="patient_type" value={formData.patient_type} onChange={handleInputChange}
                  className={`w-full px-2 py-1 text-xs outline-none bg-white cursor-pointer ${formData.patient_type === "" ? "text-gray-500" : "text-black"}`}>
                  <option value="">Select Patient Type</option>
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
                                setFormData({ ...formData, appointment_time: slot.time || slot.slot_time });
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
                    className={`w-full px-2 py-1 text-xs border border-gray-300 bg-white h-[30px] ${formData.gender ? "text-black" : "text-gray-500"}`}>
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
                { name: "education",  value: formData.education,  placeholder: "Select Education",  options: educationList  },
                { name: "city",       value: formData.city,       placeholder: "Select City",        options: cityList       },
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
                        opt.education_name  ||
                        opt.city_name       ||
                        opt.name            ||
                        opt.title           ||
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
                        field.name === "education"  ? setShowAddEducations(true)  :
                        setShowAddCities(true)
                      }>
                      <Plus size={12} />
                    </button>
                    {/* Blue pencil — opens the Edit selected item popup */}
                    <button type="button" className="p-1 bg-blue-500 text-white rounded-sm"
                      onClick={() =>
                        field.name === "occupation" ? handleEditClick("occupation") :
                        field.name === "education"  ? handleEditEducation()         :
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
                <button type="button" onClick={handleSave}
                  className={`cursor-pointer text-white px-3 py-1.5 text-xs font-bold rounded-sm whitespace-nowrap flex items-center justify-center transition shadow-sm ${
                    hasActiveDateAppointment ? "bg-amber-500" : "bg-[#22C55E]"
                  }`}>
                  {hasActiveDateAppointment ? "Update Info" : "Save & Print"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Patient History table
            - userID: fetches history for the selected patient
            - refreshKey: incrementing this triggers a re-fetch (after booking/cancel)
            - onHistoryLoaded: receives the loaded history list to check for today's active appointment
            - onCancelSuccess: receives the updated list after a cancel, re-evaluates active status */}
        <div className="w-full mt-1">
          <PatientsHistory
            userID={selectedPatientId}
            refreshKey={historyRefreshKey}
            onHistoryLoaded={(list) => {
              setLoadedHistory(list);
              setHasActiveDateAppointment(checkActiveForDate(list, formData.appointment_date));
            }}
            onCancelSuccess={(updatedList) => {
              setLoadedHistory(updatedList);
              setHasActiveDateAppointment(checkActiveForDate(updatedList, formData.appointment_date));
            }}
          />
        </div>

        {/* Modals for adding and editing Occupation, Education, and City list items */}
        {showAddOccupations  && <AddOccupationPopup  onClose={() => setShowAddOccupations(false)}  onSuccess={fetchData} />}
        {showEditOccupations && <EditOccupationPopup initialData={selectedOccupation} onClose={() => setShowEditOccupations(false)} onSuccess={fetchData} />}
        {showAddEducations   && <AddEducationPopup   onClose={() => setShowAddEducations(false)}   onSuccess={fetchData} />}
        {showEditEducations  && <EditEducationPopup  initialData={selectedEducation}  onClose={() => setShowEditEducations(false)}  onSuccess={fetchData} />}
        {showAddCities       && <AddCityPopup        onClose={() => setShowAddCities(false)}       onSuccess={fetchData} />}
        {showEditCities      && <EditCityPopup       initialData={selectedCity}       onClose={() => setShowEditCities(false)}      onSuccess={fetchData} />}
      </div>
    </div>
  );
}

export default Form;
