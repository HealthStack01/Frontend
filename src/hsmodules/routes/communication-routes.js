import {lazy} from "react";

const CommunicationDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/CommunicationDashboard")
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
    Component: DummyComponent,
  },
  {
    path: "/app/communication/ussd",
    Component: DummyComponent,
  },
  {
    path: "/app/communication/email",
    Component: DummyComponent,
  },
  {
    path: "/app/communication/ivr",
    Component: DummyComponent,
  },
  {
    path: "/app/communication/dashboard",
    Component: DummyComponent,
  },
  {
    path: "/app/communication/chats",
    Component: DummyComponent,
  },
];
