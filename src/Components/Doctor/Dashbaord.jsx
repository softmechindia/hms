import React from "react";

function Dashboard() {
  // Mock data for the table - you can replace this with your API data later
  const appointments = [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Stats Section */}
      <div className="flex flex-wrap items-center justify-around gap-6 mb-12">
        <StatCircle count={0} label="Today's Total Appointments" />
        <StatCircle count={0} label="Today's Confirm Appointments" />
        <StatCircle count={0} label="Appointment Completed" />
      </div>

      {/* Appointment Table Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <h2 className="text-xl font-bold p-6 text-gray-800 border-b border-gray-100">
          Appointment
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-800">Patient Name</th>
                <th className="px-6 py-4 font-bold text-gray-800">Doctor Name</th>
                <th className="px-6 py-4 font-bold text-gray-800">Appt. Date</th>
                <th className="px-6 py-4 font-bold text-gray-800">Appt. ID</th>
                <th className="px-6 py-4 font-bold text-gray-800">Appt. Time</th>
                <th className="px-6 py-4 font-bold text-gray-800">Patient Waiting</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-400 italic">
                    No appointments found for today.
                  </td>
                </tr>
              ) : (
                appointments.map((appt, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                    {/* Render your data here */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Reusable sub-component for the circular stats
const StatCircle = ({ count, label }) => (
  <div className="flex items-center gap-4">
    <div className="w-20 h-20 rounded-full border-4 border-gray-200 flex items-center justify-center bg-white shadow-sm">
      <span className="text-2xl font-bold text-gray-700">{count}</span>
    </div>
    <span className="text-gray-600 font-medium max-w-[120px] leading-tight">
      {label}
    </span>
  </div>
);

export default Dashboard;