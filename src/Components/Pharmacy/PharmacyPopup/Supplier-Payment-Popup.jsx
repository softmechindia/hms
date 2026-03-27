import React, { useRef, useState } from "react";
import { X, ChevronDown } from "lucide-react";

function SupplierPaymentPopup({ isOpen, onClose, onSubmit }) {
    if (!isOpen) return null;

    // States
    const [allSuppliers, setAllSuppliers] = useState([
        "Test", "ad kr2", "SAI TRADERS", "CONSERN PHARMA LIMITED", "GANPATI TRADER", "IPCA"
    ]);
    const [selectedSupplier, setSelectedSupplier] = useState("Select Supplier");
    const [searchTerm, setSearchTerm] = useState("");
    const [showSupplierList, setShowSupplierList] = useState(false);

    const [paymentMode, setPaymentMode] = useState("");
    const [showPaymentList, setShowPaymentList] = useState(false);
    const [payAmount, setPayAmount] = useState("");

    const supplierRef = useRef(null);
    const paymentRef = useRef(null);
    const paymentModes = ["Cash", "Online", "Check"];

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-2xl bg-white rounded shadow-xl overflow-visible">

                {/* --- HEADER --- */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-700">Add Supplier Payment</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                {/* --- BODY --- */}
                <div className="p-6 space-y-5">

                    {/* 1. Editable/Searchable Supplier Field (Exactly like your Treatment logic) */}
                    <div className="relative" ref={supplierRef}>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Supplier</label>

                        <div
                            onClick={() => setShowSupplierList(!showSupplierList)}
                            className="border border-gray-300 p-2 w-full rounded bg-white text-sm cursor-pointer shadow-sm flex justify-between items-center hover:border-blue-400"
                        >
                            <span className={selectedSupplier === "Select Supplier" ? "text-gray-400" : "text-slate-700"}>
                                {selectedSupplier}
                            </span>
                            <ChevronDown size={18} className={`text-gray-400 transition-transform ${showSupplierList ? 'rotate-180' : ''}`} />
                        </div>

                        {showSupplierList && (
                            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-xl p-2 animate-in fade-in zoom-in duration-100">
                                {/* Search / Add New Input */}
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        autoFocus
                                        placeholder="Type new or search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && searchTerm && !allSuppliers.includes(searchTerm)) {
                                                setAllSuppliers([searchTerm, ...allSuppliers]);
                                                setSelectedSupplier(searchTerm);
                                                setSearchTerm("");
                                                setShowSupplierList(false);
                                            }
                                        }}
                                        className="flex-1 border border-blue-200 p-1.5 text-sm rounded outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* List Container */}
                                <div className="max-h-48 overflow-y-auto border-t border-slate-100 pt-1">
                                    {allSuppliers
                                        .filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((s, index) => (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    setSelectedSupplier(s);
                                                    setShowSupplierList(false);
                                                    setSearchTerm("");
                                                }}
                                                className="px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 cursor-pointer rounded"
                                            >
                                                {s}
                                            </div>
                                        ))}

                                    {/* Empty State / Add Suggestion */}
                                    {allSuppliers.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                                        <div className="text-center py-2 text-gray-400 text-xs italic">
                                            {searchTerm ? `Press Enter to add "${searchTerm}"` : "No suppliers found"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 2. Payment Mode Dropdown */}
                    <div className="relative" ref={paymentRef}>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Payment Mode</label>
                        <div
                            className="relative cursor-pointer"
                            onClick={() => setShowPaymentList(!showPaymentList)}
                        >
                            <div className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white flex justify-between items-center">
                                <span className={!paymentMode ? "text-gray-400" : "text-gray-700"}>
                                    {paymentMode || "Select Payment Mode"}
                                </span>
                                <ChevronDown size={16} className="text-gray-500" />
                            </div>
                        </div>

                        {showPaymentList && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden animate-in fade-in zoom-in duration-100">
                                {paymentModes.map(mode => (
                                    <div
                                        key={mode}
                                        onClick={() => { setPaymentMode(mode); setShowPaymentList(false); }}
                                        className="px-3 py-2 text-sm hover:bg-blue-600 hover:text-white cursor-pointer text-gray-700"
                                    >
                                        {mode}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 3. Pay Amount Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Pay Amount</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={payAmount}
                            onChange={(e) => setPayAmount(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-blue-400 transition-all"
                        />
                    </div>
                </div>

                {/* --- FOOTER --- */}
                <div className="px-6 py-4 flex justify-end border-t border-gray-100 bg-gray-50/30">
                    <button
                        onClick={() => onSubmit({
                            supplier: selectedSupplier,
                            mode: paymentMode,
                            amount: payAmount
                        })}
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