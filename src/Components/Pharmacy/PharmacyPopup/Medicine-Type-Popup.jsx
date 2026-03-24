import React, { useState } from "react";
import { X } from "lucide-react";

function  MedicinePopup({ isOpen, onClose, onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  const handleSub = () => {
    onSubmit(inputValue);
    setInputValue("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md bg-white rounded shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700">Add Medicine Type</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
           Add Medicine
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter Generic Name"
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 placeholder:text-gray-400"
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end gap-3 border-t border-gray-50">
          <button
            onClick={handleSub}
            className="bg-[#7cc67c] hover:bg-[#6ab36a] text-white px-6 py-2 rounded font-bold text-sm transition-colors border-b-2 border-green-700 active:border-b-0 active:translate-y-[1px]"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-[#f87171] hover:bg-[#ef4444] text-white px-6 py-2 rounded font-bold text-sm transition-colors border-b-2 border-red-700 active:border-b-0 active:translate-y-[1px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MedicinePopup;