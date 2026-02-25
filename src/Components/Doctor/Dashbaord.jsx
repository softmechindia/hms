import React from "react";
import { Users, Calendar, CheckCircle, Clock, MoreVertical, Search } from "lucide-react";

function Dashboard() {
  // Mock data to demonstrate the attractive UI
  const appointments = [
    { id: "APT-102", patient: "Sarah Johnson", doctor: "Dr. James Wilson", date: "Oct 24, 2023", time: "09:30 AM", status: "Waiting" },
    { id: "APT-105", patient: "Michael Chen", doctor: "Dr. Anna Smith", date: "Oct 24, 2023", time: "11:00 AM", status: "In Progress" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans text-slate-900">
      {/* Header Area */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">Clinic Overview</h1>
          <p className="text-slate-500">Welcome back! Here is what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-64 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard 
          count={12} 
          label="Total Appointments" 
          icon={<Calendar className="text-indigo-600" />} 
          color="bg-indigo-50" 
          trend="+4 today"
        />
        <StatCard 
          count={8} 
          label="Confirmed" 
          icon={<CheckCircle className="text-emerald-600" />} 
          color="bg-emerald-50" 
          trend="High priority"
        />
        <StatCard 
          count={4} 
          label="Completed" 
          icon={<Users className="text-amber-600" />} 
          color="bg-amber-50" 
          trend="82% of goal"
        />
      </div>

      {/* Appointment Table Section */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-50">
          <h2 className="text-xl font-bold text-slate-800">Today's Schedule</h2>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Patient</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Consultant</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Time Slot</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">ID Number</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center opacity-40">
                      <Calendar className="w-12 h-12 mb-2" />
                      <p className="text-lg italic font-medium">No appointments scheduled for today.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                appointments.map((appt, index) => (
                  <tr key={index} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                          {appt.patient.charAt(0)}
                        </div>
                        <span className="font-semibold text-slate-700">{appt.patient}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{appt.doctor}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4 text-indigo-400" />
                        {appt.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-slate-500">{appt.id}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        appt.status === 'Waiting' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all shadow-sm">
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                      </button>
                    </td>
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

// Sub-component for Modern Cards
const StatCard = ({ count, label, icon, color, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{label}</p>
      <h3 className="text-3xl font-bold text-slate-800">{count}</h3>
      <span className="text-[10px] mt-2 inline-block font-bold uppercase tracking-wider text-slate-400">{trend}</span>
    </div>
    <div className={`p-3 rounded-xl ${color}`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
  </div>
);

export default Dashboard;