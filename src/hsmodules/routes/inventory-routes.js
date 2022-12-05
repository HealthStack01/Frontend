import {lazy} from "react";
import {Route, Routes, useLocation} from "react-router-dom";

const InventoryBillPrescription = lazy(() =>
  import("../inventory/BillPrescription")
);
const InventoryBillService = lazy(() => import("../inventory/BillService"));
const InventoryDispense = lazy(() => import("../inventory/Dispensary"));
const InventoryReport = lazy(() => import("../inventory/InventoryReport"));
const InventorySetup = lazy(() => import("../inventory/InventorySetup"));
const InventoryStore = lazy(() => import("../inventory/InventoryStore"));
const InventoryDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/InventoryDashboard")
);
const InventoryPayment = lazy(() => import("../inventory/InventoryPayment"));
const InventoryProductEntry = lazy(() => import("../inventory/ProductEntry"));
const InventoryProductExit = lazy(() => import("../inventory/ProductExit"));
const InventoryProducts = lazy(() => import("../inventory/Products"));
const Store = lazy(() => import("../inventory/Store"));

export const inventoryRoutes = [
  {
    path: "/app/inventory/billservice",
    Component: InventoryBillService,
  },
  {
    path: "/app/inventory/inv-products",
    Component: InventoryProducts,
  },
  {
    path: "/app/inventory/issueout",
    Component: InventoryProductExit,
  },
  {
    path: "/app/inventory/productentry",
    Component: InventoryProductEntry,
  },
  {
    path: "/app/inventory/storeinventory",
    Component: InventoryStore,
  },
  {
    path: "/app/inventory/inv-admin",
    Component: InventorySetup,
  },
  {
    path: "/app/inventory/billprescription",
    Component: InventoryBillPrescription,
  },
  {
    path: "/app/inventory/dispensary",
    Component: InventoryDispense,
  },
  {
    path: "/app/inventory/inv-reports",
    Component: InventoryReport,
  },
  {
    path: "/app/inventory/inv-stores",
    Component: Store,
  },
  {
    path: "/app/inventory/payment",
    Component: InventoryPayment,
  },
  {
    path: "/app/inventory/dashboard",
    Component: InventoryDashboard,
  },
];
