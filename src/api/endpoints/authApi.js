import { proxyApiRequest } from "../apiglobal/apiProxy";


//  LOGIN FUNCTION
export const loginUser = async (UserID, Password) => {
    const loginData = { user_id: UserID, password: Password };
    return proxyApiRequest("/login", "POST", loginData)
};


//    BOOKAPPOINTMENT
export const bookAppointment = async (appointmentDetails) => {
    return proxyApiRequest("/book_appointment", "POST", appointmentDetails)
}


//   FETCH AVAILABLE SLOTS
export const getAvailableSlots = async (date) => {
    const payload = { appointment_date: date };
    return proxyApiRequest("/get_available_slots", "POST", payload);
}



//   List of available occupations 
export const getOccupations = async () => {
    return proxyApiRequest("/getOccupation", "GET");
}


//   List of available Educations
export const getEducations = async () => {
    return proxyApiRequest("/getEducation", "GET");
}

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