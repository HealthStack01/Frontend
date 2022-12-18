import {lazy} from "react";
import PatientProfile from '../Patientportal/PatientProfile'
import ViewRecords from "../Patientportal/ViewRecords"
import Buy from "../Patientportal/Buy"
import Blog from "../Patientportal/Read"
import Chat from "../Patientportal/Chat"

export const patientProfileRoutes = [
  {
    path: "/app/patient-portal/profile",
    Component: PatientProfile,
  },
  {
    path: "/app/patient-portal/view",
    Component: ViewRecords,
  },
  {
    path: "/app/patient-portal/buy",
    Component: Buy,
  },
  {
    path: "app/patient-portal/search",
    Component: null,
  },
  {
    path: "/app/patient-portal/read",
    Component: Blog,
  },
  {
    path: "/app/patient-portal/chat",
    Component: Chat,
  },
  {
    path: "/app/patient-portal/dashboard",
    Component: null,
  },
];
