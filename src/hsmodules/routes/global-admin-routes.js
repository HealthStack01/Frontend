import {lazy} from "react";

const FacilityTransactions = lazy(() => import("../GlobalAdmin/FacilityTransactions"));
const OrganizationsPage = lazy(() => import("../Organization/Organizations")); 
const LoginPage = lazy(() => import("../GlobalAdmin/Userlogin")); 
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
    {
      path: "/app/global-admin/logins",
       Component:LoginPage,
      },
 
];
