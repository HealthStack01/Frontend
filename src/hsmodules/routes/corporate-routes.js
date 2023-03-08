import {lazy} from "react";
//import {PreAuth} from "../ManagedCare/NewPreAuth";

const Policy = lazy(() => import("../ManagedCare/Policy"));
const ExternalPolicy = lazy(() => import("../ManagedCare/externalPolicy"));
const Beneficiary = lazy(() => import("../ManagedCare/Beneficiary"));
const TarrifList = lazy(() => import("../ManagedCare/Tarrifs"));
const HealthPlan = lazy(() => import("../ManagedCare/HealthPlan"));
const Referral = lazy(() => import("../ManagedCare/Referral"));

const HiaOrganizationClient = lazy(() => import("../ManagedCare/HIA"));
const CorporateClient = lazy(() => import("../ManagedCare/Corporate"));
const Claims = lazy(() => import("../ManagedCare/Claims"));
//const ClaimsDetails = lazy(() => import('../ManagedCare/ClaimsDetails'));
const FundsManagement = lazy(() => import("../ManagedCare/FundsManagement"));

const ManagedCareFrontDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/ManagedCareFrontDashboard")
);
const ProviderOrganizationClient = lazy(() =>
  import("../ManagedCare/Providers")
);
const Accreditation = lazy(() => import("../ManagedCare/Accreditation"));

const ComplaintsInventoryReport = lazy(() =>
  import("../ManagedCare/Complaints")
);

const PreAuth = lazy(() => import("../ManagedCare/PreAuth"));

const Premium = lazy(() => import("../ManagedCare/Premium"));

const OrganizationClient = lazy(() =>
  import("../ManagedCare/OrganizationClient")
);
const ProviderPayment = lazy(() => import("../ManagedCare/ProviderPayment"));

const ComplaintDetails = lazy(() => import("../ManagedCare/ComplaintDetails"));
const CheckIn = lazy(() => import("../ManagedCare/Checkin"));
//const PreAuthDetails = lazy(() => import("../ManagedCare/PreAuthDetails"));

const DummyComponent = () => {
  return <h1>No Yet Available</h1>;
};

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
    Component: CheckIn,
  },
  {
    path: "/app/corporate/beneficiary",
    Component: Beneficiary,
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
    path: "/app/corporate/tariff",
    Component: TarrifList,
  },

  {
    path: "/app/corporate/fundmanagement",
    Component: FundsManagement,
  },
];
