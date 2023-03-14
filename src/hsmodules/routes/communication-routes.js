import {lazy} from "react";

const CommunicationDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/CommunicationDashboard")
);
const CommunicationChat = lazy(() => import("../communication/chat/Chat"));
const CommunicationEmail = lazy(() => import("../communication/email/Email"));
const CommunicationSMS = lazy(() => import("../communication/sms/SMS"));
<<<<<<< HEAD
=======
const CommunicationNotifications = lazy(() =>
  import("../communication/notifications/Notifications")
);
>>>>>>> 6629424bb56c5124204d6f95a047225340175196

const DummyComponent = () => {
  return <h1>No Yet Available</h1>;
};

export const communicationRoutes = [
  {
    path: "/app/communication/dashboard",
    Component: CommunicationDashboard,
  },
  {
    path: "/app/communication/whatsapp",
    Component: DummyComponent,
  },
  {
    path: "/app/communication/sms",
    Component: CommunicationSMS,
  },
  {
    path: "/app/communication/ussd",
    Component: DummyComponent,
  },
  {
    path: "/app/communication/email",
    Component: CommunicationEmail,
  },
  {
    path: "/app/communication/ivr",
    Component: DummyComponent,
  },
<<<<<<< HEAD
  {
    path: "/app/communication/dashboard",
    Component: DummyComponent,
  },
=======

>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  {
    path: "/app/communication/chats",
    Component: CommunicationChat,
  },
<<<<<<< HEAD
=======

  {
    path: "/app/communication/notifications",
    Component: CommunicationNotifications,
  },
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
];
