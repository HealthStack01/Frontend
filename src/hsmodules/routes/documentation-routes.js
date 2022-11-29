import {lazy} from "react";
import {Route, Routes, useLocation} from "react-router-dom";

const Documentation = lazy(() => import("../Documentation/Documentation"));

export const documentationRoutes = [
  {
    path: "/app/blood-bank/documentation",
    Component: Documentation,
  },
  {
    path: "/app/crm/documentation",
    Component: Documentation,
  },
  {
    path: "/app/general/documentation",
    Component: Documentation,
  },
  {
    path: "/app/immunization/documentation",
    Component: Documentation,
  },
  {
    path: "/app/labour-ward/documentation",
    Component: Documentation,
  },
  {
    path: "/app/pharmacy/documentation",
    Component: Documentation,
  },
  {
    path: "/app/radiology/documentation",
    Component: Documentation,
  },
  {
    path: "/app/referral/documentation",
    Component: Documentation,
  },
  {
    path: "/app/theatre/documentation",
    Component: Documentation,
  },
  {
    path: "/app/beneficiary/documentation",
    Component: Documentation,
  },
];
