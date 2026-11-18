const ACTIVE_STATUSES = ["booking", "confirmed", "pending"];

// "2026-11-16", "2026-11-16 10:00:00" ya "16-11-2026" -> "2026-11-16"
const toYMD = (value) => {
  const s = String(value ?? "").trim().slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const m = s.match(/^(\d{2})[-/](\d{2})[-/](\d{4})$/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : "";
};

export function hasActiveAppointmentOnDate(history, date) {
  const target = toYMD(date);
  if (!Array.isArray(history) || !target) return false;

  return history.some((item) => {
    const status = String(item?.vstatus || item?.status || "").toLowerCase();
    const itemDate = toYMD(item?.appointment_date || item?.date);
    return ACTIVE_STATUSES.includes(status) && itemDate === target;
  });
}