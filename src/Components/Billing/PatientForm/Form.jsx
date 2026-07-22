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
import { bookAppointment, getAvailableSlots, getEducations, getOccupations, getCity, searchPatient, getDoctors, getConsultancy } from "../../../api/endpoints/authApi";
import { useOutletContext } from "react-router-dom";

function Form() {
  const { triggerRefresh } = useOutletContext();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [occupationsList, setOccupationsList] = useState([]);
  const [educationList, setEducationsList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [consultancyList, setConsultancyList] = useState();

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

  // Popup selections
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // Success/Error message state
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Appointment states 
  const [hasTodayAppointment, setHasTodayAppointment] = useState(false);
  const [doctorsList, setDoctorsList] = useState([]);
  const [todayUpdatedIDs, setTodayUpdatedIDs] = useState([]);

  // Track list for fields where user started typing
  const [touchedFields, setTouchedFields] = useState({});

  const handleSearchFilter = () => {

    if (!formData.fromDate || !formData.toDate || !formData.doctor) {
      alert("Please select From Date, To Date, and Doctor first!");
      return;
    }


    const filtered = allAppointments.filter((item) => {
      const itemDate = new Date(item.date);
      const from = new Date(formData.fromDate);
      const to = new Date(formData.toDate);


      const matchesDate = itemDate >= from && itemDate <= to;
      const matchesDoctor = itemName.doctor_id === formData.doctor;

      return matchesDate && matchesDoctor;
    });


    setDisplayData(filtered);
  };

const initialFormState = {
    patient_id: "",
    doctor_fees: "0",
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


  const getBorderClass = (field) => {

    if (touchedFields[field]) {
      return "border-gray-300 focus-within:ring-2 focus-within:ring-blue-400";
    }

    if (!errorMessage) {
      return "border-gray-300 focus-within:ring-2 focus-within:ring-blue-400";
    }

    const msg = errorMessage.toLowerCase();
    let isValidationError = false;

    if (field === "name" && msg.includes("name")) isValidationError = true;
    if (field === "mobile_no" && msg.includes("mobile")) isValidationError = true;
    if (field === "patient_type" && msg.includes("patient type")) isValidationError = true;
    if (field === "doctor_id" && msg.includes("doctor")) isValidationError = true;
    if (field === "consultancy" && msg.includes("consultancy")) isValidationError = true;
    if (field === "appointment_time" && msg.includes("time")) isValidationError = true;


    return isValidationError
      ? "border-red-500 ring-2 ring-red-200"
      : "border-gray-300 focus-within:ring-2 focus-within:ring-blue-400";
  };



  //Print Functions
  const appbooking_print = async (appointment_id, patient_id, invoice_no = "") => {
    const printWindow = window.open("", "_blank", "width=600,height=800");

    if (!printWindow) {
      alert(" Browser blocked the print window! Please allow popups for this website in your browser settings to print receipts.");
      return;
    }

    printWindow.document.write("<h3 style='font-family:sans-serif; text-align:center; margin-top:50px;'>Generating Receipt... Please Wait.</h3>");

    handleResetForm();

    try {
      const BASE_URL = "/";

      const response = await fetch(`${BASE_URL}appbooking-print-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `appointment_id=${appointment_id}&patient_id=${patient_id}&invoice_no=${invoice_no}`
      });

      const dataText = await response.text();
      let global_di = null;

      try {

        const jsonStartIndex = dataText.indexOf("[");
        const jsonEndIndex = dataText.lastIndexOf("]");

        if (jsonStartIndex !== -1 && jsonEndIndex !== -1 && jsonEndIndex > jsonStartIndex) {
          const cleanedJson = dataText.substring(jsonStartIndex, jsonEndIndex + 1);
          global_di = JSON.parse(cleanedJson);
        } else {

          const objStart = dataText.indexOf("{");
          const objEnd = dataText.lastIndexOf("}");
          if (objStart !== -1 && objEnd !== -1 && objEnd > objStart) {
            const cleanedObj = dataText.substring(objStart, objEnd + 1);
            const parsedObj = JSON.parse(cleanedObj);
            global_di = Array.isArray(parsedObj) ? parsedObj : [parsedObj];
          }
        }
      } catch (parseError) {
        console.error("JSON Clean Up Error, tracing raw payload:", dataText);
      }

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
          doctor_fees: "400",
          grand_total: "400",
          appointment_time: formData.appointment_time || "09:30 AM",
          review_patient: formData.review_patient
        }];
      }

      const report_date1 = global_di[0]['today_date'] ? global_di[0]['today_date'].substring(0, 10) : new Date().toISOString().substring(0, 10);
      const D = new Date(report_date1);
      const mm = ("0" + (D.getMonth() + 1)).slice(-2);
      const dd = ("0" + D.getDate()).slice(-2);
      const yyyy = D.getFullYear();
      const today_date = dd + '-' + mm + '-' + yyyy;

      let winHtml = '<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>Cash Receipt</title>';
      winHtml += '<style type="text/css">';
      winHtml += 'body { margin: 0; padding: 20px; font-family: sans-serif; color: #000; }';
      winHtml += '@media print { body { padding: 10px; } }';
      winHtml += '@page { size: auto; margin: 0mm; }';
      winHtml += '</style></head><body>';

      winHtml += '<div style="text-align: center; width: 100%; max-width: 300px; margin: 0 auto;">';
      winHtml += '<h4 style="padding:0px; margin:0px 0px 4px 0px; font-family: sans-serif; font-size:16px;"><u>PUNJAB RHEUMATOLOGY</u></h4>';
      winHtml += '<p style="font-size: 12px; margin:0px; font-family: sans-serif; line-height:1.4;"> B-35-922/2/1, Ferozepur Road<br> Near MBD Mall, Ludhiana (PB)<br> +91 98787-36644</p>';
      winHtml += '<p style="font-size: 13px; font-weight:bold; text-decoration:underline; margin: 8px 0px; font-family: sans-serif;">Cash Receipt</p>';

      winHtml += '<div style="width:100%; height:22px; border-bottom: 1px solid #000; border-top: 1px solid #000; display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">';
      winHtml += '<div style="width:50%; float:left; text-align: left;"><p style="font-size: 11px; padding:2px; margin: 0px; font-family: sans-serif;">Receipt ID: ' + (global_di[0]['invoice_no'] || invoice_no || 'N/A') + '</p></div>';
      winHtml += '<div style="width:50%; float:right; text-align: right;"><p style="font-size: 11px; padding:2px; margin: 0px; font-family: sans-serif;">Date: ' + today_date + '</p></div>';
      winHtml += '</div>';
      winHtml += '<div style="clear:both;"></div>';

      winHtml += '<div style="width:100%; text-align: left; margin: 3px 0;"><p style="font-size:11px; margin:0; padding:1px 0; font-family: sans-serif;"><b>Patient ID</b> : ' + (global_di[0]['user_id'] || patient_id) + '</p></div>';
      winHtml += '<div style="width:100%; text-align: left; margin: 3px 0;"><p style="font-size:11px; margin:0; padding:1px 0; font-family: sans-serif;"><b>Name</b> : ' + (global_di[0]['user_name'] || formData.name) + '</p></div>';
      winHtml += '<div style="width:100%; text-align: left; margin: 3px 0;"><p style="font-size:11px; margin:0; padding:1px 0; font-family: sans-serif;"><b>Age/Sex</b> : ' + (global_di[0]['age'] || formData.age) + ' | ' + (global_di[0]['gender'] || formData.gender) + ' | City: ' + (global_di[0]['city'] || formData.city) + '</p></div>';
      winHtml += '<div style="width:100%; text-align: left; margin: 3px 0;"><p style="font-size:11px; margin:0; padding:1px 0; font-family: sans-serif;"><b>Mobile</b> : ' + (global_di[0]['mobile_no'] || formData.mobile_no) + '</p></div>';

      if (global_di[0]['review_patient'] !== "1" && global_di[0]['review_patient'] !== "Yes") {
        winHtml += '<table style="width:100%; border-collapse: collapse; border: 1px solid #000; margin-top:10px; font-family:sans-serif; font-size:11px;">';
        winHtml += '<tr style="border-bottom:1px solid #000; font-weight:bold;"><td style="padding:4px; text-align:left;">Charges Desc</td><td style="padding:4px; text-align:right;">Fees</td></tr>';
        winHtml += '<tr><td style="padding:4px; text-align:left;">Registration</td><td style="padding:4px; text-align:right;">' + (global_di[0]['registration_fees'] || "0") + '/-</td></tr>';
        winHtml += '<tr><td style="padding:4px; text-align:left;">Consultation</td><td style="padding:4px; text-align:right;">' + (global_di[0]['consulting_fees'] || "0") + '/-</td></tr>';
        winHtml += '<tr style="border-top:1px solid #000;"><td style="padding:4px; text-align:left;">Total Amount</td><td style="padding:4px; text-align:right;">' + (global_di[0]['grand_total'] || "0") + '/-</td></tr>';
        winHtml += '<tr style="border-top:1px solid #000; font-weight:bold; background-color:lightgray;"><td style="padding:4px; text-align:left;">Net Payable</td><td style="padding:4px; text-align:right;">' + (global_di[0]['grand_total'] || "0") + '/-</td></tr>';
        winHtml += '</table>';
      } else {
        winHtml += '<div style="width:100%; border-top: 1px solid #000; border-bottom: 1px solid #000; margin-top:10px; padding:5px 0;"><p style="font-size: 11px; font-weight:bold; margin: 0px; font-family: sans-serif; text-align:center;">Reviewed Patient</p></div>';
      }

      winHtml += '<p style="font-size: 12px; font-weight: bold; text-align: left; margin-top:12px; font-family:sans-serif;">Time: ' + (global_di[0]['appointment_time'] || formData.appointment_time) + '</p>';
      winHtml += '</div></body></html>';

      printWindow.document.open();
      printWindow.document.write(winHtml);
      printWindow.document.close();

      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 300);

    } catch (error) {
      console.error("Print Engine Processing Interrupted:", error);
      printWindow.document.body.innerHTML = "<h3 style='color:red; text-align:center;'>Network Sync Error! Data render dynamically initialized via form local state instead.</h3>";
    }
  };

  // Reset form handler
  const handleResetForm = () => {
    setFormData(initialFormState);
    setSelectedPatientId("");
    setHasTodayAppointment(false);
    setSearchResults([]);
    setShowSearchDropdown(false);
    setSuccessMessage("");
    setErrorMessage("");
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

    if (value.length < 2) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    try {
      setIsSearching(true);
      const response = await searchPatient({ search_by: value });
      const actualData = response?.fullData || response;

      if (actualData && (actualData.success === 1 || actualData.user_data)) {
        const results = Array.isArray(actualData.user_data) ? actualData.user_data : [actualData.user_data];
        setSearchResults(results);
        setShowSearchDropdown(true);

        const matchedPatient = results.find(p => (p.userID || p.id || "").toString() === value.trim().toString());
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

  // EXISTING PATIENT SELECT FUNCTION
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

  // Timers for messages
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // SAVE BUTTON WITH INTEGRATED ENGINE
  const handleSave = async () => {
    setErrorMessage("");

    if (!formData.name) return setErrorMessage("Please fill name!");
    if (!formData.mobile_no) return setErrorMessage("Please fill Mobile No!");
    if (!formData.patient_type) return setErrorMessage("Please select Patient Type!");
    if (!formData.doctor_id) return setErrorMessage("Please select Doctor");
    if (!formData.consultancy) return setErrorMessage("Please select consultancy");
    if (!formData.appointment_time || formData.appointment_time === "Select Time") {
      return setErrorMessage("Please select valid Appointment Time!");
    }


    const currentId = formData.patient_id ? formData.patient_id.trim() : "";
    const payload = {
      ...formData,
      doctor_fees: formData.doctor_fees.toString(),
      reserved: formData.reserved === "Yes" || formData.reserved === true ? "Yes" : "No",
      review_patient: formData.review_patient === "Yes" || formData.review_patient === true ? "Yes" : "No",
      paid_amount: formData.paid_amount.toString()
    };

    try {
      if (hasTodayAppointment || (currentId && todayUpdatedIDs.includes(currentId))) {
        setSuccessMessage("Patient data updated!");
        if (triggerRefresh) triggerRefresh();
        return;
      }

      const response = await bookAppointment(payload);
      const parsedRes = response?.fullData || response?.data || response;

      const isSuccess =
        parsedRes?.success === 1 ||
        parsedRes?.success === "1" ||
        parsedRes?.status === true ||
        parsedRes?.Appointment_id;

      if (isSuccess) {
        setSuccessMessage(parsedRes?.message || "Your Appointment Booked successfully");

        if (currentId) {
          setTodayUpdatedIDs(prev => [...prev, currentId]);
        }
        setHasTodayAppointment(true);

        const updatedSlots = await getAvailableSlots(formData.appointment_date);
        setAvailableSlots(updatedSlots?.fullData?.slots || updatedSlots?.slots || []);

        const generatedApptId = parsedRes?.Appointment_id || response?.Appointment_id || "APT-" + Date.now();
        const generatedUserId = parsedRes?.user_id || response?.user_id || currentId || parsedRes?.patient_id || "PAT-NEW";

        // REMOVE THE setTimeout AND CALL DIRECTLY
        appbooking_print(generatedApptId, generatedUserId, parsedRes?.invoice_no || "");

        if (triggerRefresh) triggerRefresh();
      }
      else {
        alert(`Warning: ${parsedRes?.message || "Unable to process dynamic response execution layer."}`);
      }
    } catch (err) {
      console.error("Booking Core Failure:", err);
      alert("Server response execution crashed or connectivity failed.");
    }
  };

  // Fetch Slots
  useEffect(() => {
    const fetchSlots = async () => {
      if (!formData.appointment_date) return;
      try {
        const response = await getAvailableSlots(formData.appointment_date);
        const slotsData = response?.fullData?.slots || response?.slots || [];
        setAvailableSlots(Array.isArray(slotsData) ? slotsData : []);
      } catch (err) {
        console.error("Slots Fetch Error:", err);
        setAvailableSlots([]);
      }
    };
    fetchSlots();
  }, [formData.appointment_date]);

  // Click Outside custom logic
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

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));

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
      const [occ, edu, cit, docResponse, consResponse] = await Promise.all([
        getOccupations(),
        getEducations(),
        getCity(),
        getDoctors(),
        getConsultancy()
      ]);

      setOccupationsList(occ?.fullData?.data || occ?.data || []);
      setEducationsList(edu?.fullData?.data || edu?.data || []);
      setCityList(cit?.fullData?.data || cit?.data || []);

      // Fixed lines below:
      setDoctorsList(docResponse?.Getdoctorsdata || docResponse?.fullData?.Getdoctorsdata || []);
      setConsultancyList(consResponse?.Getconsultancydata || consResponse?.fullData?.Getconsultancydata || []);

    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleEditClick = (fieldName) => {
    if (fieldName === "occupation") {
      if (!formData.occupation) return alert("Select First occupation");
      const selected = occupationsList.find((item) => item.occupation_name === formData.occupation);
      if (selected) { setSelectedOccupation(selected); setShowEditOccupations(true); }
    }
  };

  const handleEditEducation = () => {
    if (!formData.education) return alert("Select first education");
    const selected = educationList.find((item) => item.education_name === formData.education);
    if (selected) { setSelectedEducation(selected); setShowEditEducations(true); }
  };

  const handleEditCity = () => {
    if (!formData.city) return alert("Please select a city first");
    const selected = cityList.find((item) => item.city_name?.trim().toLowerCase() === formData.city?.trim().toLowerCase());
    if (selected) { setSelectedCity(selected); setShowEditCities(true); }
  };

  const handleDoctorChange = (e) => {
    const selectedDoctorId = e.target.value;

    // 1. Find the selected doctor's complete data object from doctorsList
    const selectedDoctorObj = doctorsList.find(
      (doc) => doc.userID === selectedDoctorId
    );


    const fetchedFees = selectedDoctorObj?.fees || selectedDoctorObj?.consulting_fees || "0";

    // 3. Clear errors related to doctor field if present
    if (errorMessage && errorMessage.toLowerCase().includes("doctor")) {
      setErrorMessage("");
    }

    // 4. Update the formData object internally
    setFormData((prev) => ({
      ...prev,
      doctor_id: selectedDoctorId,
      doctor_fees: fetchedFees.toString(), // Internal assignment
    }));

    // 5. Console logs to verify the internal data flow
    console.group("Doctor Selection Synced");
    console.log("Selected Doctor ID :", selectedDoctorId);
    console.log("Doctor Full Object :", selectedDoctorObj);
    console.log("Mapped Patient Fee :", fetchedFees);
    console.groupEnd();
  };
  return (
    <div className="rounded-md h-fit bg-white   --text-xs">
      <div className="flex flex-col items-center gap-4">
        <div className="w-full bg-white shadow-xl rounded-md overflow-hidden border border-gray-200">

          {/* Header */}
          <div className="flex items-center justify-between flex-nowrap px-3 py-2 bg-gradient-to-r from-[#4F6EEA] to-[#6FA8FF] shadow-sm overflow-hidden">
            <div className="flex items-center gap-1 text-white font-medium whitespace-nowrap min-w-0">
              <FaUser className="text-white text-lg font-bold flex-shrink-0" />
              <span className="text-[14px] truncate">Search Patient</span>
            </div>
            <div className="flex-1 flex justify-center items-center px-2">
              {successMessage && <div className="bg-green-500/90 rounded-md shadow-md text-white font-bold text-xs sm:text-sm px-4 py-1 text-center max-w-sm sm:max-w-md truncate">✓ {successMessage}</div>}
              {errorMessage && <div className="bg-red-500 rounded-md shadow-md text-white font-bold text-xs sm:text-sm px-4 py-1 text-center max-w-sm sm:max-w-md truncate">⚠ {errorMessage}</div>}
            </div>
            <div className="flex items-center gap-2">

              {selectedPatientId && (
                <button
                  type="button"
                  onClick={() => {
                    appbooking_print("RE-PRINT", selectedPatientId, "");
                  }}
                  className="bg-white text-blue-700 px-3 py-2 text-sm rounded cursor-pointer font-semibold"
                >
                  🖨️ Re-Print
                </button>
              )}
              <button type="button" onClick={handleResetForm} className="bg-white text-gray-700 px-3 py-2 text-sm rounded cursor-pointer font-semibold">🔄 Reset</button>
            </div>
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
                  className="w-full  text-xs h-10 px-3 border border-gray-400 rounded outline-none text-black focus:ring-2 focus:ring-orange-400"
                />
                {showSearchDropdown && searchResults.length > 0 && (
                  <div className="absolute top-11 left-0 w-full bg-white border border-gray-300 shadow-2xl z-[9999] rounded-md max-h-60 overflow-y-auto">
                    {searchResults.map((p, idx) => (
                      <div key={idx} onClick={() => selectPatient(p)} className="p-2 hover:bg-gray-300 cursor-pointer flex justify-between items-center">
                        <p className="text-sm text-black">{p.user_name}-{p.mobile_no}-{p.userID}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* <button type="button" className="bg-[#F97316] cursor-pointer text-white px-5 h-10 rounded text-sm flex items-center gap-2">
                {isSearching ? "..." : <><FaSearch /> Search</>}
              </button> */}
            </div>
          </div>

          {/* Form Fields */}
          <form className="px-2 pt-4 pb-1 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Parent Div par dynamic border call kiya */}
              <div className={`relative flex items-center text-black border rounded overflow-hidden transition-all duration-200 ${getBorderClass("name")}`}>
                <div className="pl-3 text-gray-500"><User size={15} /></div>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full text-xs px-2 py-1 placeholder-gray-500  outline-none"
                />
              </div>

              <div className={`relative flex items-center border rounded overflow-hidden transition-all duration-200 ${getBorderClass("mobile_no")}`}>
                <div className="pl-3 text-gray-500"><Phone size={15} /></div>
                <input
                  type="tel"
                  name="mobile_no"
                  value={formData.mobile_no}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    if (value.length <= 10) {
                      handleInputChange({
                        target: {
                          name: "mobile_no",
                          value,
                        },
                      });
                    }
                  }}
                  maxLength={10}
                  placeholder="10 Digit Mobile"
                  className="placeholder-gray-500 w-full px-2 py-1 text-xs outline-none"
                />              </div>

              <div className={`relative flex items-center border rounded overflow-hidden transition-all duration-200 ${getBorderClass("patient_type")}`}>
                <div className="pl-3 text-gray-500"><UserCheck size={15} /></div>
                <select name="patient_type" value={formData.patient_type} onChange={handleInputChange} className={`w-full px-2 py-1 text-xs outline-none bg-white cursor-pointer ${formData.patient_type === "" ? "text-gray-500" : "text-black"}`}>
                  <option value="">Select Patient Type</option>
                  <option value="1">New Patient</option>
                  <option value="0">Old Patient</option>
                </select>
              </div>
              <div className={`relative flex items-center border rounded overflow-hidden transition-all duration-200 ${getBorderClass("doctor_id")}`}>
                <select name="doctor_id" value={formData.doctor_id} onChange={handleDoctorChange} className={`w-full px-2 py-1 text-xs outline-none bg-white ${formData.doctor_id === "" ? "text-gray-400" : "text-black"}`}>
                  <option value="">Select Doctor</option>
                  {doctorsList.map((doc) => (<option key={doc.id} value={doc.userID}>{doc.user_name}</option>))}
                </select>
              </div>
              <div className={`relative flex items-center border rounded overflow-hidden transition-all duration-200 ${getBorderClass("consultancy")}`}>
                <select name="consultancy" value={formData.consultancy} onChange={handleInputChange} className={`w-full px-2 py-1 text-xs outline-none bg-white ${formData.consultancy === "" ? "text-gray-400" : "text-black"}`}>
                  <option value="">Select Consultancy</option>
                  {consultancyList?.map((doc) => (<option key={doc.id} value={doc.userID}>{doc.user_name}</option>))}
                </select>
              </div>

              {/* Date & Time Selection */}
              <div className={`flex items-center bg-white border rounded transition-all duration-200 ${getBorderClass("appointment_time")}`}>
                <input type="date" name="appointment_date" value={formData.appointment_date} onChange={handleInputChange} className="w-1/2 px-2 py-1 text-xs outline-none border-r border-gray-300" />
                <div className="relative w-1/2" ref={dropdownRef}>
                  <div onClick={() => setIsTimeOpen(!isTimeOpen)} className={`px-2 py-1 text-xs cursor-pointer flex justify-between items-center ${formData.appointment_time ? "text-black" : "text-gray-500"}`}>
                    {formData.appointment_time || "Select Time"}
                    <ChevronDown size={14} />
                  </div>
                  {isTimeOpen && (
                    <div className="absolute z-50 left-0 mt-1 w-full bg-white border border-gray-300 shadow-xl rounded-md">
                      <div className="max-h-60 overflow-y-auto custom-scrollbar bg-white">
                        {availableSlots.length > 0 ? (
                          availableSlots.map((slot, index) => (
                            <div key={index} className={`px-3 py-2 text-xs cursor-pointer border-b border-b-gray-50 ${slot.available === 0 ? 'bg-red-50 text-gray-400 cursor-not-allowed' : 'hover:bg-blue-600 hover:text-white text-black'}`}
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

              {/* Birth, Age & Gender */}
              <div className="flex gap-1 col-span-1 md:col-span-2 lg:col-span-3">
                <div className="flex-1"><input type="number" name="birth_of_year" value={formData.birth_of_year} onChange={handleInputChange} placeholder="Birth Year" className="w-full placeholder-gray-500 px-2 py-1 text-xs border border-gray-300 bg-white text-black" /></div>
                <div className="flex-1"><input type="number" name="age" value={formData.age} readOnly placeholder="Age" className="w-full placeholder-gray-500 px-2 py-1 text-xs border border-gray-300 bg-gray-100 text-black cursor-not-allowed" /></div>
                <div className="flex-1">
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className={`w-full px-2 py-1 text-xs border border-gray-300 bg-white h-[30px] ${formData.gender ? "text-black" : "text-gray-500"}`}>
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Combobox Fields */}
              {[
                { name: "occupation", value: formData.occupation, placeholder: "Select Occupation", options: occupationsList },
                { name: "education", value: formData.education, placeholder: "Select Education", options: educationList },
                { name: "city", value: formData.city, placeholder: "Select City", options: cityList },
              ].map((field) => (
                <div key={field.name} className="relative flex items-center border border-gray-300 rounded bg-white h-9">
                  <input list={`${field.name}-list`} name={field.name} value={field.value} onChange={handleInputChange} placeholder={field.placeholder} className="w-full h-full px-2 py-1 text-xs outline-none text-black" />
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

            {/* Bottom Section Controls */}
            {/* Bottom Section Controls */}
            <div className="flex text-black flex-col lg:flex-row items-stretch lg:items-center gap-2">
              <div className="flex-grow">
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={1}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded outline-none resize-none min-h-[32px] placeholder-gray-500"
                  placeholder="Full Address"
                />
              </div>
              <div className="flex flex-row items-center justify-center sm:justify-end gap-1 sm:gap-2">
                <div className="flex items-center gap-2 sm:gap-4 bg-gray-50 px-2 sm:px-4 py-1 border border-gray-200 rounded-sm">
                  <label className="flex items-center gap-1 font-bold text-gray-700 text-xs">
                    <input
                      type="checkbox"
                      name="reserved"
                      checked={formData.reserved === "Yes" || formData.reserved === true}
                      onChange={handleInputChange}
                      className="w-3.5 h-3.5 text-xs accent-blue-600"
                    />
                    Reserved
                  </label>
                  <div className="w-[1px] h-4 sm:h-5 bg-gray-300"></div>
                  <label className="flex items-center gap-1 font-bold text-gray-700 text-xs whitespace-nowrap">
                    <input
                      type="checkbox"
                      name="review_patient"
                      checked={formData.review_patient === "Yes" || formData.review_patient === true}
                      onChange={handleInputChange}
                      className="w-3.5 h-3.5 text-xs accent-blue-600"
                    />
                    Review
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleSave}
                  className={`cursor-pointer text-white px-3 py-1.5 text-xs font-bold rounded-sm whitespace-nowrap flex items-center justify-center transition shadow-sm ${hasTodayAppointment ? "bg-amber-500" : "bg-[#22C55E]"}`}
                >
                  {hasTodayAppointment ? "Update Info" : "Save & Print"}
                </button>
              </div>
            </div>

          </form>
        </div>

        <div className="w-full mt-1">
          <PatientsHistory userID={selectedPatientId} />
        </div>

        {/* Dynamic Metadata Modification Modals */}
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