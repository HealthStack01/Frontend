import { lazy } from "react";

const TheatreBillService = lazy(() => import("../Theatre/BillService"));
const BillTheatre = lazy(() => import("../Theatre/BillTheatre"));
const Documentation = lazy(() => import("../Documentation/Documentation"));
const TheatreDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/TheatreDashboard")
);
const Theatre = lazy(() => import("../Theatre/Theatres"));
// const TheatreAppointments = lazy(() =>
//   import("../Appointment/TheatreAppointments")
// );
const TheatrePayment = lazy(() => import("../Theatre/TheatrePayment"));
const TheatreReport = lazy(() => import("../Theatre/TheatreReport"));
const TheatreCheckIn = lazy(() => import("../Appointment/TheatreWorkflow"));

const AppointmentComponent = lazy(() =>
  import("../../components/appointment/Appointment")
);

const TheatreAppointments = () => <AppointmentComponent module="Theatre" />;

export const theatreRoutes = [
  {
    path: "/app/theatre/theatre-checkedin",
    Component: TheatreCheckIn,
  },
  {
    path: "/app/theatre/theatre-appointments",
    Component: TheatreAppointments,
  },
  {
    path: "/app/theatre/billservice",
    Component: TheatreBillService,
  },
  {
    path: "/app/theatre/theatre-result",
    Component: TheatreReport,
  },
  {
    path: "/app/theatre/theatre-bill",
    Component: BillTheatre,
  },
  {
    path: "/app/theatre/theatre",
    Component: Theatre,
  },
  {
    path: "/app/theatre/theatre-payment",
    Component: TheatrePayment,
  },
  {
    path: "/app/theatre/documentation",
    Component: Documentation,
  },
];
