import {lazy} from "react";

const CommunicationDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/CommunicationDashboard")
);
const CommunicationChat = lazy(() => import("../communication/chat/Chat"));
const CommunicationEmail = lazy(() => import("../communication/email/Email"));
const CommunicationSMS = lazy(() => import("../communication/sms/SMS"));
const CommunicationNotifications = lazy(() =>
  import("../communication/notifications/Notifications")
);

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

  {
    path: "/app/communication/chats",
    Component: CommunicationChat,
  },

  {
    path: "/app/communication/notifications",
    Component: CommunicationNotifications,
  },
];
