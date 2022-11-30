import {lazy} from "react";

import IncomingReferral from "../Referral/ReferralListIncoming";
import OutgoingReferral from "../Referral/ReferralListOutcoming";
const ReferralDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/ReferralDashboard")
);

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
    Component: null,
  },
  {
    path: "/app/referral/setting",
    Component: null,
  },
  {
    path: "/app/referral/dashboard",
    Component: null,
  },
];
