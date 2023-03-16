import {lazy} from "react";
import {Route, Routes, useLocation} from "react-router-dom";

const Documentation = lazy(() => import("../Documentation/Documentation"));
const Inpatient = lazy(() => import("../Ward/Inpatient"));
const Admissions = lazy(() => import("../Ward/Admissions"));
const Discharge = lazy(() => import("../Ward/Discharge"));
const Transfer = lazy(() => import("../Ward/Transfer"));
const WardDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/WardDashboard")
);

export const wardRoutes = [
  {
    path: "/app/ward/transfer",
    Component: Transfer,
  },
  {
    path: "/app/ward/inpatients",
    Component: Inpatient,
  },
  {
    path: "/app/ward/admissions",
    Component: Admissions,
  },
  {
    path: "/app/ward/documentation",
    Component: Documentation,
  },
  {
    path: "/app/ward/discharge",
    Component: Discharge,
  },
  {
    path: "/app/ward/dashboard",
    Component: WardDashboard,
  },
];
