import React from "react";
import { Routes, Route } from "react-router-dom";
import PharmacyHome from "../Pharmacy/Pharmacy-Home";
import Medicinebought from "../Pharmacy/Medicine-bought";
import PatientList from "../Pharmacy/Pages/PatientList";
import Dashboard from "../Pharmacy/Pages/Dashboard";
import TotalCollections from "../Pharmacy/Pages/Total-Collections";
import MedicineStock from "../Pharmacy/Pages/Medicine-Stock";
import StockHistory from "../Pharmacy/Pages/Stock-History"
import MedicineCategory from "../Pharmacy/Pages/Medicine-Category";
import MedicineType from "../Pharmacy/Pages/Medicine-Type";
import GenericName from "../Pharmacy/Pages/Generic-Name";
import SupplierList from "../Pharmacy/Pages/Supplier-List";
import Payments from "../Pharmacy/Pages/Payments";
import SupplierLedger from "../Pharmacy/Pages/Supplier-Ledger";
import Layout from "../Pharmacy/Layout";
import Notifications from "../Pharmacy/Pages/Notifications";
function PharmacyApp() {
    return (
        <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<PharmacyHome />} />
                <Route path="/Medicine-bought" element={<Medicinebought />} />
                <Route path="/patient-list" element={<PatientList />} />
                <Route path="dashbaord" element={<Dashboard />} />
                <Route path="/medicine-stock" element={<MedicineStock />} />
                <Route path="/stock-history" element={<StockHistory />} />
                <Route path="medicine-category" element={<MedicineCategory />} />
                <Route path="/medicine-type" element={<MedicineType />} />
                <Route path="/generic-name" element={<GenericName />} />
                <Route path="/supplier-list" element={<SupplierList />} />
                <Route path="payments" element={<Payments />} />
                <Route path="/supplier-ledger" element={<SupplierLedger />} />
                <Route path="/totalCollections" element={<TotalCollections />} />
                <Route path="/notifications" element={<Notifications />} />

            </Route>
        </Routes>
    );
}

export default PharmacyApp;