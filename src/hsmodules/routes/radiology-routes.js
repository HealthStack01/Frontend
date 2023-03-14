import {lazy} from "react";

const BillRadiology = lazy(() => import("../Radiology/BillRadiology"));
const RadiologyBillService = lazy(() => import("../Radiology/BillService"));
const RadAppointments = lazy(() => import("../Appointment/RadAppointments"));
const RadCheckedin = lazy(() => import("../Appointment/Radworkflow"));
const Radiology = lazy(() => import("../Radiology/Radiologys"));
const RadiologyPayment = lazy(() => import("../Radiology/RadiologyPayment"));
const RadDetails = lazy(() => import("../Radiology/RadDetails"));
const RadiologyReport = lazy(() => import("../Radiology/RadiologyReport"));
<<<<<<< HEAD
=======
const AppointmentComponent = lazy(() =>
  import("../../components/appointment/Appointment")
);

const RadiologyAppointments = () => <AppointmentComponent module="Radiology" />;
>>>>>>> 6629424bb56c5124204d6f95a047225340175196

export const radiologyRoutes = [
  {
    path: "/app/radiology/checkedin",
    Component: RadCheckedin,
  },
  {
    path: "/app/radiology/appointments",
<<<<<<< HEAD
    Component: RadAppointments,
=======
    Component: RadiologyAppointments,
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
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
