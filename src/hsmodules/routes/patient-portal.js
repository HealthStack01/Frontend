import {lazy} from "react";
import PatientProfile from '../Patientportal/PatientProfile'

export const patientProfileRoutes = [
  {
    path: "/app/patient-portal/profile",
    Component: PatientProfile,
  },
  {
    path: "/app/patient-portal/view",
    Component: null,
  },
  {
    path: "/app/patient-portal/buy",
    Component: null,
  },
  {
    path: "app/patient-portal/search",
    Component: null,
  },
  {
    path: "/app/patient-portal/read",
    Component: null,
  },
  {
    path: "/app/patient-portal/chat",
    Component: null,
  },
  {
    path: "/app/patient-portal/dashboard",
    Component: null,
  },
];
