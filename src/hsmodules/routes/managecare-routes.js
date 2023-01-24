import {lazy} from "react";

const Policy = lazy(() => import("../ManagedCare/Policy"));
const ExternalPolicy = lazy(() => import("../ManagedCare/externalPolicy"));
const Beneficiary = lazy(() => import("../ManagedCare/Beneficiary"));
const TarrifList = lazy(() => import("../ManagedCare/Tarrifs"));
const HealthPlan = lazy(() => import("../ManagedCare/HealthPlan"));
const Referral = lazy(() => import("../ManagedCare/Referral"));

const HiaOrganizationClient = lazy(() => import("../ManagedCare/HIA"));
const CorporateClient = lazy(() => import("../ManagedCare/Corporate"));
const Claims = lazy(() => import("../ManagedCare/Claims"));
const ClaimsDetails = lazy(() => import("../ManagedCare/ClaimsDetails"));
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
const PreAuthDetails = lazy(() => import("../ManagedCare/PreAuthDetails"));

const DummyComponent = () => {
  return <h1>No Yet Available</h1>;
};

export const managedCareRoutes = [
  {
    path: "/app/managed-care/accreditation",
    Component: Accreditation,
  },
  {
    path: "/app/managed-care/policy",
    Component: Policy,
  },
  {
    path: "/app/managed-care/external-policy",
    Component: ExternalPolicy,
  },
  {
    path: "/app/managed-care/complaints",
    Component: ComplaintsInventoryReport,
  },
  // {
  // 	path: '/app/managed-care/organisation',
  // 	Component: OrganizationClient,
  // },
  {
    path: "/app/managed-care/claims",
    Component: Claims,
  },
  {
    path: "/app/managed-care/claims-details",
    Component: ClaimsDetails,
  },
  {
    path: "/app/managed-care/referrals",
    Component: Referral,
  },
  {
    path: "/app/managed-care/dashboard",
    Component: ManagedCareFrontDashboard,
  },
  {
    path: "/app/managed-care/HIA",
    Component: HiaOrganizationClient,
  },
  {
    path: "/app/managed-care/corporate",
    Component: CorporateClient,
  },
  {
    path: "/app/managed-care/provider",
    Component: ProviderOrganizationClient,
  },
  {
    path: "/app/managed-care/checkin",
    Component: CheckIn,
  },
  {
    path: "/app/managed-care/beneficiary",
    Component: Beneficiary,
  },

  {
    path: "/app/managed-care/usermgt",
    Component: DummyComponent,
  },
  {
    path: "/app/managed-care/report",
    Component: DummyComponent,
  },
  {
    path: "/app/managed-care/healthplan",
    Component: HealthPlan,
  },
  {
    path: "/app/managed-care/premiums",
    Component: Premium,
  },
  {
    path: "/app/managed-care/complaintDetails",
    Component: ComplaintDetails,
  },
  {
    path: "/app/managed-care/tariff",
    Component: TarrifList,
  },
  {
    path: "/app/managed-care/preauthorization",
    Component: PreAuth,
  },
  {
    path: "/app/managed-care/preauthorizationDetails",
    Component: PreAuthDetails,
  },
  {
    path: "/app/managed-care/fundmanagement",
    Component: FundsManagement,
  },
];
