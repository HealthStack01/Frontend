import {lazy} from "react";

const FinanceBillService = lazy(() => import("../Finance/BillService"));
const FacilityAccount = lazy(() => import("../Finance/FacilityAccount"));
const Services = lazy(() => import("../Finance/Services"));
const HMOauth = lazy(() => import("../Finance/HMOauth"));
const Payment = lazy(() => import("../Finance/Payment"));
const Collections = lazy(() => import("../Finance/Collections"));
const Store = lazy(() => import("../inventory/Store"));
const FinanceDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/FinanceDashboard")
);
const ClientTransactions = lazy(() => import("../Finance/ClientTransactions"));
const EMRTarrifsComponent = lazy(() => import("../Finance/Tariffs"));

export const financeRoutes = [
  {
    path: "/app/finance/payment",
    Component: Payment,
  },
  {
    path: "/app/finance/collections",
    Component: Collections,
  },
  {
    path: "/app/finance/services",
    Component: Services,
  },
  {
    path: "/app/finance/billservices",
    Component: FinanceBillService,
  },
  {
    path: "/app/finance/hmoauthorization",
    Component: HMOauth,
  },
  {
    path: "/app/finance/revenue",
    Component: FacilityAccount,
  },
  {
    path: "/app/finance/location",
    Component: Store,
  },
  {
    path: "/app/finance/dashboard",
    Component: FinanceDashboard,
  },
  {
    path: "/app/finance/client-transactions",
    Component: ClientTransactions,
  },
  {
    path: "/app/finance/tariffs",
    Component: EMRTarrifsComponent,
  },
];
