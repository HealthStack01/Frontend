import {lazy} from "react";

const AccountDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/AccountDashboard")
);

const DummyComponent = () => {
  return <h1>No Yet Available</h1>;
};

export const accountingRoutes = [
  {
    path: "/app/accounting/dashboard",
    Component: AccountDashboard,
  },
  {
    path: "/app/accounting/chart-of-account",
    Component: DummyComponent,
  },
  {
    path: "/app/accounting/account",
    Component: DummyComponent,
  },
  {
    path: "/app/accounting/payment",
    Component: DummyComponent,
  },
  {
    path: "/app/accounting/expenses",
    Component: DummyComponent,
  },
  {
    path: "/app/accounting/journal",
    Component: DummyComponent,
  },
  {
    path: "/app/accounting/report",
    Component: DummyComponent,
  },
];
