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

/**
 * FETCH AVAILABLE SLOTS
 * Fetches slot availability for a specific date
 * @param {String} date -Formate: "YYY-MM-DD"
 */
export const getAvailableSlots = async(date) => {
    const payload = {appointment_date :date};
    return proxyApiRequest("/get_available_slots", "POST", payload);
}


