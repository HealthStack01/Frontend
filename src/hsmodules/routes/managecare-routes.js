import {lazy} from "react";
//import {PreAuth} from "../ManagedCare/NewPreAuth";

const Policy = lazy(() => import("../ManagedCare/Policy"));
const NewPolicy = lazy(() => import("../ManagedCare/NewPolicy"));
const ExternalPolicy = lazy(() => import("../ManagedCare/externalPolicy"));
const Beneficiary = lazy(() => import("../ManagedCare/Beneficiary"));
const NewBeneficiary = lazy(() => import("../ManagedCare/New-Beneficiary"));
const Tariff = lazy(() => import("../ManagedCare/New-Tarrif"));
const HealthPlan = lazy(() => import("../ManagedCare/HealthPlan"));
const Referral = lazy(() => import("../ManagedCare/Referral"));

const HiaOrganizationClient = lazy(() => import("../ManagedCare/HIA"));
const CorporateClient = lazy(() => import("../ManagedCare/Corporate"));
const NewCorporateClient = lazy(() => import("../ManagedCare/New-Corporate"));
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
const Invoice = lazy(() => import("../ManagedCare/Invoice"));

const OrganizationClient = lazy(() =>
  import("../ManagedCare/OrganizationClient")
);
const ProviderPayment = lazy(() =>
  import("../ManagedCare/provider-payment/ProviderPayment")
);

const ComplaintDetails = lazy(() => import("../ManagedCare/ComplaintDetails"));
const CheckIn = lazy(() => import("../ManagedCare/Checkin"));
const ManagedCareCheckIn = lazy(() =>
  import("../../components/hmo-checkin/Check-in")
);
//const PreAuthDetails = lazy(() => import("../ManagedCare/PreAuthDetails"));

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
    Component: NewPolicy,
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
  // {
  // 	path: '/app/managed-care/claims-details',
  // 	Component: ClaimsDetails,
  // },
  {
    path: "/app/managed-care/referrals",
    Component: Referral,
  },
  {
    path: "/app/managed-care/dashboard",
    Component: ManagedCareFrontDashboard,
  },
  {
    path: "/app/managed-care/provider-payment",
    Component: ProviderPayment,
  },
  {
    path: "/app/managed-care/HIA",
    Component: HiaOrganizationClient,
  },
  {
    path: "/app/managed-care/corporate",
    Component: NewCorporateClient,
  },
  {
    path: "/app/managed-care/invoice",
    Component: Invoice,
  },
  {
    path: "/app/managed-care/provider",
    Component: ProviderOrganizationClient,
  },
  {
    path: "/app/managed-care/checkin",
    Component: ManagedCareCheckIn,
  },
  {
    path: "/app/managed-care/beneficiary",
    Component: NewBeneficiary,
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
    Component: Tariff,
  },
  {
    path: "/app/managed-care/preauthorization",
    Component: PreAuth,
  },
  // {
  //   path: "/app/managed-care/preauthorizationDetails",
  //   Component: PreAuthDetails,
  // },
  {
    path: "/app/managed-care/fundmanagement",
    Component: FundsManagement,
  },
];
