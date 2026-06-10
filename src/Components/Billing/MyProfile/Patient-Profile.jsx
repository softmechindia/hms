import React, { useEffect, useState } from "react";
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
  Home,
} from "lucide-react";

import Doctor from "../../../assets/images/Doctor.jpg";
import { getMyProfile, updateProfileImage, updateProfile } from "../../../api/endpoints/authApi";

function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [formData, setFormData] = useState({
    id: "",
    userID: "",
    user_name: "",
    email_id: "",
    mobile_no: "",
    gender: "",
    user_type: "billing",
    doctor_type: "",
    doctor_fees: "",
    dob: "",
    doj: "",
    blood_group: "",
    experience: "",
    address: "",
    department: "",
    designation: "",
    education: "",
    user_pic: "",
    picture_url: ""
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);

        const payload = { user_id: "ST0001" };
        const response = await getMyProfile(payload);


        const locateDataDeeply = (obj) => {
          if (!obj || typeof obj !== 'object') return null;
          if (obj.user_name || obj.userID) return obj;
          for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              const found = locateDataDeeply(obj[key]);
              if (found) return found;
            }
          }
          return null;
        };

        const profile = locateDataDeeply(response);

        if (profile) {
          setFormData({
            id: profile.id || "",
            userID: profile.userID || "",
            user_name: profile.user_name || "",
            email_id: profile.email_id || "",
            mobile_no: profile.mobile_no || "",
            gender: profile.gender || "",
            user_type: profile.user_type || "billing",
            doctor_type: profile.doctor_type || "",
            doctor_fees: profile.doctor_fees || "",
            dob: profile.dob || "",
            doj: profile.doj || "",
            blood_group: profile.blood_group || "",
            experience: profile.experience || "",
            address: profile.address || "",
            department: profile.department || "",
            designation: profile.designation || "",
            education: profile.education || "",
            user_pic: profile.user_pic || "",
            picture_url: profile.picture_url || ""
          });
        } else {
          setError("Unable to fetch profile data.");
        }
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {

      const payload = new FormData();
      payload.append("user_id", formData.userID || "ST0001");
      payload.append("profile_picture", file);


      const response = await updateProfileImage(payload);


      const newImageUrl = response?.picture_url || response?.data?.picture_url;

      if (newImageUrl) {
        setFormData((prev) => ({
          ...prev,
          picture_url: newImageUrl,
        }));
        alert("Profile picture updated successfully!");
      } else {

        setFormData((prev) => ({
          ...prev,
          picture_url: URL.createObjectURL(file),
        }));
      }
    } catch (err) {
      console.error("Image Upload Error:", err);
      alert("Failed to update profile picture.");
    }
  };

  const handleSaveChanges = async () => {
    try {

      const payload = {
        user_name: formData.user_name,
        user_id: formData.userID || "ST0001",
        email_id: formData.email_id,
        gender: formData.gender,
        mobile_no: formData.mobile_no,
        dob: formData.dob,
        doj: formData.doj,
        blood_group: formData.blood_group,
        experience: formData.experience,
        education: formData.education,
        address: formData.address
      };


      setError(null);


      const response = await updateProfile(payload);


      if (response && (response.success === 1 || response.data?.success === 1)) {
        alert(response.message || "Profile Updated Successfully");
        setIsEditing(false);
      } else {
        alert(response.message || "");
      }
    } catch (err) {
      console.error("Profile Update Error:", err);
      alert(err.message || "");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-sm font-medium text-gray-500 animate-pulse">Loading Profile Details...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-md shadow border border-red-200 max-w-sm text-center">
          <p className="text-red-600 text-sm font-semibold mb-2">Error</p>
          <p className="text-gray-600 text-xs mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded text-xs"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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

              {/* Profile Image  */}
              <div className="flex flex-col items-center border-r border-gray-200 pr-4">
                <label className="relative w-28 h-28 rounded-full overflow-hidden bg-blue-100 cursor-pointer group border-2 border-transparent hover:border-blue-500 transition-all">
                  <img
                    src={formData.picture_url || Doctor}
                    alt="User Profile"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px]">
                    <Camera size={18} />
                    <span>Change Pic</span>
                  </div>

                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />


                </label>

              </div>



              <div className="space-y-8">
                <ProfileItem label="Full Name" value={formData.user_name} />
                <ProfileItem label="Email ID" value={formData.email_id} icon={<Mail size={14} />} />
                <ProfileItem label="Phone Number" value={formData.mobile_no} icon={<Phone size={14} />} />
              </div>

              <div className="space-y-5 border-l border-gray-200 pl-6">
                <ProfileItem label="Employee ID" value={formData.userID} />
                <ProfileItem label="Designation" value={formData.designation || "N/A"} />
                <ProfileItem label="Department" value={formData.department || "N/A"} />
                <ProfileItem label="Address" value={formData.address} icon={<Home size={14} />} />
                <ProfileItem label="Date of Birth" value={formData.dob} />
              </div>

              <div className="space-y-5 border-l border-gray-200 pl-6">
                <ProfileItem label="Joining Date" value={formData.doj} />
                <ProfileItem label="Qualification" value={formData.education} />
                <ProfileItem label="Gender" value={formData.gender} />
                <ProfileItem label="Experience" value={formData.experience} />
                <ProfileItem label="Blood Group" value={formData.blood_group} />
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

            <Input label="Full Name" name="user_name" value={formData.user_name} onChange={handleChange} />
            <Input label="Employee ID" name="userID" value={formData.userID} onChange={handleChange} disabled className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm bg-gray-100 outline-none text-gray-500" />
            <Input label="Email ID" name="email_id" value={formData.email_id} onChange={handleChange} />

            <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />

            <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
            <Select label="Blood Group" name="blood_group" value={formData.blood_group} onChange={handleChange} options={["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"]} />

            <Input label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
            <Input label="Department" name="department" value={formData.department} onChange={handleChange} />
            <Input label="Qualification" name="education" value={formData.education} onChange={handleChange} />

            <Input label="Joining Date" name="doj" type="date" value={formData.doj} onChange={handleChange} />
            <Input label="Experience" name="experience" value={formData.experience} onChange={handleChange} />
            <Input label="Address" name="address" value={formData.address} onChange={handleChange} />

          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSaveChanges}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="border border-gray-300 px-6 py-2.5 rounded-md text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */
const ProfileItem = ({ label, value, icon }) => (
  <div>
    <p className="text-[11px] text-gray-500 mb-1">{label}</p>
    <div className="flex items-center gap-2 text-[13px] text-gray-800 font-medium">
      {icon && <span className="text-gray-500">{icon}</span>}
      <span>{value || "—"}</span>
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-[13px] text-gray-600 mb-2">{label}</label>
    <input
      {...props}
      className={props.className || "w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:border-blue-500 outline-none transition-colors"}
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-[13px] text-gray-600 mb-2">{label}</label>
    <select
      {...props}
      className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:border-blue-500 outline-none bg-white transition-colors"
    >
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

export default MyProfile;