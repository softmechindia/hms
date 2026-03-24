import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import AddGenericPopup from "../PharmacyPopup/Add-Generic-Popup";
import AddUnitPopup from "../PharmacyPopup/Add-Unit-Popup"
import MedicineTypePopup from "../PharmacyPopup/Medicine-Type-Popup";
import AddCategoryPopup from "../PharmacyPopup/Add-Category-Popup";
import CategoryPopup from "../PharmacyPopup/Add-Category-Popup";
function AddMedicinePopup({ isOpen, onClose }) {
  const[medicinTypePopup, setMedicineTypePopup] = useState(false)
 const [addGenericOpen, setAddGenericOpen] = useState(false);
 const[AddUnitPopupOpen, setAddUnitPopupOpen] = useState(false)
 const[categorypopup, setCategoryPopup] = useState(false)
  const [genericName, setGenericName] = useState("");
  const [medicineTypes] = useState([
    "Cap", "Eye Drops", "Inj", "Oil", "Ointment", "Syp", "Tab", "Container",
  ]);
  const [categories] = useState([
    "Cardiovascular Agents", "Analgesics", "Anthelmintics", "Diuretics",
  ]);

  if (!isOpen) return null;

  const labelStyle = "block text-sm font-semibold text-gray-600 mb-1";
  const inputStyle = "w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all placeholder:text-gray-400";
  
  // Styles for joined input+button groups
  const joinedInputStyle = "w-full border border-gray-300 rounded-l px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all bg-white";
  const plusButtonStyle = "bg-[#f6a96d] text-white px-3 flex items-center justify-center rounded-r hover:bg-[#f49348] transition-colors border border-[#f6a96d]";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-700">Add Medicine</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">

            {/* Row 1 */}
            <div>
              <label className={labelStyle}>Medicine Name</label>
              <input type="text" placeholder="Medicine Name" className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Batch No.</label>
              <input type="text" placeholder="Batch No." className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Potency</label>
              <input type="text" placeholder="Potency" className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Company</label>
              <input type="text" placeholder="Company Name" className={inputStyle} />
            </div>

            {/* Row 2 */}
            <div>
              <label className={labelStyle}>Expiry Date</label>
              <input type="date" className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Generic Name</label>
              <div className="flex">
                <input type="text" placeholder="Generic Name" value={genericName}  onChange={(e) => setGenericName(e.target.value)} className={joinedInputStyle} />
                <button type="button" onClick={() => setAddGenericOpen(true)} className={plusButtonStyle}><Plus size={18} strokeWidth={3} /></button>
              </div>
            </div>
            <div>
              <label className={labelStyle}>Unit</label>
              <div className="flex">
                <select className={joinedInputStyle}>
                  <option>Strip</option>
                  <option>Mili Gram</option>
                  <option>Piece</option>
                   <option>Box</option>
                </select>
                <button onClick={() => setAddUnitPopupOpen(true)} className={plusButtonStyle}>
                  <Plus size={18} strokeWidth={3} /></button>
              </div>

            
            </div>
            <div>
              <label className={labelStyle}>Qty.</label>
              <input type="number" placeholder="Quantity" className={inputStyle} />
            </div>

            {/* Row 3 */}
            <div>
              <label className={labelStyle}>Packing (per strips)</label>
              <div className="flex items-center gap-2">
                <input type="text" defaultValue="1" className="w-12 border border-gray-300 rounded px-2 py-2 text-sm text-center outline-none" />
                <span className="text-gray-400 font-bold">✕</span>
                <input type="text" className={inputStyle} />
              </div>
            </div>
            <div>
              <label className={labelStyle}>Medicine Type</label>
              <div className="flex">
                <select className={joinedInputStyle}>
                  <option>Select Medicine Type</option>
                  {medicineTypes.map((type, i) => <option key={i} value={type}>{type}</option>)}
                </select>
                <button onClick={() => setMedicineTypePopup(true)} className={plusButtonStyle}><Plus size={18} strokeWidth={3} />
                </button>
              </div>
            </div>
            <div>
              <label className={labelStyle}>Category</label>
              <div className="flex">
                <select className={joinedInputStyle}>
                  <option>Select Category</option>
                  {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                </select>
                <button onClick={() => setCategoryPopup(true)} className={plusButtonStyle}><Plus size={18} strokeWidth={3} /></button>
              </div>
            </div>
            <div>
              <label className={labelStyle}>Supplier</label>
              <input type="text" placeholder="Supplier Name" className={inputStyle} />
            </div>

            {/* Row 4 */}
            <div>
              <label className={labelStyle}>MRP Price</label>
              <input type="text" placeholder="MRP Price" className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Supplier Price</label>
              <input type="text" defaultValue="3" className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Patient Discount(%)</label>
              <input type="text" defaultValue="3" className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>GST(%)</label>
              <select className={inputStyle}>
                <option>5 %</option>
                <option>12 %</option>
                <option>18 %</option>
              </select>
            </div>

            {/* Row 5 */}
            <div>
              <label className={labelStyle}>Payment Mode</label>
              <input type="text" placeholder="Payment Mode" className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Payment Status</label>
              <select className={inputStyle}>
                <option>Paid</option>
                <option>Unpaid</option>
              </select>
            </div>
          </div>
        </div>


        {/* Footer */}
        <div className="px-6 py-6 flex justify-end">
          <button className="bg-[#f6a96d] hover:bg-[#f49348] text-white px-10 py-2.5 rounded font-bold text-sm shadow-sm transition-all active:scale-95">
            Save Medicine
          </button>
        </div>
      </div>

      <AddGenericPopup 
        isOpen={addGenericOpen}
        onClose={() => setAddGenericOpen(false)}
        onSubmit={(name) => setGenericName(name)}
      />
      <AddUnitPopup isOpen={AddUnitPopupOpen} 
      onClose={() => setAddUnitPopupOpen(false)}
      onSubmit={() => setAddUnitPopupOpen()}/>

      <MedicineTypePopup isOpen={medicinTypePopup} 
      onClose ={() => setMedicineTypePopup(false)}
      onSubmit={() => setMedicineTypePopup()}/>

      <AddCategoryPopup isOpen={categorypopup} 
      onClose={() => setCategoryPopup(false)} 
      onSubmit={() =>setCategoryPopup()}/>
    </div>
  );
}

export default AddMedicinePopup;