import { describe, it, expect } from "vitest";
import { hasActiveAppointmentOnDate } from "./activeAppointment";

describe("hasActiveAppointmentOnDate", () => {
  it("history khali ho ya null ho to false", () => {
    expect(hasActiveAppointmentOnDate([], "2026-11-16")).toBe(false);
    expect(hasActiveAppointmentOnDate(null, "2026-11-16")).toBe(false);
  });

  it("us date par booking ho to true", () => {
    const h = [{ appointment_date: "2026-11-16", vstatus: "booking" }];
    expect(hasActiveAppointmentOnDate(h, "2026-11-16")).toBe(true);
  });

  it("confirmed aur pending bhi active hain", () => {
    expect(hasActiveAppointmentOnDate([{ appointment_date: "2026-11-16", vstatus: "confirmed" }], "2026-11-16")).toBe(true);
    expect(hasActiveAppointmentOnDate([{ appointment_date: "2026-11-16", vstatus: "pending" }], "2026-11-16")).toBe(true);
  });

  it("us date par cancel ya complete ho to false", () => {
    expect(hasActiveAppointmentOnDate([{ appointment_date: "2026-11-16", vstatus: "cancel" }], "2026-11-16")).toBe(false);
    expect(hasActiveAppointmentOnDate([{ appointment_date: "2026-11-16", vstatus: "complete" }], "2026-11-16")).toBe(false);
  });

  it("alag date ki appointment ho to false", () => {
    const h = [{ appointment_date: "2026-11-17", vstatus: "booking" }];
    expect(hasActiveAppointmentOnDate(h, "2026-11-16")).toBe(false);
  });

  it("future date ki booking par bhi us date ke liye true", () => {
    const h = [{ appointment_date: "2026-11-20", vstatus: "confirmed" }];
    expect(hasActiveAppointmentOnDate(h, "2026-11-20")).toBe(true);
  });

  it("DD-MM-YYYY format ki date bhi match ho", () => {
    const h = [{ appointment_date: "16-11-2026", vstatus: "booking" }];
    expect(hasActiveAppointmentOnDate(h, "2026-11-16")).toBe(true);
  });

  it("date ke saath time ho (YYYY-MM-DD HH:mm:ss) to bhi match ho", () => {
    const h = [{ appointment_date: "2026-11-16 10:30:00", vstatus: "booking" }];
    expect(hasActiveAppointmentOnDate(h, "2026-11-16")).toBe(true);
  });

  it("vstatus na ho to status field use ho", () => {
    const h = [{ appointment_date: "2026-11-16", status: "booking" }];
    expect(hasActiveAppointmentOnDate(h, "2026-11-16")).toBe(true);
  });

  it("ek cancel aur ek active ho to true", () => {
    const h = [
      { appointment_date: "2026-11-16", vstatus: "cancel" },
      { appointment_date: "2026-11-16", vstatus: "booking" },
    ];
    expect(hasActiveAppointmentOnDate(h, "2026-11-16")).toBe(true);
  });
});