import React, { useState } from "react";
import { saveEducation } from "../../../api/endpoints/authApi";

function AddEducationPopup({ onClose, onSuccess }) {
  const [education, setEducation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!education.trim()) {
      alert("Please enter an education name");
      return;
    }
    setLoading(true);
    try {
      const response = await saveEducation({ education_name: education });

      if (response && response.message) {
        alert(response.message);
      }

      if (response && (response.message === 1 || response.status === true)) {
        onSuccess();
        onClose();
      }
    } catch (err) {
      console.error("Add Education Error:", err);
      alert("Server error: Something went wrong!");
    } finally {
      setLoading(false);
    }
  };



  return (

    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/40 backdrop-blur-md">

      <div className="bg-white w-[28rem] h-auto rounded-xl shadow-2xl p-8 relative">

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Education</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center">
            <label className="w-36 font-medium text-gray-700">Education:</label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)} required
              placeholder="Enter Education name"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`${loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
                } text-white px-8 py-2 rounded-lg transition shadow-md`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-8 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEducationPopup;