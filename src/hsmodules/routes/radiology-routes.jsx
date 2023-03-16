import {lazy} from "react";

const BillRadiology = lazy(() => import("../Radiology/BillRadiology"));
const RadiologyBillService = lazy(() => import("../Radiology/BillService"));
const RadAppointments = lazy(() => import("../Appointment/RadAppointments"));
const RadCheckedin = lazy(() => import("../Appointment/Radworkflow"));
const Radiology = lazy(() => import("../Radiology/Radiologys"));
const RadiologyPayment = lazy(() => import("../Radiology/RadiologyPayment"));
const RadDetails = lazy(() => import("../Radiology/RadDetails"));
const RadiologyReport = lazy(() => import("../Radiology/RadiologyReport"));

export const radiologyRoutes = [
  {
    path: "/app/radiology/checkedin",
    Component: RadCheckedin,
  },
  {
    path: "/app/radiology/appointments",
    Component: RadAppointments,
  },
  {
    path: "/app/radiology/billservice",
    Component: RadiologyBillService,
  },
  {
    path: "/app/radiology/radiology-result",
    Component: RadiologyReport,
  },
  {
    path: "/app/radiology/radiology-bill",
    Component: BillRadiology,
  },
  {
    path: "/app/radiology/radiology",
    Component: Radiology,
  },
  {
    path: "/app/radiology/payment",
    Component: RadiologyPayment,
  },
  {
    path: "/app/radiology/rad-details",
    Component: RadDetails,
  },
];
