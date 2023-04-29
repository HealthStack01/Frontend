import {lazy} from "react";

const FacilityTransactions = lazy(() => import("../GlobalAdmin/FacilityTransactions"));
const OrganizationsPage = lazy(() => import("../Organization/Organizations")); 
//const Payment = lazy(() => import("../Finance/Payment"));

export const globalAdminRoutes = [
  {
   path: "/app/global-admin/organizations",
    Component:OrganizationsPage,
   },
   {
    path: "/app/global-admin/transactions",
     Component:FacilityTransactions,
    },
 
];
