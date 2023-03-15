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
);

export const bloodBankRoutes = [
  {
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
    Component: Documentation,
  },
];
