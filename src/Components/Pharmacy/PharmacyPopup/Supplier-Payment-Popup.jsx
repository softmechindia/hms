import React, { useRef, useState } from "react";
import { X, ChevronDown } from "lucide-react";

function SupplierPaymentPopup({ isOpen, onClose, onSubmit }) {
    if (!isOpen) return null;
    const [selectedSupplier, setSelectedSupplier] = useState("");
    const [showSupplierList, setShowSupplierList] = useState(false);
    const [showPaymentList, setShowPaymentList] = useState(false);
    const [paymentMode, setPaymentMode] = useState("");

    const supplierRef = useRef(null);
    const paymentRef = useRef(null)


    const suppliers = ["Test", "ad kr2", "SAI TRADERS", "CONSERN PHARMA LIMITED", "GANPATI TRADER", "IPCA"]
    const paymentModes = ["Cash", "Online", "Check"];

    


    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-2xl bg-white rounded shadow-xl overflow-visible">

                {/* --- HEADER SECTION --- */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-700">Add Supplier Payment</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                {/* --- BODY SECTION --- */}
                <div className="p-6 space-y-5">

                    {/* 1. Supplier Field */}
                    <div className="relative" ref={supplierRef}>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Supplier</label>

                        <div className="relative" onClick={() => setShowSupplierList(!showSupplierList)}>
                            <input
                                readOnly
                                value={selectedSupplier || "Select Supplier"}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm cursor-pointer outline-none"
                            />
                            <ChevronDown size={18} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />

                        </div>

                        {showSupplierList && (
                            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 shadow-lg rounded-sm overflow-hidden">
                                <div className="px-3 py-2 text-sm bg-[#2563eb] text-white">Select Supplier</div>

                                {suppliers.map((s, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => {
                                            setSelectedSupplier(s);
                                            setShowSupplierList(false);
                                        }}
                                        className="px-3 py-2 text-sm hover:bg-[#2563eb] hover:text-white cursor-pointer text-gray-700"
                                    >
                                        {s}

                                    </div>
                                ))}

                            </div>


                        )}


                    </div>


                    {/* Payment Mode Dropdown */}
                    <div className="relative" ref={paymentRef}>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Payment Mode</label>
                        <div className="relative" onClick={() => setShowPaymentList(!showPaymentList)}>
                            <input
                                readOnly
                                value={paymentMode || "Select Payment Mode"}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm cursor-pointer outline-none"
                            />
                            <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500" />
                        </div>
                        {showPaymentList && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg rounded-sm overflow-hidden">
                                <div className="px-3 py-2 text-sm bg-[#2563eb] text-white">Select Payment Mode</div>
                                {paymentModes.map(mode => (
                                    <div key={mode} onClick={() => { setPaymentMode(mode); setShowPaymentList(false); }}
                                        className="px-3 py-2 text-sm hover:bg-[#2563eb] hover:text-white cursor-pointer text-gray-700">
                                        {mode}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 3. Pay Amount Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">
                            Pay Amount
                        </label>
                        <input
                            type="number"
                            placeholder="Pay Amount"
                            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-blue-400 transition-all placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* --- FOOTER SECTION --- */}

                <div className="px-6 py-4 flex justify-end border-t border-gray-100 bg-gray-50/30">
                    <button
                        onClick={() => onSubmit({ selectedSupplier, paymentMode, payAmount })}
                        className="bg-[#f6a96d] hover:bg-[#f49348] text-white px-8 py-2.5 rounded text-sm font-bold transition-all shadow-sm active:scale-95"
                    >
                        Save Payment
                    </button>
                </div>

            </div>
        </div>
    );
}

export default SupplierPaymentPopup;