import {lazy} from "react";

const CommunicationDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/CommunicationDashboard")
);

export const communicationRoutes = [
  {
    path: "/app/communication/dashboard",
    Component: CommunicationDashboard,
  },
  {
    path: "/app/communication/whatsapp",
    Component: "",
  },
  {
    path: "/app/communication/sms",
    Component: "",
  },
  {
    path: "/app/communication/ussd",
    Component: "",
  },
  {
    path: "/app/communication/email",
    Component: "",
  },
  {
    path: "/app/communication/ivr",
    Component: "",
  },
  {
    path: "/app/communication/dashboard",
    Component: "",
  },
];
