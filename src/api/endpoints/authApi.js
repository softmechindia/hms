import { proxyApiRequest } from "../apiglobal/apiProxy";


//  LOGIN FUNCTION
export const loginUser = async (UserID, Password) => {
    const loginData = { user_id: UserID, password: Password };
    return proxyApiRequest("/login", "POST", loginData)
};


//    BOOKAPPOINTMENTg
export const bookAppointment = async (appointmentDetails) => {
    return proxyApiRequest("/book_appointment", "POST", appointmentDetails)
};


//   FETCH AVAILABLE SLOTS
export const getAvailableSlots = async (date) => {
    const payload = { appointment_date: date };
    return proxyApiRequest("/get_available_slots", "POST", payload);
};



//   List of available occupations 
export const getOccupations = async () => {
    return proxyApiRequest("/getOccupation", "GET");
};


//   List of available Educations
export const getEducations = async () => {
    return proxyApiRequest("/getEducation", "GET");
};

//   List of available City
export const getCity = async () => {
    return proxyApiRequest("/getCity", "GET")
}

export const saveOccupation = async (payload) => {
   
    return proxyApiRequest("/aeOccupation", "POST", payload);
};

export const saveEducation = async (payload) => {
    
    return proxyApiRequest("/aeEducation", "POST", payload);
};

export const saveCity = async (payload) => {
    
    return proxyApiRequest("/aeCity", "POST", payload);
};

// Search Patient
export const searchPatient = async(payload) => {
    return proxyApiRequest("/searchPatient", "POST", payload);
};  

//Patient History
export const searchHistory = async (payload) => {
    return proxyApiRequest("/searchPatient", "POST", payload);
};

// Cancel Appointment
export const cancelAppointment = async (payload) => {
    return proxyApiRequest("/cancelAppointment", "POST", payload);
};

// Get doctors list
export const getDoctors = () => {
  return proxyApiRequest("/getDoctors", "GET");
};

//  My-Patient Get-My-Bookings
export const getMyBookings = (payload) => {
    return proxyApiRequest("/getMyBookings", "POST", payload);

};
