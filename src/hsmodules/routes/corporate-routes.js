import {lazy} from "react";

const Policy = lazy(() => import("../_Corporate/Policy"));
const ExternalPolicy = lazy(() => import("../ManagedCare/externalPolicy"));
const Beneficiary = lazy(() => import("../Corporate/Beneficiary"));
const TarrifList = lazy(() => import("../ManagedCare/Tarrifs"));
const HealthPlan = lazy(() => import("../ManagedCare/HealthPlan"));
const Referral = lazy(() => import("../ManagedCare/Referral"));

const HiaOrganizationClient = lazy(() => import("../ManagedCare/HIA"));
const CorporateClient = lazy(() => import("../ManagedCare/Corporate"));
const Claims = lazy(() => import("../ManagedCare/Claims"));
const FundsManagement = lazy(() => import("../ManagedCare/FundsManagement"));
const Invoice = lazy(() => import("../Corporate/Invoice"));
const ManagedCareFrontDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/ManagedCareFrontDashboard")
);
const ProviderOrganizationClient = lazy(() =>
  import("../ManagedCare/Providers")
);
const ComplaintsInventoryReport = lazy(() =>
  import("../ManagedCare/Complaints")
);
const Premium = lazy(() => import("../ManagedCare/Premium"));
const ComplaintDetails = lazy(() => import("../ManagedCare/ComplaintDetails"));
// const CheckIn = lazy(() => import("../ManagedCare/Checkin"));
const CorporateCheckin = lazy(() => import("../Corporate/Checkin"));

const CorporateBeneficiary = () => <Beneficiary standalone={true} />;

export const corporateRoutes = [
  {
    path: "/app/corporate/policy",
    Component: Policy,
  },
  {
    path: "/app/corporate/external-policy",
    Component: ExternalPolicy,
  },
  {
    path: "/app/corporate/complaints",
    Component: ComplaintsInventoryReport,
  },

  {
    path: "/app/corporate/claims",
    Component: Claims,
  },

  {
    path: "/app/corporate/referrals",
    Component: Referral,
  },
  {
    path: "/app/corporate/dashboard",
    Component: ManagedCareFrontDashboard,
  },
  {
    path: "/app/corporate/HIA",
    Component: HiaOrganizationClient,
  },
  {
    path: "/app/corporate/corporate",
    Component: CorporateClient,
  },
  {
    path: "/app/corporate/provider",
    Component: ProviderOrganizationClient,
  },
  {
    path: "/app/corporate/checkin",
    Component: CorporateCheckin,
  },
  {
    path: "/app/corporate/beneficiary",
    Component: CorporateBeneficiary,
  },

  {
    path: "/app/corporate/healthplan",
    Component: HealthPlan,
  },
  {
    path: "/app/corporate/premiums",
    Component: Premium,
  },
  {
    path: "/app/corporate/complaintDetails",
    Component: ComplaintDetails,
  },
  {
    path: "/app/corporate/invoice",
    Component: Invoice,
  },
  {
    path: "/app/corporate/tariff",
    Component: TarrifList,
  },

  {
    path: "/app/corporate/fundmanagement",
    Component: FundsManagement,
  },
];
