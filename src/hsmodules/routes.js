import {useEffect, useState, useContext, lazy, Suspense} from "react";
import {Route, Routes, useLocation} from "react-router-dom";

import {UserContext, ObjectContext} from "../context";

import AccountHome from "./Accounts/AccountHome";
import PrivateOutlet from "./PrivateOutlet";
import Overview from "./app/Overview";

import ClinicHome from "./Clinic/ClinicHome";
import EpidemiologyDashboard from "./Epidemiology/DashBoard";

import EpidemiologyHome from "./Epidemiology/EpidemiologyHome";
import FacilityHome from "./Admin/FacilityHome";
import FinanceHome from "./Finance/FinanceHome";

import WardHome from "./Ward/WardHome";

import InventoryHome from "./inventory/InventoryHome";
import LaboratoryHome from "./Laboratory/LaboratoryHome";

import Payment from "./Finance/Payment";

import PharmacyHome from "./Pharmacy/PharmacyHome";

import RadiologyHome from "./Radiology/RadiologyHome";

import TheatreHome from "./Theatre/TheatreHome";

import ClientHome from "./Client/ClientHome";
import GeneralAppointments from "./Appointment/generalAppointment";

import ClientDashboard from "./dashBoardUiComponent/@modules/ClientDashboard";
import ClinicDashboard from "./dashBoardUiComponent/@modules/ClinicDashboard";
import LandingPageDashboard from "./dashBoardUiComponent/@modules/LandingPageDashboard";
import WardDashboard from "./dashBoardUiComponent/@modules/WardDashboard";
import PharmacyDashboard from "./dashBoardUiComponent/@modules/PharmacyDashboard";
import InventoryDashboard from "./dashBoardUiComponent/@modules/InventoryDashboard";
import FinanceDashboard from "./dashBoardUiComponent/@modules/FinanceDashboard";
import LaboratoryDashboard from "./dashBoardUiComponent/@modules/LaboratoryDashboard";
import ManagedCareHome from "./ManagedCare/ManagedCareHome";

import ManagedCareFrontDashboard from "./dashBoardUiComponent/@modules/ManagedCareFrontDashboard";

import ReferralHome from "./Referral/ReferralHome";

import CRMHome from "./CRM/CrmHome";

import Complaint from "./Complaints/Complaint";
import NewComplaints from "./Complaints/new-complaints";
import ImmunizationHome from "./Immunization/ImmunizationHome";

import BloodBankHome from "./Bloodbank/BloodBankHome";

import PageLoaderComponent from "../components/page-loader/page-loader";

import {authRoutes} from "./routes/auth-routes";
import {AccountsRoutes} from "./routes/account-routes";
import {accountingRoutes} from "./routes/accounting-routes";
import {adminRoutes} from "./routes/admin-routes";
import {AppointmentRoutes, WorkFlowRoutes} from "./routes/appointment-routes";
import {bloodBankRoutes} from "./routes/blood-bank";
import {clientRoutes} from "./routes/client-routes";
import {clinicRoutes} from "./routes/clinic-routes";
import {communicationRoutes} from "./routes/communication-routes";
import {crmRoutes} from "./routes/crm-routes";
import {epidRoutes} from "./routes/epid-routes";
import {managedCareRoutes} from "./routes/managecare-routes";
import {financeRoutes} from "./routes/finance-routes";
import {inventoryRoutes} from "./routes/inventory-routes";
import {laboratoryRoutes} from "./routes/lab-routes";
import {pharmacyRoutes} from "./routes/pharmacy-routes";
import {radiologyRoutes} from "./routes/radiology-routes";
import {referralRoutes} from "./routes/referral-routes";
import {patientProfileRoutes} from "./routes/patient-portal";
import {immunizationRoutes} from "./routes/immunization-routes";
import {documentationRoutes} from "./routes/documentation-routes";
import {theatreRoutes} from "./routes/theatre-routes";
import {wardRoutes} from "./routes/ward-routes";

import AccountDashboard from "./dashBoardUiComponent/@modules/AccountDashboard";
import AdminDashboard from "./dashBoardUiComponent/@modules/AdminDashboard";
import RadiologyDashboard from "./dashBoardUiComponent/@modules/RadiologyDashboard";
import TheatreDashboard from "./dashBoardUiComponent/@modules/TheatreDashboard";
import CrmDashboard from "./dashBoardUiComponent/@modules/CrmDashboard";
import ReferralDashboard from "./dashBoardUiComponent/@modules/ReferralDashboard";
import CommunicationDashboard from "./dashBoardUiComponent/@modules/CommunicationDashboard";
import ImmunizationDashboardComponent from "./dashBoardUiComponent/@modules/ImmunizationDashboard";
import BloodbankDashboard from "./dashBoardUiComponent/@modules/BloodbankDashboard";

import WalletOTP from "./PouchiiWallet/walletOtp";
import DetailComplaint from "./Complaints/DetailComplaints";
import {marketPlaceRoutes} from "./routes/marketPlace";
import WalletPin from "./PouchiiWallet/walletPin";
import UserAccountPage from "./Admin/UserDetail";
import OrganizationsPage from "./Organization/Organizations";

import NotFound from "../notFound";
import CorporateModule from "./Corporate/Corporate";
import {PolicyCreateForExternalLink} from "./ManagedCare/CreatePolicyExternalLink";
import CreateTest from "./ManagedCare/CreateTest";

const AdminOrganization = lazy(() => import("./Admin/Organization"));

const moduleLocationTypes = {
  clinic: "Clinic",
  clients: "Front Desk",
  admin: "Front Desk",
  pharmacy: "Pharmacy",
  finance: "Finance",
  inventory: "Store",
  ward: "Ward",
  laboratory: "Laboratory",
};

const AppRoutes = () => {
  //const {setLocationType} = useRepository(Models.LOCATION);

  const [currentModule, setCurrentModule] = useState("");
  const location = useLocation();
  useEffect(() => {
    const paths = location.pathname.split("/");
    const newModule = paths.length > 2 && paths[2];
    setCurrentModule(newModule);
    if (
      newModule !== currentModule &&
      Object.keys(moduleLocationTypes).includes(newModule)
    ) {
      /* setLocationType(moduleLocationTypes[newModule]); */
    }
  }, [location]);

  const {authenticatingUser} = useContext(UserContext);

  if (authenticatingUser) return <PageLoaderComponent />;

  return (
    <>
      <Suspense fallback={<PageLoaderComponent />}>
        <Routes>
          <>
            {authRoutes.map(route => {
              const {path, Component} = route;
              return <Route key={path} path={path} element={<Component />} />;
            })}
          </>
          {/************************** Page not found *************************************** */}
          <Route path="*" element={<NotFound />} />

          {/************************** external Beneficiary Routes :hmoFacilityId *************************************** */}
          <Route
            path="/create-policy-external-link/:hmoFacilityId/:facilityType"
            element={<PolicyCreateForExternalLink />}
          />
          <Route path="/create-test" element={<CreateTest />} />

          {/************************** Payment Integration Routes *************************************** */}
          <Route path="/verify-otp" element={<WalletOTP />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="/wallet-pin" element={<WalletPin />} />

          {/************************** App Dashboard Routes *************************************** */}
          <Route path="/app" element={<PrivateOutlet />}>
            <Route index element={<Overview />} />
            <Route
              path="/app/overview/dashboard"
              element={<LandingPageDashboard />}
            />

            <Route path="/app/user" element={<UserAccountPage />} />

            <Route path="/app/corporate" element={<AdminOrganization />} />

            {/* ***************************** ACCOUNTS ROUTES ************************************* */}

            <Route path="/app/Organizations" element={<OrganizationsPage />} />

            {/* ***************************** ACCOUNTS ROUTES ************************************* */}
            <Route path="/app/accounts" element={<AccountHome />}>
              {AccountsRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/* ***************************** GENERAL APPOINTMENTS ************************************* */}

            <Route path="/app/appointments">
              {AppointmentRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            <Route path="/app/appointments/workflow">
              {WorkFlowRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/* ***************************** Documetation ROUTES ************************************* */}
            {documentationRoutes.map(route => {
              const {path, Component} = route;
              return <Route key={path} path={path} element={<Component />} />;
            })}

            {/* ***************************** CLINICS ROUTES ************************************* */}

            <Route path="/app/clinic" element={<ClinicHome />}>
              <Route index element={<ClinicDashboard />} />
              {clinicRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/* ***************************** CLIENTS ROUTES ************************************* */}
            <Route path="/app/clients/" element={<ClientHome />}>
              <Route index element={<ClientDashboard />} />
              {clientRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/* ***************************** EPIDEMIOLOGY ROUTES ************************************* */}

            <Route path="/app/epidemiology" element={<EpidemiologyHome />}>
              <Route index element={<EpidemiologyDashboard />} />
              {epidRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/* ***************************** ADMIN ROUTES ************************************* */}

            <Route path="/app/admin" element={<FacilityHome />}>
              <Route index element={<AdminDashboard />} />
              {adminRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/* ***************************** FINANCE ROUTES ************************************* */}

            <Route path="/app/finance" element={<FinanceHome />}>
              <Route index element={<FinanceDashboard />} />
              {financeRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/* ***************************** INVENTORY ROUTES ************************************* */}

            <Route path="/app/inventory" element={<InventoryHome />}>
              <Route index element={<InventoryDashboard />} />

              {inventoryRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/* ***************************** LABS ROUTES ************************************* */}

            <Route path="/app/laboratory" element={<LaboratoryHome />}>
              <Route index element={<LaboratoryDashboard />} />
              {laboratoryRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/* ***************************** PHARMACY ROUTES ************************************* */}

            <Route path="/app/pharmacy" element={<PharmacyHome />}>
              <Route index element={<PharmacyDashboard />} />
              {pharmacyRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/* ***************************** RADIOLOGY ROUTES ************************************* */}

            <Route path="/app/radiology" element={<RadiologyHome />}>
              <Route index element={<RadiologyDashboard />} />
              {radiologyRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/* ***************************** THEATRE ROUTES ************************************* */}

            <Route path="/app/theatre" element={<TheatreHome />}>
              <Route index element={<TheatreDashboard />} />
              {theatreRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/* ***************************** WARD ROUTES ************************************* */}

            <Route path="/app/ward" element={<WardHome />}>
              <Route index element={<WardDashboard />} />
              {wardRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/**************************MANAGED CARE *************************************** */}
            <Route path="/app/managed-care" element={<ManagedCareHome />}>
              <Route index element={<ManagedCareFrontDashboard />} />
              {managedCareRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/**************************CRM *************************************** */}
            <Route path="/app/crm" element={<CRMHome />}>
              <Route index element={<CrmDashboard />} />
              {crmRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/**************************COMPLAINT *************************************** */}
            <Route path="/app/complaints" element={<NewComplaints />} />
            <Route
              path="/app/complaints/detailComplaints"
              element={<DetailComplaint />}
            />

            {/**************************Referral *************************************** */}
            <Route path="/app/referral" element={<ReferralHome />}>
              <Route index element={<ReferralDashboard />} />
              {referralRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/**************************Communication *************************************** */}
            <Route path="/app/communication">
              <Route index element={<CommunicationDashboard />} />
              {communicationRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/**************************Patient Portal *************************************** */}
            <Route path="/app/patient-portal">
              {patientProfileRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/**************************Market Place *************************************** */}
            <Route path="/app/market-place">
              {marketPlaceRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/**************************Accounting *************************************** */}
            <Route path="/app/accounting">
              <Route index element={<AccountDashboard />} />
              {accountingRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/**************************Immunization *************************************** */}
            <Route path="/app/immunization" element={<ImmunizationHome />}>
              <Route index element={<ImmunizationDashboardComponent />} />
              {immunizationRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>

            {/**************************Blood Bank *************************************** */}
            <Route path="/app/blood-bank" element={<BloodBankHome />}>
              <Route index element={<BloodbankDashboard />} />
              {bloodBankRoutes.map(route => {
                const {path, Component} = route;
                return <Route key={path} path={path} element={<Component />} />;
              })}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
