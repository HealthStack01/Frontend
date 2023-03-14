import {lazy} from "react";

const ClientsAppointments = lazy(() => import("../Client/Appointments"));
const ClinicReport = lazy(() => import("../Clinic/ClinicReport"));
const Documentation = lazy(() => import("../Documentation/Documentation"));
const FrontDesk = lazy(() => import("../Client/FrontDesk"));
const Patients = lazy(() => import("../Client/Client"));
const ClientPayment = lazy(() => import("../Client/Payment"));
const ClientDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/ClientDashboard")
);

<<<<<<< HEAD
=======
const AppointmentComponent = lazy(() =>
  import("../../components/appointment/Appointment")
);

const ClientAppointments = () => <AppointmentComponent module="Client" />;

>>>>>>> 6629424bb56c5124204d6f95a047225340175196
export const clientRoutes = [
  {
    path: "/app/clients/documentation",
    Component: Documentation,
  },
  {
    path: "/app/clients/clients",
    Component: Patients,
  },
  {
    path: "/app/clients/clinicreports",
    Component: ClinicReport,
  },
  {
    path: "/app/clients/frontdesk",
    Component: FrontDesk,
  },
  {
    path: "/app/clients/payment",
    Component: ClientPayment,
  },
  {
    path: "/app/clients/appointments",
<<<<<<< HEAD
    Component: ClientsAppointments,
=======
    Component: ClientAppointments,
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  },
  {
    path: "/app/clients/clients",
    Component: Patients,
  },
  {
    path: "/app/clients/dashboard",
    Component: ClientDashboard,
  },
];
