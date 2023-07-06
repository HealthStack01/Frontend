import {lazy} from "react";

const Policy = lazy(() => import("../Corporate/CorpPolicynew"));
//const ExternalPolicy = lazy(() => import("../Corporate/externalPolicy"));
const Beneficiary = lazy(() => import("../Corporate/Beneficiary"));
//const TarrifList = lazy(() => import("../Corporate/Tarrifs"));
/* const HealthPlan = lazy(() => import("../Corporate/HealthPlan"));
const Referral = lazy(() => import("../Corporate/Referral")); */

/* const HiaOrganizationClient = lazy(() => import("../Corporate/HIA"));
const CorporateClient = lazy(() => import("../Corporate/Corporate")); */
const Claims = lazy(() => import("../Corporate/Claims"));
//const FundsManagement = lazy(() => import("../Corporate/FundsManagement"));
const Invoice = lazy(() => import("../Corporate/Invoice"));
const ManagedCareFrontDashboard = lazy(() =>
  import("../dashBoardUiComponent/@modules/ManagedCareFrontDashboard")
);
/* const ProviderOrganizationClient = lazy(() =>
  import("../Corporate/Providers")
);
const ComplaintsInventoryReport = lazy(() =>
  import("../Corporate/Complaints")
); */
const Premium = lazy(() => import("../Corporate/Premium"));
/* const ComplaintDetails = lazy(() => import("../Corporate/ComplaintDetails")); */
// const CheckIn = lazy(() => import("../ManagedCare/Checkin"));
const CorporateCheckin = lazy(() => import("../Corporate/Checkin"));

const CorporateBeneficiary = () => <Beneficiary standalone={true} />;

export const corporateRoutes = [
  {
    path: "/app/corporate/policy",
    Component: Policy,
  },
  {
    path: "/app/corporate/claims",
    Component: Claims,
  },
  {
    path: "/app/corporate/dashboard",
    Component: ManagedCareFrontDashboard,
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
    path: "/app/corporate/premiums",
    Component: Premium,
  },
  {
    path: "/app/corporate/invoice",
    Component: Invoice,
  },

 /*  {
    path: "/app/corporate/external-policy",
    Component: ExternalPolicy,
  }, */
/*   {
    path: "/app/corporate/complaints",
    Component: ComplaintsInventoryReport,
  }, */



 /*  {
    path: "/app/corporate/referrals",
    Component: Referral,
  }, */

/*   {
    path: "/app/corporate/HIA",
    Component: HiaOrganizationClient,
  }, */
/*   {
    path: "/app/corporate/corporate",
    Component: CorporateClient,
  }, */
/*   {
    path: "/app/corporate/provider",
    Component: ProviderOrganizationClient,
  }, */

/*   {
    path: "/app/corporate/healthplan",
    Component: HealthPlan,
  }, */

 /*  {
    path: "/app/corporate/complaintDetails",
    Component: ComplaintDetails,
  }, */
 
 /*  {
    path: "/app/corporate/tariff",
    Component: TarrifList,
  },

  {
    path: "/app/corporate/fundmanagement",
    Component: FundsManagement,
  }, */
];
