import {lazy} from "react";

const BillLab = lazy(() => import("../Laboratory/BillLab"));
const LaboratoryBillService = lazy(() => import("../Laboratory/BillService"));
const LaboratoryPayment = lazy(() => import("../Laboratory/LaboratoryPayment"));
const LabReport = lazy(() => import("../Laboratory/LabReport"));
const Labs = lazy(() => import("../Laboratory/Labs"));

const LaboratoryDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/LaboratoryDashboard")
);

export const laboratoryRoutes = [
  {
    path: "/app/laboratory/billclient",
    Component: LaboratoryBillService,
  },
  {
    path: "/app/laboratory/labresult",
    Component: LabReport,
  },
  {
    path: "/app/laboratory/billlaborders",
    Component: BillLab,
  },
  {
    path: "/app/laboratory/labs",
    Component: Labs,
  },
  {
    path: "/app/laboratory/payment",
    Component: LaboratoryPayment,
  },
  {
    path: "/app/laboratory/dashboard",
    Component: LaboratoryDashboard,
  },
];
