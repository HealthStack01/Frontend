import {useEffect, useState, useContext} from "react";
import {Route, Routes, useLocation} from "react-router-dom";

import {UserContext, ObjectContext} from "../context";

import AccountHome from "./Accounts/AccountHome";
import ClinicAppointments from "./Appointment/clinicAppointments";
import Login from "./auth";
import IndividualSignup from "./auth/IndividualSignup";
import Signup from "./auth/Signup";
import PrivateOutlet from "./PrivateOutlet";
import Overview from "./app/Overview";
import PharmacyDispense from "./Pharmacy/Dispensary";
import BillLab from "./Laboratory/BillLab";
import BillPrescription from "./Finance/BillPrescription";
import InventoryBillPrescription from "./inventory/BillPrescription";
import PharmacyBillService from "./Pharmacy/BillService";
import PharmacyBillPrescription from "./Pharmacy/BillPrescription";
import BillRadiology from "./Radiology/BillRadiology";
import LaboratoryBillService from "./Laboratory/BillService";
import RadiologyBillService from "./Radiology/BillService";
import InventoryBillService from "./inventory/BillService";

import FinanceBillService from "./Finance/BillService";
import TheatreBillService from "./Theatre/BillService";
import BillTheatre from "./Theatre/BillTheatre";
import CaseDefinition from "./Epidemiology/CaseDefinition";
import ChartofAccount from "./Accounts/ChartofAccount";
import ClientsAppointments from "./Client/Appointments";
import ClinicHome from "./Clinic/ClinicHome";
import Clinic from "./Clinic/Clinic";
import ClinicReport from "./Clinic/ClinicReport";
import ClinicCheckIn from "./Appointment/ClinicWorkflow";
import ClinicSetup from "./Clinic/ClinicSetup";
import ClinicStore from "./Clinic/ClinicStore";
import ClinicCheckin from "./Clinic/CheckIn";
import Collections from "./Finance/Collections";
import EpidemiologyDashboard from "./Epidemiology/DashBoard";

import InventoryDispense from "./inventory/Dispensary";
import Encounter from "./Documentation/Documentation";
import Documentation from "./Documentation/Documentation";
import EpidemiologyHome from "./Epidemiology/EpidemiologyHome";
import Expense from "./Accounts/Expense";
import FacilityAccount from "./Finance/FacilityAccount";
import FacilityHome from "./Admin/FacilityHome";
import Accessibility from "./Admin/Accessibility";
import FinanceHome from "./Finance/FinanceHome";
import FinanceReport from "./Finance/FinanceReport";
import FinanceSetup from "./Finance/FinanceSetup";
import CareTeam from "./Admin/CareTeam";
import Department from "./Admin/Department";
import DeptUnits from "./Admin/DeptUnits";
import Employee from "./Admin/Employee";
import Facility from "./Admin/Facility";
import HSModules from "./Admin/HSModules";
import Bands from "./Admin/Bands";
import Roaster from "./Admin/Roaster";
import Workspace from "./Admin/Workspace";
import WardHome from "./Ward/WardHome";
import Inpatient from "./Ward/Inpatient";
import Admissions from "./Ward/Admissions";
import Discharge from "./Ward/Discharge";
import Location from "./Admin/Location";
import Transfer from "./Ward/Transfer";

import PharmacyTransfer from "./Pharmacy/Transfer";
import useRepository from "../components/hooks/repository";

import FrontDesk, {FrontDeskList} from "./Client/FrontDesk";

import HMOauth from "./Finance/HMOauth";
import InventoryHome from "./inventory/InventoryHome";
import InventoryReport from "./inventory/InventoryReport";
import InventorySetup from "./inventory/InventorySetup";
import PharmacyReport from "./Pharmacy/InventoryReport";
import PharmacyInventoryStore from "./Pharmacy/InventoryStore";

/* import InventorySetup from './Pharmacy/InventorySetup' */
import PharmacyProductEntry from "./Pharmacy/ProductEntry";
import PharmacyProductExit from "./Pharmacy/ProductExit";
import InventoryStore from "./inventory/InventoryStore";
import Journal from "./Accounts/Journal";
import LaboratoryHome from "./Laboratory/LaboratoryHome";
import LaboratoryPayment from "./Laboratory/LaboratoryPayment";
import LabReport from "./Laboratory/LabReport";
import Labs from "./Laboratory/Labs"; //, { StoreList, StoreListStandalone }
import Ledgers from "./Accounts/Ledgers";
import Map from "./Epidemiology/Map";
import Patients from "./Client/Client";
import Payment from "./Finance/Payment";
import ClientPayment from "./Client/Payment";
import Pharmacy, {
  PharamcyList,
  PharmacyListStandalone,
} from "./Pharmacy/Pharmacy";
import PharmacyHome from "./Pharmacy/PharmacyHome";
import PharmacyInventoryReport from "./Pharmacy/InventoryReport";
//import InventoryPayment from './inventory/PharmacyPayment'
import PharmacyPayment from "./Pharmacy/PharmacyPayment";
import InventoryPayment from "./inventory/InventoryPayment";
import FinacneProductEntry from "./Finance/Services";
import InventoryProductEntry from "./inventory/ProductEntry";
import FinanceProductExit from "./Finance/ProductExit";
import InventoryProductExit from "./inventory/ProductExit";
import FinanceProducts from "./Finance/Products";
import InventoryProducts from "./inventory/Products";
import PharmacyProducts from "./Pharmacy/Products";

import RadAppointments from "./Appointment/RadAppointments";
import RadCheckedin from "./Appointment/Radworkflow";
import Radiology from "./Radiology/Radiologys"; //, { StoreList, StoreListStandalone }
import RadiologyHome from "./Radiology/RadiologyHome";
import RadiologyPayment from "./Radiology/RadiologyPayment";
import RadDetails from "./Radiology/RadDetails";
import RadiologyReport from "./Radiology/RadiologyReport";
import Report from "./Accounts/Report";
import Services from "./Finance/Services";
import EpidemiologySignals from "./Epidemiology/Signals"; //, { StoreList, StoreListStandalone }
/* import Store, { StoreList, StoreListStandalone } from './Finance/Store' */
/* import Store, { StoreList, StoreListStandalone } from './Finance/Store'  */

import Theatre from "./Theatre/Theatres"; //, /* { StoreList, StoreListStandalone } */
import TheatreAppointments from "./Appointment/TheatreAppointments";
//import TheatreCheckedin from './Appointment/TheatreWorkflow';
import TheatreHome from "./Theatre/TheatreHome";
import TheatrePayment from "./Theatre/TheatrePayment";
import TheatreReport from "./Theatre/TheatreReport";

import {Models} from "./app/Constants";

import Store, {StoreList, StoreListStandalone} from "./inventory/Store";

import TheatreCheckedin from "./Theatre/TheatreCheckedin";

//import ClientPayment from "./Client/Payment";
import ClientHome from "./Client/ClientHome";
import TheatreCheckIn from "./Appointment/TheatreWorkflow";
import GeneralAppointments from "./Appointment/generalAppointment";
// import ClientsAppointments from "./Clients/Appointments";
//import ClientsAppointments from "./Client/Appointments";

//importing dashboardModules
import ClientDashboard from "./dashBoardUiComponent/@modules/ClientDashboard";
import ClinicDashboard from "./dashBoardUiComponent/@modules/ClinicDashboard";
import LandingPageDashboard from "./dashBoardUiComponent/@modules/LandingPageDashboard";
import WardDashboard from "./dashBoardUiComponent/@modules/WardDashboard";
import PharmacyDashboard from "./dashBoardUiComponent/@modules/PharmacyDashboard";
import InventoryDashboard from "./dashBoardUiComponent/@modules/InventoryDashboard";
import FinanceDashboard from "./dashBoardUiComponent/@modules/FinanceDashboard";
import LaboratoryDashboard from "./dashBoardUiComponent/@modules/LaboratoryDashboard";
import ForgotPassword from "./auth/ForgotPassword";
import CreatePassword from "./auth/CreatePassword";
import ManagedCareHome from "./ManagedCare/ManagedCareHome";
import Policy from "./ManagedCare/Policy";
import Beneficiary from "./ManagedCare/Beneficiary";
import ReferralsCollections from "./ManagedCare/Referral";
import TarrifList from "./ManagedCare/Tarrifs";
import HealthPlan from "./ManagedCare/HealthPlan";
import Referral from "./ManagedCare/Referral";
import Provider from "./ManagedCare/Providers";
import Product from "./ManagedCare/UserManagement";
import ProductEntry from "./ManagedCare/HealthPlan";
import HiaOrganizationClient from "./ManagedCare/HIA";
import CorporateClient from "./ManagedCare/Corporate";
import Claims from "./ManagedCare/Claims";
import FundsManagement from "./ManagedCare/FundsManagement";

import ManagedCareFrontDashboard from "./dashBoardUiComponent/@modules/ManagedCareFrontDashboard";
import ProviderOrganizationClient from "./ManagedCare/Providers";

// import DispensaryMain from "./ManagedCare/Checkin";
import ClientBilledPrescription from "./ManagedCare/Claims";
import {OrgList} from "./ManagedCare/OrgClientList";

import ComplaintsInventoryReport from "./ManagedCare/Complaints";
import ReferralHome from "./Referral/ReferralHome";

import PreAuth from "./ManagedCare/PreAuth";

// import Provider from "./ManagedCare/Providers";

import CRMHome from "./CRM/CrmHome";
import Leads from "./CRM/Lead";
import Proposal from "./CRM/Proposals";
import Invoice from "./CRM/Invoice";
import SLA from "./CRM/SLA";
import CrmAppointment from "./CRM/Appointment";
import Deal from "./CRM/Deal";
import Complaint from "./Complaints/Complaint";
import ImmunizationHome from "./Immunization/ImmunizationHome";
import VaccineProfile from "./Immunization/VaccineProfile";
import BloodBankInventory from "./Bloodbank/Inventory";
import BloodBankHome from "./Bloodbank/BloodBankHome";
import PremiumPayment from "./ManagedCare/PremiumPayment";
import BloodBankAppointments from "./Appointment/bloodBankAppoinment";
import ImmunizationAppointments from "./Appointment/immunizationAppoinment";
import ImmunizationCheckIn from "./Immunization/Checkin";
import ReferralIncoming from "./Appointment/referralWorkflow";
import BloodBankLab from "./Bloodbank/Lab";
import ImmunizationInventory from "./Immunization/Inventory";
import PageLoaderComponent from "../components/page-loader/page-loader";
import AccountDashboard from "./dashBoardUiComponent/@modules/AccountDashboard";
import AdminDashboard from "./dashBoardUiComponent/@modules/AdminDashboard";
import RadiologyDashboard from "./dashBoardUiComponent/@modules/RadiologyDashboard";
import TheatreDashboard from "./dashBoardUiComponent/@modules/TheatreDashboard";
import CrmDashboard from "./dashBoardUiComponent/@modules/CrmDashboard";
import ReferralDashboard from "./dashBoardUiComponent/@modules/ReferralDashboard";
import CommunicationDashboard from "./dashBoardUiComponent/@modules/CommunicationDashboard";
import ImmunizationDashboardComponent from "./dashBoardUiComponent/@modules/ImmunizationDashboard";
import BloodbankDashboard from "./dashBoardUiComponent/@modules/BloodbankDashboard";
import OrganizationClient from "./ManagedCare/OrganizationClient";
import ProviderPayment from "./ManagedCare/ProviderPayment";

import ComplaintDetails from "./ManagedCare/ComplaintDetails";

import WalletOTP from "./PouchiiWallet/walletOtp";
import CheckIn from "./ManagedCare/Checkin";

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
  const {setLocationType} = useRepository(Models.LOCATION);

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
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupindividual" element={<IndividualSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/app" element={<PrivateOutlet />}>
          <Route index element={<Overview />} />
          <Route
            path="/app/overview/dashboard"
            element={<LandingPageDashboard />}
          />

          <Route path="/app/documentation" element={<Documentation />} />

          {/* ***************************** ACCOUNTS ROUTES ************************************* */}

          <Route path="/app/accounts" element={<AccountHome />}>
            <Route indexelement={<AccountDashboard />} />

            <Route path="/app/accounts/payments" element={<Payment />} />
            <Route path="/app/accounts/expenses" element={<Expense />} />
            <Route path="/app/accounts/reports" element={<Report />} />
            <Route path="/app/accounts/journals" element={<Journal />} />
            <Route path="/app/accounts/ledgers" element={<Ledgers />} />
            <Route
              path="/app/accounts/chartsaccount"
              element={<ChartofAccount />}
            />
          </Route>

          <Route
            path="/app/global-appointment"
            element={<GeneralAppointments />}
          />

          {/* ***************************** Documetation ROUTES ************************************* */}
          <Route
            path="/app/blood-bank/documentation"
            element={<Documentation />}
          />
          <Route path="/app/crm/documentation" element={<Documentation />} />
          <Route
            path="/app/general/documentation"
            element={<Documentation />}
          />
          <Route
            path="/app/immunization/documentation"
            element={<Documentation />}
          />
          <Route
            path="/app/labour-ward/documentation"
            element={<Documentation />}
          />
          <Route
            path="/app/pharmacy/documentation"
            element={<Documentation />}
          />
          <Route
            path="/app/radiology/documentation"
            element={<Documentation />}
          />
          <Route
            path="/app/referral/documentation"
            element={<Documentation />}
          />
          <Route
            path="/app/theatre/documentation"
            element={<Documentation />}
          />
          <Route
            path="/app/beneficiary/documentation"
            element={<Documentation />}
          />

          {/* ***************************** CLINICS ROUTES ************************************* */}

          <Route path="/app/clinic" element={<ClinicHome />}>
            <Route index element={<ClinicDashboard />} />

            <Route path="/app/clinic/clinicsetup" element={<ClinicSetup />} />
            <Route
              path="/app/clinic/appointments"
              element={<ClinicAppointments />}
            />
            <Route path="/app/clinic/checkin" element={<ClinicCheckIn />} />
            <Route path="/app/clinic/clinicstore" element={<ClinicStore />} />
            <Route path="/app/clinic/payments" element={<Payment />} />
            <Route path="/app/clinic" element={<ClinicHome />} />
            <Route path="/app/clinic/clinicsetup" element={<ClinicSetup />} />
            <Route
              path="/app/clinic/appointments"
              element={<ClinicAppointments />}
            />
            <Route path="/app/clinic/clinicstore" element={<ClinicStore />} />
            <Route
              path="/app/clinic/documentation"
              element={<Documentation />}
            />
            <Route path="/app/clinic/patients" element={<Patients />} />
            <Route
              path="/app/clinic/clinicreports"
              element={<ClinicReport />}
            />
            <Route path="/app/clinic/clinics" element={<Clinic />} />
            <Route path="/app/clinic/checkin" element={<ClinicCheckin />} />
            <Route path="/app/clinic/dashboard" element={<ClinicDashboard />} />
          </Route>

          {/* ***************************** CLIENTS ROUTES ************************************* */}
          <Route path="/app/clients/" element={<ClientHome />}>
            <Route index element={<ClientDashboard />} />
            <Route
              path="/app/clients/documentation"
              element={<Documentation />}
            />
            <Route path="/app/clients/clients" element={<Patients />} />
            <Route
              path="/app/clients/clinicreports"
              element={<ClinicReport />}
            />
            <Route path="/app/clients/frontdesk" element={<FrontDesk />} />
            <Route path="/app/clients/payment" element={<ClientPayment />} />
            {/* <Route
              path="/app/clients/appointments"
              element={<ClientsAppointments />}
            />{' '} */}
            <Route
              path="/app/clients/appointments"
              element={<ClientsAppointments />}
            />
            {""} <Route path="/app/clients/clients" element={<Patients />} />
            <Route
              path="/app/clients/dashboard"
              element={<ClientDashboard />}
            />
          </Route>
          {/* ***************************** EPIDEMIOLOGY ROUTES ************************************* */}

          <Route path="/app/epidemiology" element={<EpidemiologyHome />}>
            <Route index element={<EpidemiologyDashboard />} />
            <Route path="/app/epidemiology/map" element={<Map />} />

            <Route
              path="/app/epidemiology/dashboard"
              element={<EpidemiologyDashboard />}
            />

            <Route
              path="/app/epidemiology/casedefinition"
              element={<CaseDefinition />}
            />
            <Route
              path="/app/epidemiology/communication"
              element={<BillLab />}
            />
            <Route
              path="/app/epidemiology/signal"
              element={<EpidemiologySignals />}
            />
          </Route>
          {/* ***************************** ADMIN ROUTES ************************************* */}

          <Route path="/app/admin" element={<FacilityHome />}>
            <Route index element={<AdminDashboard />} />
            <Route
              path="/app/admin/accessibility"
              element={<Accessibility />}
            />
            <Route path="/app/admin/careteam" element={<CareTeam />} />
            <Route path="/app/admin/department" element={<Department />} />
            <Route path="/app/admin/dept-unit" element={<DeptUnits />} />
            <Route path="/app/admin/employees" element={<Employee />} />
            <Route path="/app/admin/facility" element={<Facility />} />
            <Route path="/app/admin/hsmodules" element={<HSModules />} />
            <Route path="/app/admin/location" element={<Location />} />
            <Route path="/app/admin/bands" element={<Bands />} />
            <Route path="/app/admin/roaster" element={<Roaster />} />
            <Route path="/app/admin/Workspace" element={<Workspace />} />
            <Route path="/app/admin/clinicsetup" element={<ClinicSetup />} />
          </Route>

          {/* ***************************** FINANCE ROUTES ************************************* */}

          <Route path="/app/finance" element={<FinanceHome />}>
            <Route index element={<FinanceDashboard />} />
            <Route path="/app/finance/payment" element={<Payment />} />
            <Route path="/app/finance/collections" element={<Collections />} />
            <Route path="/app/finance/services" element={<Services />} />
            <Route
              path="/app/finance/billservices"
              element={<FinanceBillService />}
            />
            <Route path="/app/finance/hmoauthorization" element={<HMOauth />} />
            <Route path="/app/finance/revenue" element={<FacilityAccount />} />
            <Route path="/app/finance/location" element={<Store />} />
            <Route
              path="/app/finance/dashboard"
              element={<FinanceDashboard />}
            />
          </Route>

          {/* ***************************** INVENTORY ROUTES ************************************* */}

          <Route path="/app/inventory" element={<InventoryHome />}>
            <Route index element={<InventoryDashboard />} />
            <Route
              path="/app/inventory/dispensary"
              element={<InventoryDispense />}
            />
            <Route
              path="/app/inventory/billprescription"
              element={<InventoryBillPrescription />}
            />
            <Route
              path="/app/inventory/inv-admin"
              element={<InventorySetup />}
            />
            <Route
              path="/app/inventory/storeinventory"
              element={<InventoryStore />}
            />
            <Route
              path="/app/inventory/productentry"
              element={<InventoryProductEntry />}
            />
            <Route
              path="/app/inventory/issueout"
              element={<InventoryProductExit />}
            />
            <Route
              path="/app/inventory/inv-products"
              element={<InventoryProducts />}
            />
            <Route
              path="/app/inventory/billservice"
              element={<InventoryBillService />}
            />
            <Route
              path="/app/inventory/inv-reports"
              element={<InventoryReport />}
            />

            <Route path="/app/inventory/inv-stores" element={<Store />} />
            <Route
              path="/app/inventory/payment"
              element={<InventoryPayment />}
            />
            <Route
              path="/app/inventory/dashboard"
              element={<InventoryDashboard />}
            />
          </Route>

          {/* ***************************** LABS ROUTES ************************************* */}

          <Route path="/app/laboratory" element={<LaboratoryHome />}>
            <Route index element={<LaboratoryDashboard />} />
            <Route
              path="/app/laboratory/billclient"
              element={<LaboratoryBillService />}
            />
            <Route path="/app/laboratory/labresult" element={<LabReport />} />
            <Route path="/app/laboratory/billlaborders" element={<BillLab />} />
            <Route path="/app/laboratory/labs" element={<Labs />} />
            <Route
              path="/app/laboratory/payment"
              element={<LaboratoryPayment />}
            />
            <Route
              path="/app/laboratory/dashboard"
              element={<LaboratoryDashboard />}
            />
          </Route>

          {/* ***************************** PHARMACY ROUTES ************************************* */}

          <Route path="/app/pharmacy" element={<PharmacyHome />}>
            <Route index element={<PharmacyDashboard />} />
            <Route
              path="/app/pharmacy/billclient"
              element={<PharmacyBillService />}
            />
            <Route
              path="/app/pharmacy/billprescription"
              element={<PharmacyBillPrescription />}
            />
            <Route path="/app/pharmacy/payment" element={<PharmacyPayment />} />
            <Route
              path="/app/pharmacy/dispensary"
              element={<PharmacyDispense />}
            />
            <Route
              path="/app/pharmacy/storeinventory"
              element={<PharmacyInventoryStore />}
            />
            <Route
              path="/app/pharmacy/productentry"
              element={<PharmacyProductEntry />}
            />
            <Route
              path="/app/pharmacy/issueout"
              element={<PharmacyProductExit />}
            />
            <Route
              path="/app/pharmacy/requisition"
              element={<PharmacyInventoryReport />}
            />
            <Route
              path="/app/pharmacy/transfer"
              element={<PharmacyTransfer />}
            />
            <Route
              path="/app/pharmacy/dashboard"
              element={<PharmacyDashboard />}
            />
          </Route>

          {/* ***************************** RADIOLOGY ROUTES ************************************* */}

          <Route path="/app/radiology" element={<RadiologyHome />}>
            <Route index element={<RadiologyDashboard />} />
            <Route path="/app/radiology/checkedin" element={<RadCheckedin />} />
            <Route
              path="/app/radiology/appointments"
              element={<RadAppointments />}
            />
            <Route
              path="/app/radiology/billservice"
              element={<RadiologyBillService />}
            />
            <Route
              path="/app/radiology/radiology-result"
              element={<RadiologyReport />}
            />
            <Route
              path="/app/radiology/radiology-bill"
              element={<BillRadiology />}
            />
            <Route path="/app/radiology/radiology" element={<Radiology />} />
            <Route
              path="/app/radiology/payment"
              element={<RadiologyPayment />}
            />
            <Route path="/app/radiology/rad-details" element={<RadDetails />} />
          </Route>

          {/* ***************************** THEATRE ROUTES ************************************* */}

          <Route path="/app/theatre" element={<TheatreHome />}>
            <Route index element={<TheatreDashboard />} />
            <Route
              path="/app/theatre/theatre-checkedin"
              element={<TheatreCheckIn />}
            />
            <Route
              path="/app/theatre/theatre-appointments"
              element={<TheatreAppointments />}
            />
            <Route
              path="/app/theatre/billservice"
              element={<TheatreBillService />}
            />
            <Route
              path="/app/theatre/theatre-result"
              element={<TheatreReport />}
            />
            <Route path="/app/theatre/theatre-bill" element={<BillTheatre />} />
            <Route path="/app/theatre/theatre" element={<Theatre />} />
            <Route
              path="/app/theatre/theatre-payment"
              element={<TheatrePayment />}
            />
            <Route
              path="/app/theatre/documentation"
              element={<Documentation />}
            />
          </Route>

          {/* ***************************** WARD ROUTES ************************************* */}

          {/*  <ward></ward> */}
          <Route path="/app/ward" element={<WardHome />}>
            <Route index element={<WardDashboard />} />

            <Route path="/app/ward/transfer" element={<Transfer />} />
            <Route path="/app/ward/inpatients" element={<Inpatient />} />
            <Route path="/app/ward/admissions" element={<Admissions />} />
            <Route path="/app/ward/documentation" element={<Documentation />} />
            <Route path="/app/ward/discharge" element={<Discharge />} />
            <Route path="/app/ward/dashboard" element={<WardDashboard />} />
          </Route>

          {/**************************MANAGED CARE *************************************** */}
          <Route path="/app/managed-care" element={<ManagedCareHome />}>
            <Route index element={<ManagedCareFrontDashboard />} />
            <Route path="/app/managed-care/policy" element={<Policy />} />
            <Route
              path="/app/managed-care/beneficiary"
              element={<Beneficiary />}
            />
            {/* <Route
              path="/app/managed-care/checkin"
              element={<DispensaryMain />}
            /> */}
            <Route path="/app/managed-care/checkin" element={<CheckIn />} />
            <Route
              path="/app/managed-care/provider"
              element={<ProviderOrganizationClient />}
            />
            <Route
              path="/app/managed-care/corporate"
              element={<CorporateClient />}
            />
            <Route
              path="/app/managed-care/HIA"
              element={<HiaOrganizationClient />}
            />
            <Route
              path="/app/managed-care/dashboard"
              element={<ManagedCareFrontDashboard />}
            />
            <Route path="/app/managed-care/referrals" element={<Referral />} />
            <Route path="/app/managed-care/claims" element={<Claims />} />
            <Route
              path="/app/managed-care/organisation"
              element={<OrganizationClient />}
            />
            <Route
              path="/app/managed-care/complaints"
              element={<ComplaintsInventoryReport />}
            />
            <Route
              path="/app/managed-care/preauthorization"
              element={<PreAuth />}
            />

            <Route path="/app/managed-care/tariff" element={<TarrifList />} />

            <Route path="/app/managed-care/tarrifs" />
            <Route
              path="/app/managed-care/complaintDetails"
              element={<ComplaintDetails />}
            />

            <Route
              path="/app/managed-care/providerpayment"
              element={<ProviderPayment />}
            />

            <Route
              path="/app/managed-care/fundmanagement"
              element={<FundsManagement />}
            />

            <Route path="/app/managed-care/usermgt" />
            <Route path="/app/managed-care/report" />
            <Route
              path="/app/managed-care/healthplan"
              element={<HealthPlan />}
            />
            <Route
              path="/app/managed-care/premiums"
              element={<PremiumPayment />}
            />
          </Route>
          {/**************************CRM *************************************** */}
          <Route path="/app/crm" element={<CRMHome />}>
            <Route index element={<CrmDashboard />} />

            <Route path="/app/crm/lead" element={<Leads />} />
            <Route path="/app/crm/proposal" element={<Proposal />} />
            <Route path="/app/crm/invoice" element={<Invoice />} />
            <Route path="/app/crm/SLA" element={<SLA />} />
            <Route path="/app/crm/appointment" element={<CrmAppointment />} />
            <Route path="/app/crm/deal" element={<Deal />} />
            <Route path="/app/crm/dashboard" element={<CrmDashboard />} />
          </Route>

          {/**************************COMPLAINT *************************************** */}
          <Route
            path="/app/complaints/complaints-complaints"
            element={<Complaint />}
          >
            {/* <Route path="/app/complaints/complaints-complaints" element={<Leads />} /> */}
            {/* <Route path="/app/crm/proposal" element={<Proposal />} />
            <Route path="/app/crm/invoice" element={<Invoice />} />
            <Route path="/app/crm/SLA" element={<SLA />} />
            <Route path="/app/crm/appointment" element={<CrmAppointment />} />
            <Route path="/app/crm/deal" element={<Deal />} />
            <Route path="/app/crm/dashboard" /> */}
          </Route>

          {/**************************Referral *************************************** */}
          <Route path="/app/referral" element={<ReferralHome />}>
            <Route index element={<ReferralDashboard />} />
            <Route
              path="/app/referral/dashboard"
              element={<ReferralDashboard />}
            />

            <Route
              path="/app/referral/incoming"
              element={<ReferralIncoming />}
            />
            {/* <Route path="/app/referral/outgoing" element={<Outgoing />} /> */}
            <Route path="/app/referral/account" />
            <Route path="/app/referral/setting" />
            <Route path="/app/referral/dashboard" />
          </Route>

          {/**************************Communication *************************************** */}
          <Route path="/app/communication">
            <Route index element={<CommunicationDashboard />} />
            <Route
              path="/app/communication/dashboard"
              element={<CommunicationDashboard />}
            />

            <Route path="/app/communication/whatsapp" />
            <Route path="/app/communication/sms" />
            <Route path="/app/communication/ussd" />
            <Route path="/app/communication/email" />
            <Route path="/app/communication/ivr" />
            <Route path="/app/communication/dashboard" />
          </Route>

          {/**************************Patient Portal *************************************** */}
          <Route path="/app/patient-portal">
            <Route path="/app/patient-portal/profile" />
            <Route path="/app/patient-portal/view" />
            <Route path="/app/patient-portal/buy" />
            <Route path="/app/patient-portal/search" />
            <Route path="/app/patient-portal/read" />
            <Route path="/app/patient-portal/chat" />
            <Route path="/app/patient-portal/dashboard" />
          </Route>

          {/**************************Accounting *************************************** */}
          <Route path="/app/accounting">
            <Route index element={<AccountDashboard />} />
            <Route
              path="/app/accounting/dashboard"
              element={<AccountDashboard />}
            />

            <Route path="/app/accounting/chart-of-account" />
            <Route path="/app/accounting/account" />
            <Route path="/app/accounting/payment" />
            <Route path="/app/accounting/expenses" />
            <Route path="/app/accounting/journal" />
            <Route path="/app/accounting/report" />
          </Route>

          {/**************************Immunization *************************************** */}
          <Route path="/app/immunization" element={<ImmunizationHome />}>
            <Route index element={<ImmunizationDashboardComponent />} />
            <Route
              path="/app/immunization/dashboard"
              element={<ImmunizationDashboardComponent />}
            />
            <Route path="/app/immunization/schedule" />
            <Route
              path="/app/immunization/vaccineprofile"
              element={<VaccineProfile />}
            />
            <Route
              path="/app/immunization/appointment"
              element={<ImmunizationAppointments />}
            />
            <Route
              path="/app/immunization/checkin-out"
              element={<ImmunizationCheckIn />}
            />
            <Route path="/app/immunization/report" />
            <Route
              path="/app/immunization/inventory"
              element={<ImmunizationInventory />}
            />
          </Route>

          {/**************************Blood Bank *************************************** */}
          <Route path="/app/blood-bank" element={<BloodBankHome />}>
            <Route index element={<BloodbankDashboard />} />
            <Route
              path="/app/blood-bank/dashboard"
              element={<BloodbankDashboard />}
            />
            <Route
              path="/app/blood-bank/inventory"
              element={<BloodBankInventory />}
            />
            <Route
              path="/app/blood-bank/appointment"
              element={<BloodBankAppointments />}
            />
            <Route path="/app/blood-bank/lab" element={<BloodBankLab />} />
            <Route
              path="/app/blood-bank/dashboard"
              element={<BloodbankDashboard />}
            />
          </Route>
        </Route>
        {/**************************Pouchii Wallet *************************************** */}
        <Route path="/verify-otp" element={<WalletOTP />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
