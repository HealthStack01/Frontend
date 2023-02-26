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

const AppointmentComponent = lazy(() =>
  import("../../components/appointment/Appointment")
);

const ClientAppointments = () => <AppointmentComponent module="Client" />;

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
    Component: ClientAppointments,
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
