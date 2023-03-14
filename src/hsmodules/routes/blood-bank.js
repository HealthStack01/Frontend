<<<<<<< HEAD
import { lazy } from 'react';

const Documentation = lazy(() => import('../Documentation/Documentation'));
const BloodBankInventory = lazy(() => import('../Bloodbank/Inventory'));
const BloodBankAppointments = lazy(() =>
  import('../Appointment/bloodBankAppointment')
);
const BloodBankLab = lazy(() => import('../Bloodbank/Lab'));
const BloodbankDashboard = lazy(() =>
  import('../dashBoardUiComponent/@modules/BloodbankDashboard')
=======
import {lazy} from "react";

const Documentation = lazy(() => import("../Documentation/Documentation"));
const BloodBankInventory = lazy(() => import("../Bloodbank/Inventory"));
// const BloodBankAppointments = lazy(() =>
//   import("../Appointment/bloodBankAppointment")
// );
const BloodBankLab = lazy(() => import("../Bloodbank/Lab"));
const BloodbankDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/BloodbankDashboard")
);

const AppointmentComponent = lazy(() =>
  import("../../components/appointment/Appointment")
);

const BloodBankAppointments = () => (
  <AppointmentComponent module="Blood Bank" />
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
);

export const bloodBankRoutes = [
  {
<<<<<<< HEAD
    path: '/app/blood-bank/dashboard',
    Component: BloodbankDashboard,
  },
  {
    path: '/app/blood-bank/inventory',
    Component: BloodBankInventory,
  },
  {
    path: '/app/blood-bank/appointment',
    Component: BloodBankAppointments,
  },
  {
    path: '/app/blood-bank/lab',
    Component: BloodBankLab,
  },
  {
    path: '/app/blood-bank/documentation',
=======
    path: "/app/blood-bank/dashboard",
    Component: BloodbankDashboard,
  },
  {
    path: "/app/blood-bank/inventory",
    Component: BloodBankInventory,
  },
  {
    path: "/app/blood-bank/appointment",
    Component: BloodBankAppointments,
  },
  {
    path: "/app/blood-bank/lab",
    Component: BloodBankLab,
  },
  {
    path: "/app/blood-bank/documentation",
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
    Component: Documentation,
  },
];
