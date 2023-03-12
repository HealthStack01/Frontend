import {lazy} from "react";
import {Route, Routes, useLocation} from "react-router-dom";

// const ClinicAppointments = lazy(() =>
//   import("../Appointment/clinicAppointments")
// );
const ClinicHome = lazy(() => import("../Clinic/ClinicHome"));
const Clinic = lazy(() => import("../Clinic/Clinic"));
const ClinicReport = lazy(() => import("../Clinic/ClinicReport"));
//const ClinicCheckIn = lazy(() => import("../Appointment/ClinicWorkflow"));
const ClinicSetup = lazy(() => import("../Clinic/ClinicSetup"));
const ClinicStore = lazy(() => import("../Clinic/ClinicStore"));
const ClinicCheckin = lazy(() => import("../Clinic/CheckIn"));
const Documentation = lazy(() => import("../Documentation/Documentation"));
const Patients = lazy(() => import("../Client/Client"));
const Payment = lazy(() => import("../Finance/Payment"));
const ClinicDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/ClinicDashboard")
);
const AppointmentComponent = lazy(() =>
  import("../../components/appointment/Appointment")
);

const CheckInComponent = lazy(() =>
  import("../../components/emr-checkin/Check-in")
);

const ClinicAppointment = () => <AppointmentComponent module="Clinic" />;
const ClinicCheckIn = () => <CheckInComponent module="Clinic" />;

export const clinicRoutes = [
  {
    path: "/app/clinic/clinicsetup",
    Component: ClinicSetup,
  },
  {
    path: "/app/clinic/appointments",
    Component: ClinicAppointment,
  },
  {
    path: "/app/clinic/checkin",
    Component: ClinicCheckIn,
  },
  {
    path: "/app/clinic/clinicstore",
    Component: ClinicStore,
  },
  {
    path: "/app/clinic/payments",
    Component: Payment,
  },
  {
    path: "/app/clinic",
    Component: ClinicHome,
  },
  {
    path: "/app/clinic/clinicsetup",
    Component: ClinicSetup,
  },
  // {
  //   path: "/app/clinic/appointments",
  //   Component: ClinicAppointments,
  // },
  {
    path: "/app/clinic/clinicstore",
    Component: ClinicStore,
  },
  {
    path: "/app/clinic/documentation",
    Component: Documentation,
  },
  {
    path: "/app/clinic/patients",
    Component: Patients,
  },
  {
    path: "/app/clinic/clinicreports",
    Component: ClinicReport,
  },
  {
    path: "/app/clinic/clinics",
    Component: Clinic,
  },
  {
    path: "/app/clinic/checkin",
    Component: ClinicCheckin,
  },
  {
    path: "/app/clinic/dashboard",
    Component: ClinicDashboard,
  },
];
