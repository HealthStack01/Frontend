import {useEffect, useState, useContext, lazy, Suspense} from "react";
import {Route, Routes, useLocation} from "react-router-dom";

const PharmacyDispense = lazy(() => import("../Pharmacy/Dispensary"));
const BillLab = lazy(() => import("../Laboratory/BillLab"));
const PharmacyBillService = lazy(() => import("../Pharmacy/BillService"));
const PharmacyBillPrescription = lazy(() =>
  import("../Pharmacy/BillPrescription")
);
const InwardTransfer = lazy(() => import("../Pharmacy/InwardTransfer"));
const PharmacyTransfer = lazy(() => import("../Pharmacy/Transfer"));
const PharmacyInventoryStore = lazy(() => import("../Pharmacy/InventoryStore"));
const PharmacyProductEntry = lazy(() => import("../Pharmacy/ProductEntry"));
const PharmacyProductExit = lazy(() => import("../Pharmacy/ProductExit"));
const PharmacyInventoryReport = lazy(() =>
  import("../Pharmacy/InventoryReport")
);
const PharmacyPayment = lazy(() => import("../Pharmacy/PharmacyPayment"));
const PharmacyDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/PharmacyDashboard")
);

export const pharmacyRoutes = [
  {
    path: "/app/pharmacy/billclient",
    Component: PharmacyBillService,
  },
  {
    path: "/app/pharmacy/billprescription",
    Component: PharmacyBillPrescription,
  },
  {
    path: "/app/pharmacy/payment",
    Component: PharmacyPayment,
  },
  {
    path: "/app/pharmacy/dispensary",
    Component: PharmacyDispense,
  },
  {
    path: "/app/pharmacy/storeinventory",
    Component: PharmacyInventoryStore,
  },
  {
    path: "/app/pharmacy/productentry",
    Component: PharmacyProductEntry,
  },
  {
    path: "/app/pharmacy/issueout",
    Component: PharmacyProductExit,
  },
  {
    path: "/app/pharmacy/requisition",
    Component: PharmacyInventoryReport,
  },
  {
    path: "/app/pharmacy/transfer",
    Component: PharmacyTransfer,
  },
  {
    path: "/app/pharmacy/transfer/inward-transfer",
    Component: InwardTransfer,
  },
  {
    path: "/app/pharmacy/dashboard",
    Component: PharmacyDashboard,
  },
];
