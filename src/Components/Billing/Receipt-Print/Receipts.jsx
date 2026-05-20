import React from 'react';

export const CashReceipt = React.forwardRef(({ data }, ref) => {
  if (!data) return null;

  // Format date: dd-mm-yyyy
  const d = new Date();
  const todayDate = `${("0" + d.getDate()).slice(-2)}-${("0" + (d.getMonth() + 1)).slice(-2)}-${d.getFullYear()}`;

  return (
    <div ref={ref} className="p-8 w-full max-w-[400px] mx-auto bg-white font-sans text-black print:block hidden">
      {/* Header */}
      <div className="text-center w-full mb-4">
        <h4 className="text-lg font-bold underline uppercase">PUNJAB RHEUMATOLOGY</h4>
        <p className="text-xs leading-tight">
          B-35-922/2/1, Ferozepur Road, Near MBD Mall, Ludhiana (PB)<br />
          +91 98787-36644
        </p>
        <p className="text-sm font-bold underline mt-2 uppercase italic">Cash Receipt</p>
      </div>

      {/* ID/Date Bar */}
      <div className="w-full flex border-t border-b border-black py-1 mb-3">
        <div className="w-1/2 text-left text-[10px]">Receipt ID: {data.invoice_no || 'N/A'}</div>
        <div className="w-1/2 text-right text-[10px]">Date: {todayDate}</div>
      </div>

      {/* Patient Info */}
      <div className="space-y-1 text-xs mb-4">
        <p><span className="inline-block w-20 font-semibold">Patient ID</span>: {data.patient_id}</p>
        <p><span className="inline-block w-20 font-semibold">Name</span>: {data.name}</p>
        <p><span className="inline-block w-20 font-semibold">Age/Sex</span>: {data.age} | {data.gender} | City: {data.city}</p>
        <p><span className="inline-block w-20 font-semibold">Mobile</span>: {data.mobile_no}</p>
      </div>

      {/* Fees Table */}
      {data.review_patient !== "Yes" ? (
        <div className="border border-black">
          <div className="flex border-b border-black font-bold text-[10px] bg-gray-100">
            <div className="w-2/3 p-1 border-r border-black">Description</div>
            <div className="w-1/3 p-1 text-right">Fees</div>
          </div>
          <div className="flex text-[10px] border-b border-gray-300">
            <div className="w-2/3 p-1 border-r border-black">Consultation / Appointment</div>
            <div className="w-1/3 p-1 text-right">{data.paid_amount || '0'}/-</div>
          </div>
          <div className="flex text-[10px] font-bold bg-gray-100">
            <div className="w-2/3 p-1 border-r border-black">Net Amount Paid</div>
            <div className="w-1/3 p-1 text-right">{data.paid_amount || '0'}/-</div>
          </div>
        </div>
      ) : (
        <div className="border border-black py-2 text-center">
          <p className="text-xs font-bold underline">REVIEWED PATIENT (No Charges)</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 border-t border-dotted border-gray-400 pt-2">
        <p className="text-[10px] font-medium italic">Appointment Time: {data.appointment_time}</p>
        <p className="text-[9px] text-center mt-4">Thank you for visiting.</p>
      </div>
    </div>
  );
});