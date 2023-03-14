import {lazy} from "react";

const TheatreBillService = lazy(() => import("../Theatre/BillService"));
const BillTheatre = lazy(() => import("../Theatre/BillTheatre"));
const Documentation = lazy(() => import("../Documentation/Documentation"));
const TheatreDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/TheatreDashboard")
);
const Theatre = lazy(() => import("../Theatre/Theatres"));
<<<<<<< HEAD
const TheatreAppointments = lazy(() =>
  import("../Appointment/TheatreAppointments")
);
=======
// const TheatreAppointments = lazy(() =>
//   import("../Appointment/TheatreAppointments")
// );
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
const TheatrePayment = lazy(() => import("../Theatre/TheatrePayment"));
const TheatreReport = lazy(() => import("../Theatre/TheatreReport"));
const TheatreCheckIn = lazy(() => import("../Appointment/TheatreWorkflow"));

<<<<<<< HEAD
=======
const AppointmentComponent = lazy(() =>
  import("../../components/appointment/Appointment")
);

const TheatreAppointments = () => <AppointmentComponent module="Theatre" />;

>>>>>>> 6629424bb56c5124204d6f95a047225340175196
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
