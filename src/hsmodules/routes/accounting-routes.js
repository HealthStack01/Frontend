import {lazy} from "react";

const AccountDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/AccountDashboard")
);

export const accountingRoutes = [
  {
    path: "/app/accounting/dashboard",
    Component: AccountDashboard,
  },
  {
    path: "/app/accounting/chart-of-account",
    Component: <></>,
  },
  {
    path: "/app/accounting/account",
    Component: <></>,
  },
  {
    path: "/app/accounting/payment",
    Component: <></>,
  },
  {
    path: "/app/accounting/expenses",
    Component: <></>,
  },
  {
    path: "/app/accounting/journal",
    Component: <></>,
  },
  {
    path: "/app/accounting/report",
    Component: <></>,
  },
];
