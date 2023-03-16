import {lazy} from "react";

const BillLab = lazy(() => import("../Laboratory/BillLab"));
const CaseDefinition = lazy(() => import("../Epidemiology/CaseDefinition"));
const EpidemiologyDashboard = lazy(() => import("../Epidemiology/DashBoard"));
const Map = lazy(() => import("../Epidemiology/Map"));
const EpidemiologySignals = lazy(() => import("../Epidemiology/Signals"));

export const epidRoutes = [
  {
    path: "/app/epidemiology/map",
    Component: Map,
  },
  {
    path: "/app/epidemiology/dashboard",
    Component: EpidemiologyDashboard,
  },
  {
    path: "/app/epidemiology/casedefinition",
    Component: CaseDefinition,
  },
  {
    path: "/app/epidemiology/communication",
    Component: BillLab,
  },
  {
    path: "/app/epidemiology/signal",
    Component: EpidemiologySignals,
  },
];
