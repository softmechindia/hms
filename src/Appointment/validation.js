const fail = (field, message) => ({ valid: false, field, message });

export function validateAppointment(d) {
  if (!d.name?.trim()) return fail("name", "Patient name is required.");
  if (!d.mobile_no?.trim()) return fail("mobile_no", "Mobile number is required.");
  if (d.mobile_no.trim().length !== 10) return fail("mobile_no", "Mobile number must be 10 digits.");
  if (!d.patient_type) return fail("patient_type", "Please select Patient Type (New/Old).");
  if (d.patient_type === "0" && !d.patient_id?.trim())
    return fail("patient_id", "Please select an existing patient.");
  if (!d.gender) return fail("gender", "Please select Gender.");
  if (!d.doctor_id) return fail("doctor_id", "Please select a Doctor.");
  if (!d.consultancy) return fail("consultancy", "Please select Consultancy.");
  if (!d.appointment_time || d.appointment_time === "Select Time")
    return fail("appointment_time", "Please select an Appointment Time.");
  return { valid: true };
}