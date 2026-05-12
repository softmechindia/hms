import React, { useState, useEffect } from "react";
import { saveOccupation } from "../../../api/endpoints/authApi";
import { AlarmCheck } from "lucide-react";

function EditOccupationPopup({ onClose, onSuccess, initialData }) {
  const [occupation, setOccupation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setOccupation(initialData.occupation_name || "");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check agar field empty hai
    if (!occupation.trim()) {
      alert("Please enter occupation name");
      return;
    }

    setLoading(true);
    try {
      // Edit ke waqt 'id' aur updated 'occupation_name' dono bhej rahe hain
      const response = await saveOccupation({
        id: initialData?.id,
        occupation_name: occupation
      });

      // 1. Backend ka message show karein (Updated or Already Exists)
      if (response && response.message) {
        alert(response.message);
      }

      // 2. Agar success 1 hai, tabhi popup close karein aur list refresh karein
      if (response && (response.success === 1 || response.status === true)) {
        onSuccess();
        onClose();
      }



    } catch (err) {
      console.error("Submit Error:", err);
      alert("Something went wrong while saving.");
    } finally {
      setLoading(false);
    }
  };






  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/40 backdrop-blur-md p-3 ">
      <div className="bg-white w-[95%] max-w-md h-auto rounded-xl shadow-lg p-6 sm:p-8 relative">


        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Edit Occupation</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">

            <label className="-full text-xl sm:w-36 font-medium  p-3">Occupation:</label>
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              placeholder="Enter occupation name"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="bg-orange-500 text-white px-8 py-2 rounded-lg hover:bg-orange-600 transition shadow-md"
            >
              Submit
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

export default EditOccupationPopup;