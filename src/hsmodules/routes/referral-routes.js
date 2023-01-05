import {lazy} from "react";

import IncomingReferral from "../Referral/ReferralListIncoming";
import OutgoingReferral from "../Referral/ReferralListOutcoming";
const ReferralDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/ReferralDashboard")
);

const DummyComponent = () => {
  return <h1>No Yet Available</h1>;
};

export const referralRoutes = [
  {
    path: "/app/referral/dashboard",
    Component: ReferralDashboard,
  },
  {
    path: "/app/referral/incoming",
    Component: IncomingReferral,
  },
  {
    path: "/app/referral/outgoing",
    Component: OutgoingReferral,
  },
  {
    path: "/app/referral/account",
    Component: DummyComponent,
  },
  {
    path: "/app/referral/setting",
    Component: DummyComponent,
  },
  {
    path: "/app/referral/dashboard",
    Component: DummyComponent,
  },
];
