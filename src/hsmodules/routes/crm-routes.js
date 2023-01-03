import {lazy} from "react";
import {Route, Routes, useLocation} from "react-router-dom";

const Documentation = lazy(() => import("../Documentation/Documentation"));
const Leads = lazy(() => import("../CRM/Lead"));
const Proposal = lazy(() => import("../CRM/Proposals"));
const Invoice = lazy(() => import("../CRM/Invoice"));
const SLA = lazy(() => import("../CRM/SLA"));
const CrmAppointment = lazy(() => import("../CRM/Appointment"));
const Deals = lazy(() => import("../CRM/Deals"));
const CrmDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/CrmDashboard")
);

export const crmRoutes = [
  {
    path: "/app/crm/documentation",
    Component: Documentation,
  },
  {
    path: "/app/crm/lead",
    Component: Leads,
  },
  {
    path: "/app/crm/proposal",
    Component: Proposal,
  },
  {
    path: "/app/crm/invoice",
    Component: Invoice,
  },
  {
    path: "/app/crm/SLA",
    Component: SLA,
  },
  {
    path: "/app/crm/appointment",
    Component: CrmAppointment,
  },
  {
    path: "/app/crm/deal",
    Component: Deals,
  },

  {
    path: "/app/crm/dashboard",
    Component: CrmDashboard,
  },
];
