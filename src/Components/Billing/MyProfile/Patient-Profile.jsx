import React, { useState } from "react";
import {
  User,
  CalendarDays,
  BriefcaseMedical,
  Building2,
  VenusAndMars,
  Droplets,
  Clock3,
  Mail,
  Phone,
  Pencil,
  Camera,
} from "lucide-react";

import Doctor from "../../../assets/images/Doctor.jpg";

function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "Dr. John Doe",
    employeeId: "EMP1001",
    email: "john.doe@softmech.com",
    dob: "1985-02-15",
    gender: "Male",
    bloodGroup: "O+",
    designation: "Cardiologist",
    department: "Cardiology",
    qualification: "MD, DM (Cardiology)",
    joiningDate: "2022-01-01",
    experience: "10+ Years",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-6">

      {/* ================= PROFILE VIEW ================= */}
      {!isEditing && (
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-5">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-[15px] font-semibold text-gray-800 flex items-center gap-2">
                <User size={16} className="text-blue-600" />
                My Profile
              </h2>
              <p className="text-[12px] text-gray-500 mt-1">
                View your personal information
              </p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded text-[12px] font-medium hover:bg-blue-50 flex items-center gap-1"
            >
              <Pencil size={13} />
              Edit Profile
            </button>
          </div>

          {/* Body */}
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

              <div className="flex flex-col items-center border-r border-gray-200 pr-4">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-blue-100">
                  <img src={Doctor} alt="Doctor" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="space-y-8">
                <ProfileItem label="Full Name" value={formData.fullName} />
                <ProfileItem label="Email ID" value={formData.email} icon={<Mail size={14} />} />
                <ProfileItem label="Phone Number" value="+91 98765 43210" icon={<Phone size={14} />} />
              </div>

              <div className="space-y-5 border-l border-gray-200 pl-6">
                <ProfileItem label="Employee ID" value={formData.employeeId} />
                <ProfileItem label="Designation" value={formData.designation} />
                <ProfileItem label="Department" value={formData.department} />
                <ProfileItem label="Gender" value={formData.gender} />
              </div>

              <div className="space-y-5 border-l border-gray-200 pl-6">
                <ProfileItem label="Joining Date" value={formData.joiningDate} />
                <ProfileItem label="Qualification" value={formData.qualification} />
                <ProfileItem label="Experience" value={formData.experience} />
                <ProfileItem label="Blood Group" value={formData.bloodGroup} />
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT FORM ================= */}
      {isEditing && (
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-5">

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-[15px] font-semibold">
                Edit Personal Information
              </h2>
            </div>

            <button
              onClick={() => setIsEditing(false)}
              className="text-sm text-red-500 hover:underline"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
            <Input label="Employee ID" name="employeeId" value={formData.employeeId} onChange={handleChange} />
            <Input label="Email ID" name="email" value={formData.email} onChange={handleChange} />

            <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />

            <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={["Male", "Female"]} />
            <Select label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} options={["O+", "A+", "B+", "AB+"]} />

            <Input label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
            <Input label="Department" name="department" value={formData.department} onChange={handleChange} />
            <Input label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} />

            <Input label="Joining Date" name="joiningDate" type="date" value={formData.joiningDate} onChange={handleChange} />
            <Input label="Experience" name="experience" value={formData.experience} onChange={handleChange} />

          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setIsEditing(false)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-md text-sm"
            >
              Save Changes
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="border border-gray-300 px-6 py-2.5 rounded-md text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= REUSABLE ================= */
const ProfileItem = ({ label, value, icon }) => (
  <div>
    <p className="text-[11px] text-gray-500 mb-1">{label}</p>
    <div className="flex items-center gap-2 text-[13px] text-gray-800 font-medium">
      {icon && <span className="text-gray-500">{icon}</span>}
      <span>{value}</span>
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-[13px] text-gray-600 mb-2">{label}</label>
    <input
      {...props}
      className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:border-blue-500 outline-none"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-[13px] text-gray-600 mb-2">{label}</label>
    <select
      {...props}
      className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:border-blue-500 outline-none"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

export default MyProfile;