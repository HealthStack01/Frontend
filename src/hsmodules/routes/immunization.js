import {useEffect, useState, useContext, lazy, Suspense} from "react";
import {Route, Routes, useLocation} from "react-router-dom";

const VaccineProfile = lazy(() => import("../Immunization/VaccineProfile"));
const ImmunizationAppointments = lazy(() =>
  import("../Appointment/immunizationAppoinment")
);
const ImmunizationCheckIn = lazy(() => import("../Immunization/Checkin"));
const ImmunizationInventory = lazy(() => import("../Immunization/Inventory"));
const ImmunizationDashboardComponent = lazy(() =>
  import("../dashBoardUiComponent/@modules/ImmunizationDashboard")
);

export const immunizationRoutes = [
  {
    path: "/app/immunization/dashboard",
    Component: ImmunizationDashboardComponent,
  },
  {
    path: "/app/immunization/schedule",
    Component: null,
  },
  {
    path: "/app/immunization/vaccineprofile",
    Component: VaccineProfile,
  },
  {
    path: "/app/immunization/appointment",
    Component: ImmunizationAppointments,
  },
  {
    path: "/app/immunization/checkin-out",
    Component: ImmunizationCheckIn,
  },
  {
    path: "/app/immunization/report",
    Component: null,
  },
  {
    path: "/app/immunization/inventory",
    Component: ImmunizationInventory,
  },
];
