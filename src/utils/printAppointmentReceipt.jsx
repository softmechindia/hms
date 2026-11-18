// src/utils/printAppointmentReceipt.js

export const printAppointmentReceipt = async ({
  appointment_id,
  patient_id,
  invoice_no = "",
  fallbackData = {},
  onError,
  onAfterWindowOpen,
}) => {
  const printWindow = window.open("", "_blank", "width=600,height=800");

  if (!printWindow) {
    if (onError) {
      onError("Browser blocked the print window. Please allow popups.");
    }
    return;
  }

  printWindow.document.write(
    "<h3 style='font-family:sans-serif;text-align:center;margin-top:50px;'>Generating Receipt... Please Wait.</h3>"
  );

  // Print window khulte hi form reset karne ke liye callback
  if (onAfterWindowOpen) {
    onAfterWindowOpen();
  }

  try {
    const response = await fetch("/appbooking-print-details", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `appointment_id=${appointment_id}&patient_id=${patient_id}&invoice_no=${invoice_no}`,
    });

    const dataText = await response.text();
    let global_di = null;

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
      // Ignore JSON parse errors and use fallback
    }

    // Fallback: build receipt data from passed fallbackData (formData)
    if (!global_di || global_di.length === 0) {
      global_di = [
        {
          invoice_no:
            invoice_no || "REC-" + Math.floor(100000 + Math.random() * 900000),
          today_date: new Date().toISOString(),
          user_id: patient_id,
          user_name: fallbackData.name || "N/A",
          age: fallbackData.age || "N/A",
          gender: fallbackData.gender || "N/A",
          city: fallbackData.city || "N/A",
          mobile_no: fallbackData.mobile_no || "N/A",
          registration_fees: "0",
          consulting_fees: "0",
          grand_total: "0",
          appointment_time: fallbackData.appointment_time || "",
          review_patient: fallbackData.review_patient || "No",
        },
      ];
    }

    const raw = global_di[0]["today_date"] || new Date().toISOString();
    const D = new Date(raw.substring(0, 10));
    const today_date =
      String(D.getDate()).padStart(2, "0") +
      "-" +
      String(D.getMonth() + 1).padStart(2, "0") +
      "-" +
      D.getFullYear();

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

    if (
      global_di[0]["review_patient"] !== "1" &&
      global_di[0]["review_patient"] !== "Yes"
    ) {
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
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 300);
  } catch (err) {
    console.error("Print fetch error:", err);
    // Yahan hum onError ko call nahi karenge taaki booking success message hide na ho, 
    // balki fallback receipt print window me show kar denge
    printWindow.document.body.innerHTML = `
      <div style="text-align:center;font-family:sans-serif;padding:20px;">
        <h3>PUNJAB RHEUMATOLOGY</h3>
        <p>Patient ID: ${patient_id}</p>
        <p>Name: ${fallbackData.name || "N/A"}</p>
        <p>Time: ${fallbackData.appointment_time || ""}</p>
        <p style="color:green;font-weight:bold;">Appointment Booked Successfully!</p>
      </div>
    `;
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 500);
  }
};