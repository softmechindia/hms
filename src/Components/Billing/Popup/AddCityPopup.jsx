import React, { useState } from "react";
import { saveCity } from "../../../api/endpoints/authApi";

function AddCityPopup({ onClose, onSuccess }) {
  const [city, setCity] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  const cityName = city.trim();
  if (!cityName) return alert("Please enter city name");

  try {
    // 1. API ko data bhejo
    const response = await saveCity({ city_name: cityName });

    // 2. Agar response successful hai
    if (response) {
      alert("City added successfully!");
      await onSuccess(); // Yeh Form.jsx ka fetchData chalayega
      onClose();        // Popup band hoga
      setCity("");      // Input clear hoga
    }
  } catch (err) {
    console.error("Add City Error:", err);
    alert("Nahi add hua! Check API.");
  }
};

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/40 backdrop-blur-md">
      <div className="bg-white w-[28rem] rounded-xl shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
        <h2 className="text-2xl font-bold mb-6 text-center">Add City</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center">
            <label className="w-36 font-medium">City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter City name"
              required
            />
          </div>
          <div className="flex justify-center gap-4">
            <button type="submit" className="bg-orange-500 text-white px-8 py-2 rounded-lg font-semibold shadow-md">Submit</button>
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-8 py-2 rounded-lg">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCityPopup;