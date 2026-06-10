import React, { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { changePassword } from "../../../api/endpoints/authApi";

function ChangePasswordCard() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const [userId, setUserId] = useState("");

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Extract real dynamic session user ID on component mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      let extractedId = "";

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        extractedId = parsedUser?.user_id || parsedUser?.id || parsedUser?.userId || "";
      }

      if (!extractedId) {
        extractedId = localStorage.getItem("user_id") || localStorage.getItem("userId") || "";
      }

      setUserId(extractedId || "ST0001");
    } catch (error) {
      setUserId("ST0001");
    }
  }, []);

  // Direct live tracking handler (Forces state synchronization)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({ 
      ...prev, 
      [name]: String(value) // Explicit string cast for raw parameters
    }));

    if (statusMessage.text) {
      setStatusMessage({ type: "", text: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: "", text: "" });

    // Super raw payload tracking exactly what is visible in the form inputs
    const payload = {
      user_id: String(userId),
      current_password: String(formData.currentPassword).trim(),
      new_password: String(formData.newPassword).trim(),
      confirm_password: String(formData.confirmPassword).trim(),
    };

    try {
      setLoading(true);
      const response = await changePassword(payload);

      // Map whatever explicit dynamic string message comes from server endpoint
      if (response && (response.success === 1 || response.success === true)) {
        setStatusMessage({
          type: "success",
          text: response.message || "Password Changed Successfully"
        });
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setStatusMessage({
          type: "error",
          text: response.message || "Current Password is incorrect"
        });
      }
    } catch (err) {
      console.error("❌ Component API Call Broken:", err);
      setStatusMessage({
        type: "error",
        text: err.response?.data?.message || err.message || "Server Error. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden font-sans p-6 md:p-8 mx-auto">
      
      {/* Header section */}
      <div className="flex items-center gap-4 border-b border-gray-50 pb-6 mb-8">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <Lock className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Change Password</h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">Update your credentials instantly</p>
        </div>
      </div>

      {/* Dynamic Error Status Message Display Banner */}
      {statusMessage.text && (
        <div className={`mb-5 p-3 rounded-lg text-xs font-semibold border transition-all ${
          statusMessage.type === "success"
            ? "bg-emerald-50 border-emerald-100 text-emerald-700"
            : "bg-red-50 border-red-100 text-red-700"
        }`}>
          {statusMessage.text}
        </div>
      )}

      {/* Form Content - Forced autocomplete separation */}
      <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
        
        {/* Current Password Field */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Current Password</label>
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <Lock size={16} />
            </span>
            <input
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none transition-all focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
              placeholder="••••••••"
              autoComplete="one-time-code" // Disables standard credential caches
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              disabled={loading}
            >
              {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* New Password Field */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">New Password</label>
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <Lock size={16} />
            </span>
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none transition-all focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              disabled={loading}
            >
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Confirm New Password</label>
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <Lock size={16} />
            </span>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none transition-all focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              disabled={loading}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-6 py-2.5 bg-[#FF6A00] hover:bg-[#e05e00] disabled:bg-orange-300 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:transform active:scale-[0.99]"
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : <Lock size={15} />}
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordCard;