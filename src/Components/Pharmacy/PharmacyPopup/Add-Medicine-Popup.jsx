import React, { useState, useRef, useEffect } from "react";
import { X, Plus, ChevronDown, Search } from "lucide-react";
import AddGenericPopup from "../PharmacyPopup/Add-Generic-Popup";
import AddUnitPopup from "../PharmacyPopup/Add-Unit-Popup";
import MedicineTypePopup from "../PharmacyPopup/Medicine-Type-Popup";
import AddCategoryPopup from "../PharmacyPopup/Add-Category-Popup";

function AddMedicinePopup({ isOpen, onClose }) {
  // Popups Visibility States
  const [medicinTypePopup, setMedicineTypePopup] = useState(false);
  const [addGenericOpen, setAddGenericOpen] = useState(false);
  const [AddUnitPopupOpen, setAddUnitPopupOpen] = useState(false);
  const [categorypopup, setCategoryPopup] = useState(false);

  // Data Lists
  const [genericNames, setGenericNames] = useState(["Paracetamol", "Ibuprofen", "Amoxicillin", "Cetirizine"]);
  const [medicineTypes, setMedicineTypes] = useState(["Cap", "Eye Drops", "Inj", "Oil", "Ointment", "Syp", "Tab", "Container"]);
  const [categories, setCategories] = useState(["Cardiovascular Agents", "Analgesics", "Anthelmintics", "Diuretics"]);

  // Selected Values
  const [selectedGeneric, setSelectedGeneric] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  if (!isOpen) return null;

  const labelStyle = "block text-sm font-semibold text-gray-600 mb-1";
  const inputStyle = "w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all placeholder:text-gray-400 bg-white";

  // --- REUSABLE ONLY-SEARCH DROPDOWN COMPONENT ---
  const SearchableDropdown = ({ label, items, selectedValue, onSelect, onPlusClick, placeholder }) => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);

    // Click outside handler to close dropdown
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpenDropdown(false);
          setSearchTerm(""); // Reset search on close
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="relative" ref={dropdownRef}>
        <label className={labelStyle}>{label}</label>
        <div className="flex">
          <div
            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
            className="flex-1 flex justify-between items-center border border-gray-300 rounded-l px-3 py-2 text-sm bg-white cursor-pointer hover:border-orange-400 transition-all"
          >
            <span className={!selectedValue ? "text-gray-400" : "text-gray-700"}>
              {selectedValue || placeholder}
            </span>
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpenDropdown ? "rotate-180" : ""}`} />
          </div>
          <button
            type="button"
            onClick={onPlusClick}
            className="bg-[#f6a96d] text-white px-3 flex items-center justify-center rounded-r hover:bg-[#f49348] border border-[#f6a96d]"
          >
            <Plus size={18} strokeWidth={3} />
          </button>
        </div>

        {isOpenDropdown && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg overflow-hidden animate-in fade-in zoom-in duration-150">
            {/* Search Box Inside Dropdown */}
            <div className="p-2 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
              <Search size={14} className="text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Type to search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full outline-none text-xs bg-transparent"
              />
            </div>

            {/* Filtered List */}
            <div className="max-h-44 overflow-y-auto">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      onSelect(item);
                      setIsOpenDropdown(false);
                      setSearchTerm("");
                    }}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                  >
                    {item}
                  </div>
                ))
              ) : (
                <div className="text-center py-3 text-gray-400 text-xs italic">
                  No match found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-10 px-4 overflow-y-auto pb-10">
      <div className="w-full max-w-5xl bg-white rounded shadow-xl overflow-visible animate-in fade-in zoom-in duration-200 mb-10">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-700">Add Medicine</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">

            {/* Row 1 */}
            <div><label className={labelStyle}>Medicine Name</label><input type="text" placeholder="Medicine Name" className={inputStyle} /></div>
            <div><label className={labelStyle}>Batch No.</label><input type="text" placeholder="Batch No." className={inputStyle} /></div>
            <div><label className={labelStyle}>Potency</label><input type="text" placeholder="Potency" className={inputStyle} /></div>
            <div><label className={labelStyle}>Company</label><input type="text" placeholder="Company Name" className={inputStyle} /></div>

            {/* Row 2 */}
            <div><label className={labelStyle}>Expiry Date</label><input type="date" className={inputStyle} /></div>
            
            {/* Search-Only Generic Name */}
            <SearchableDropdown
              label="Generic Name"
              items={genericNames}
              selectedValue={selectedGeneric}
              onSelect={setSelectedGeneric}
              onPlusClick={() => setAddGenericOpen(true)}
              placeholder="Select Generic Name"
            />

            <div>
              <label className={labelStyle}>Unit</label>
              <div className="flex">
                <select className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm outline-none focus:border-orange-400 bg-white">
                  <option>Strip</option><option>Piece</option><option>Box</option>
                </select>
                <button onClick={() => setAddUnitPopupOpen(true)} className="bg-[#f6a96d] text-white px-3 rounded-r border border-[#f6a96d]"><Plus size={18} strokeWidth={3} /></button>
              </div>
            </div>
            <div><label className={labelStyle}>Qty.</label><input type="number" placeholder="Quantity" className={inputStyle} /></div>

            {/* Row 3 */}
            <div>
              <label className={labelStyle}>Packing (per strips)</label>
              <div className="flex items-center gap-2">
                <input type="text" defaultValue="1" className="w-12 border border-gray-300 rounded px-2 py-2 text-sm text-center" />
                <span className="text-gray-400 font-bold">✕</span>
                <input type="text" className={inputStyle} />
              </div>
            </div>

            {/* Search-Only Medicine Type */}
            <SearchableDropdown
              label="Medicine Type"
              items={medicineTypes}
              selectedValue={selectedType}
              onSelect={setSelectedType}
              onPlusClick={() => setMedicineTypePopup(true)}
              placeholder="Select Type"
            />

            {/* Search-Only Category */}
            <SearchableDropdown
              label="Category"
              items={categories}
              selectedValue={selectedCategory}
              onSelect={setSelectedCategory}
              onPlusClick={() => setCategoryPopup(true)}
              placeholder="Select Category"
            />

            <div><label className={labelStyle}>Supplier</label><input type="text" placeholder="Supplier Name" className={inputStyle} /></div>

            {/* Row 4 */}
            <div><label className={labelStyle}>MRP Price</label><input type="text" placeholder="MRP Price" className={inputStyle} /></div>
            <div><label className={labelStyle}>Supplier Price</label><input type="text" defaultValue="0" className={inputStyle} /></div>
            <div><label className={labelStyle}>Patient Discount(%)</label><input type="text" defaultValue="0" className={inputStyle} /></div>
            <div>
              <label className={labelStyle}>GST(%)</label>
              <select className={inputStyle}><option>5 %</option><option>12 %</option><option>18 %</option></select>
            </div>

            {/* Row 5 */}
            <div><label className={labelStyle}>Payment Mode</label><input type="text" placeholder="Payment Mode" className={inputStyle} /></div>
            <div>
              <label className={labelStyle}>Payment Status</label>
              <select className={inputStyle}><option>Paid</option><option>Unpaid</option></select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-6 flex justify-end gap-3 border-t">
          <button onClick={onClose} className="px-6 py-2.5 rounded text-sm font-bold text-gray-500 hover:bg-gray-100 transition-all">Cancel</button>
          <button className="bg-[#f6a96d] hover:bg-[#f49348] text-white px-10 py-2.5 rounded font-bold text-sm shadow-sm transition-all active:scale-95">
            Save Medicine
          </button>
        </div>
      </div>

      {/* Popups */}
      <AddGenericPopup isOpen={addGenericOpen} onClose={() => setAddGenericOpen(false)} onSubmit={(name) => { setGenericNames([name, ...genericNames]); setSelectedGeneric(name); }} />
      <AddUnitPopup isOpen={AddUnitPopupOpen} onClose={() => setAddUnitPopupOpen(false)} />
      <MedicineTypePopup isOpen={medicinTypePopup} onClose={() => setMedicineTypePopup(false)} />
      <AddCategoryPopup isOpen={categorypopup} onClose={() => setCategoryPopup(false)} />
    </div>
  );
}

export default AddMedicinePopup;







