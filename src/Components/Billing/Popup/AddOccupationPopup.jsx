import React, { useState } from "react";


function AddOccupationPopup({ onClose }) {
  const [occupation, setOccupation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Occupation submitted:", occupation);
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/40 backdrop-blur-md">
      <div className="bg-white w-[28rem] h-auto rounded-xl shadow-lg p-8 relative">
        

        <button 
          type="button"
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Add Occupation</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center">
            <label className="w-36 font-medium">Occupation:</label>
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

export default AddOccupationPopup;