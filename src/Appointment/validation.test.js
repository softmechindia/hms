import { describe, it, expect } from "vitest";
import { validateAppointment } from "./validation";

const validData = {
  name: "Ravi",
  mobile_no: "9876543210",
  patient_type: "1",
  patient_id: "",
  gender: "Male",
  doctor_id: "D1",
  consultancy: "C1",
  appointment_time: "10:00 AM",
};

describe("validateAppointment", () => {
  it("valid data par valid:true deta hai", () => {
    expect(validateAppointment(validData)).toEqual({ valid: true });
  });

  it("name khali ho to name field error", () => {
    const r = validateAppointment({ ...validData, name: "   " });
    expect(r).toEqual({ valid: false, field: "name", message: "Patient name is required." });
  });

  it("mobile khali ho to error", () => {
    expect(validateAppointment({ ...validData, mobile_no: "" }).field).toBe("mobile_no");
  });

  it("mobile 10 digit nahi ho to error", () => {
    const r = validateAppointment({ ...validData, mobile_no: "98765" });
    expect(r.message).toBe("Mobile number must be 10 digits.");
  });

  it("gender, doctor, consultancy khali ho to alag alag field error", () => {
    expect(validateAppointment({ ...validData, gender: "" }).field).toBe("gender");
    expect(validateAppointment({ ...validData, doctor_id: "" }).field).toBe("doctor_id");
    expect(validateAppointment({ ...validData, consultancy: "" }).field).toBe("consultancy");
  });

  it("time khali ya 'Select Time' ho to error", () => {
    expect(validateAppointment({ ...validData, appointment_time: "" }).field).toBe("appointment_time");
    expect(validateAppointment({ ...validData, appointment_time: "Select Time" }).field).toBe("appointment_time");
  });

  it("Old patient (type 0) bina patient_id ke invalid hai", () => {
    const r = validateAppointment({ ...validData, patient_type: "0", patient_id: "" });
    expect(r.valid).toBe(false);
    expect(r.field).toBe("patient_id");
  });

  it("Old patient ID ke saath valid hai", () => {
    expect(validateAppointment({ ...validData, patient_type: "0", patient_id: "P100" }).valid).toBe(true);
  });
});