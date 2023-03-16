import {lazy} from "react";

const Report = lazy(() => import("../Accounts/Report"));
const ChartofAccount = lazy(() => import("../Accounts/ChartofAccount"));
const Expense = lazy(() => import("../Accounts/Expense"));
const Journal = lazy(() => import("../Accounts/Journal"));
const Ledgers = lazy(() => import("../Accounts/Ledgers"));
const Payment = lazy(() => import("../Finance/Payment"));
const AccountDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/AccountDashboard")
);

export const AccountsRoutes = [
  {
    path: "/app/accounts/payments",
    Component: Payment,
  },
  {
    path: "/app/accounts/expenses",
    Component: Expense,
  },
  {
    path: "/app/accounts/reports",
    Component: Report,
  },
  {
    path: "/app/accounts/journals",
    Component: Journal,
  },
  {
    path: "/app/accounts/ledgers",
    Component: Ledgers,
  },
  {
    path: "/app/accounts/chartsaccount",
    Component: ChartofAccount,
  },
  {
    path: "/app/accounts/dashboard",
    Component: AccountDashboard,
  },
];
