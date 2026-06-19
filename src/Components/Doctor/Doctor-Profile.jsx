import React, { useEffect, useState } from "react";
import { User, Pencil, Camera, CheckCircle } from "lucide-react";
// -------------------------------------------------------------------------
// API ENDPOINTS LOGIC COMMENT:
// 1. DoctorMyProfile -> Dashboard ya user profile loading ke waqt user ki existing profile database se fetch karne ke liye hai.
// 2. doctorupdateProfileImage -> Sirf multipart image file binary format me backend server par upload/update karne ke liye hai.
// 3. DoctorupdateProfile -> Baki ka text data (Jaise Name, Email, Phone, Qualificaton) update karne ke liye use hota hai.
// -------------------------------------------------------------------------
import { DoctorMyProfile, doctorupdateProfileImage, DoctorupdateProfile } from "../../api/endpoints/authApi";

function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Helper Logic: Agar user ki image na ho, toh naam ka pehla akshar (Initial Letter) display karne ke liye helper utility function.
  const getInitial = (name) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  };

  // -------------------------------------------------------------------------
  // INITIAL STATE LOGIC:
  // Sabse pahle localStorage check hota hai 'user_profile' key ke liye taaki offline data load ho sake.
  // Agar profile nahi milti, toh backup ke liye 'user' authentication token key se raw details parse ki jaati hain.
  // -------------------------------------------------------------------------
  const [formData, setFormData] = useState(() => {
    const savedProfile = localStorage.getItem("user_profile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      return parsed.data || parsed;
    }

    const savedUser = localStorage.getItem("user");
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;
    const uData = parsedUser?.data || parsedUser;

    return {
      id: uData?.id || "",
      userID: uData?.userID || uData?.user_id || "",
      user_name: uData?.user_name || "",
      email_id: uData?.email_id || "",
      mobile_no: uData?.mobile_no || "",
      gender: uData?.gender || "",
      user_type: uData?.user_type || "doctor",
      doctor_type: uData?.doctor_type || "",
      doctor_fees: uData?.doctor_fees || "",
      dob: uData?.dob || "",
      doj: uData?.doj || "",
      blood_group: uData?.blood_group || "",
      experience: uData?.experience || "",
      address: uData?.address || "",
      department: uData?.department || "",
      designation: uData?.designation || "",
      education: uData?.education || "",
      user_pic: uData?.user_pic || uData?.picture_url || "",
      picture_url: uData?.picture_url || uData?.user_pic || ""
    };
  });

  // -------------------------------------------------------------------------
  // API LOGIC: DoctorMyProfile (Easy & Secure Version)
  // Component mount hote hi user_id payload lekar server se real-time state sync karne ke liye data lata hai.
  // -------------------------------------------------------------------------
  const fetchProfileData = async () => {
    try {
      setError(null);
      const storedUser = localStorage.getItem("user");
      let currentUserId = "DR0001"; // Updated to DR0001 for Doctor profile default

      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        const uData = parsed?.data || parsed;
        currentUserId = uData?.user_id || uData?.userID || "DR0001";
      }

      const payload = { user_id: currentUserId };
      const response = await DoctorMyProfile(payload);

      // --- EASY WAY ALTERNATIVE LOGIC ---
      // Bina loops ya recursion ke seedha response ka dabba check kar rahe hain
      let profile = null;

      if (response) {
        if (response.user_name || response.user_id || response.userID) {
          profile = response; // Agar seedha top level par data mil gaya
        } else if (response.data && (response.data.user_name || response.data.user_id || response.data.userID)) {
          profile = response.data; // Agar response.data ke andar data chhupa hai
        } else if (response.profile && (response.profile.user_name || response.profile.user_id || response.profile.userID)) {
          profile = response.profile; // Agar response.profile ke andar data chhupa hai
        }
      }
      // ----------------------------------

      if (profile) {
        const freshImage = profile.picture_url || profile.user_pic || formData.picture_url || "";

        const updatedData = {
          ...formData,
          ...profile,
          userID: profile.userID || profile.user_id || currentUserId,
          user_pic: freshImage,
          picture_url: freshImage
        };

        setFormData(updatedData);
        localStorage.setItem("user_profile", JSON.stringify(updatedData));
        
        // Custom App Events: TopHeader aur Sidebar component ko live runtime cross-communication trigger deta hai.
        window.dispatchEvent(new Event("profileUpdate"));
      }
    } catch (err) {
      console.error("Profile Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Form input field changes mapping logic
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // -------------------------------------------------------------------------
  // API LOGIC: doctorupdateProfileImage
  // Pehle client UI par instant reactivity ke liye standard blob stream render karta hai.
  // Phir FormData instances bana kar core image file ko secure format me destination upload url par process karta hai.
  // -------------------------------------------------------------------------
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Local Preview mechanism (Lag-free dynamic experience ke liye)
    const localUrl = URL.createObjectURL(file);

    const instantUpdatedForm = { ...formData, picture_url: localUrl, user_pic: localUrl };
    setFormData(instantUpdatedForm);
    localStorage.setItem("user_profile", JSON.stringify(instantUpdatedForm));

    const storedUserObj = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};
    localStorage.setItem("user", JSON.stringify({ ...storedUserObj, picture_url: localUrl, user_pic: localUrl }));

    // Global notifications push
    window.dispatchEvent(new Event("profileUpdate"));
    window.dispatchEvent(new Event("storage"));

    try {
      const payload = new FormData();
      payload.append("user_id", formData.userID || "DR0001");
      payload.append("profile_picture", file);

      // Dedicated Endpoint Execution
      const response = await doctorupdateProfileImage(payload);
      const resData = response?.data || response;
      const serverImageUrl = resData?.picture_url || resData?.user_pic;

      if (serverImageUrl) {
        const finalForm = { ...formData, picture_url: serverImageUrl, user_pic: serverImageUrl };
        setFormData(finalForm);
        localStorage.setItem("user_profile", JSON.stringify(finalForm));
        localStorage.setItem("user", JSON.stringify({ ...storedUserObj, picture_url: serverImageUrl, user_pic: serverImageUrl }));

        window.dispatchEvent(new Event("profileUpdate"));
        window.dispatchEvent(new Event("storage"));
      }
    } catch (err) {
      console.error("Server upload failed, keeping local preview active.", err);
    }
  };

  // -------------------------------------------------------------------------
  // API LOGIC: DoctorupdateProfile
  // Text parameter object metadata array build karke complete updates execute karne ka controller pipeline hai.
  // Response check validation match karne par pure layout aur navigation elements me values update karta hai.
  // -------------------------------------------------------------------------
  const handleSaveChanges = async () => {
    try {
      const payload = {
        user_name: formData.user_name,
        user_id: formData.userID || "DR0001",
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
      const response = await DoctorupdateProfile(payload);
      const resData = response?.data || response;

      if (response && (response.success === 1 || resData.success === 1)) {
        const currentActiveImage = formData.picture_url || formData.user_pic || "";
        const finalPersistedForm = {
          ...formData,
          picture_url: currentActiveImage,
          user_pic: currentActiveImage
        };

        setFormData(finalPersistedForm);
        localStorage.setItem("user_profile", JSON.stringify(finalPersistedForm));

        const storedUserObj = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};
        localStorage.setItem("user", JSON.stringify({
          ...storedUserObj,
          ...finalPersistedForm,
          picture_url: currentActiveImage,
          user_pic: currentActiveImage
        }));

        showCenterMessage(response.message || resData.message || "Profile Updated Successfully");

        window.dispatchEvent(new Event("profileUpdate"));
        window.dispatchEvent(new Event("storage"));
      } else {
        showCenterMessage(response.message || resData.message || "Update Failed");
      }
    } catch (err) {
      console.error("Profile Update Error:", err);
      showCenterMessage("Something went wrong.");
    }
  };

  // Global Alert Message duration trigger controller
  const showCenterMessage = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage(""); 
      setIsEditing(false); 
    }, 3000);
  };

  if (loading && !formData.user_name) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center font-medium text-gray-500">Loading Profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 space-y-6 relative">
      {/* SUCCESS MODAL POPUP LAYOUT */}
      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 border border-gray-100 text-center flex flex-col items-center">
            <CheckCircle className="w-14 h-14 text-emerald-500 mb-3" />
            <h3 className="text-gray-800 font-bold text-[16px] mb-1">Success!</h3>
            <p className="text-gray-600 text-[13px] font-medium px-2">{successMessage}</p>
            <button
              onClick={() => setSuccessMessage("")}
              className="mt-4 bg-gray-900 text-white rounded px-5 py-1.5 text-xs font-semibold hover:bg-gray-800 transition-colors"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* READ ONLY MODE VIEW */}
      {!isEditing && (
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-[15px] font-semibold text-gray-800 flex items-center gap-2">
                <User size={16} className="text-blue-600" />
                My Profile
              </h2>
              <p className="text-[12px] text-gray-500 mt-1">View your personal information</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded text-[12px] font-medium hover:bg-blue-50 flex items-center gap-1"
            >
              <Pencil size={13} />
              Edit Profile
            </button>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center border-r border-gray-200 pr-4">
                <label className="relative w-28 h-28 rounded-full overflow-hidden bg-gradient-to-tr from-orange-400 to-orange-600 cursor-pointer group border-2 border-white flex items-center justify-center shadow-md transition-all">
                  {formData.picture_url || formData.user_pic ? (
                    <img
                      src={formData.picture_url || formData.user_pic}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                  ) : null}

                  <div
                    style={{ display: (formData.picture_url || formData.user_pic) ? 'none' : 'flex' }}
                    className="text-white text-4xl font-bold select-none"
                  >
                    {getInitial(formData.user_name)}
                  </div>

                  <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px]">
                    <Camera size={18} />
                    <span>Change</span>
                  </div>
                  <input type="file" onChange={handleImageChange} accept="image/*" className="hidden" />
                </label>
              </div>

              <div className="space-y-8">
                <ProfileItem label="Full Name" value={formData.user_name} />
                <ProfileItem label="Email ID" value={formData.email_id} />
                <ProfileItem label="Phone Number" value={formData.mobile_no} />
              </div>

              <div className="space-y-5 border-l border-gray-200 pl-6">
                <ProfileItem label="Employee ID" value={formData.userID} />
                <ProfileItem label="Designation" value={formData.designation || "Doctor"} />
                <ProfileItem label="Department" value={formData.department || "Medical"} />
                <ProfileItem label="Address" value={formData.address} />
              </div>

              <div className="space-y-5 border-l border-gray-200 pl-6">
                <ProfileItem label="Joining Date" value={formData.doj} />
                <ProfileItem label="Qualification" value={formData.education} />
                <ProfileItem label="Gender" value={formData.gender} />
                <ProfileItem label="Experience" value={formData.experience} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDITING FORMS LAYOUT PANEL */}
      {isEditing && (
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-[15px] font-semibold">Edit Personal Information</h2>
            </div>
            <button onClick={() => setIsEditing(false)} className="text-sm text-red-500 hover:underline">Cancel</button>
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
            <button onClick={handleSaveChanges} className="bg-blue-600 text-white px-6 py-2.5 rounded-md text-sm hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
            <button onClick={() => setIsEditing(false)} className="border border-gray-300 px-6 py-2.5 rounded-md text-sm hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Global UI Form Render Components
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
    <input {...props} className={props.className || "w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:border-blue-500 outline-none transition-colors"} />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-[13px] text-gray-600 mb-2">{label}</label>
    <select {...props} className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:border-blue-500 outline-none bg-white transition-colors">
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

export default MyProfile;