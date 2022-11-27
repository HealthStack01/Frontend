import {useEffect, useState, useContext, lazy, Suspense} from "react";
import {Route, Routes, useLocation} from "react-router-dom";

import {UserContext, ObjectContext} from "../context";
//const AboutUs = React.lazy(() => import("./About"));

const AccountHome = lazy(() => import("./Accounts/AccountHome"));
const ClinicAppointments = lazy(() =>
  import("./Appointment/clinicAppointments")
);

import Login from "./auth";
import IndividualSignup from "./auth/IndividualSignup";
import Signup from "./auth/Signup";
import PrivateOutlet from "./PrivateOutlet";
import Overview from "./app/Overview";

const PharmacyDispense = lazy(() => import("./Pharmacy/Dispensary"));
const BillLab = lazy(() => import("./Laboratory/BillLab"));

const InventoryBillPrescription = lazy(() =>
  import("./inventory/BillPrescription")
);
const PharmacyBillService = lazy(() => import("./Pharmacy/BillService"));
const PharmacyBillPrescription = lazy(() =>
  import("./Pharmacy/BillPrescription")
);
const BillRadiology = lazy(() => import("./Radiology/BillRadiology"));
const LaboratoryBillService = lazy(() => import("./Laboratory/BillService"));
const RadiologyBillService = lazy(() => import("./Radiology/BillService"));
const InventoryBillService = lazy(() => import("./inventory/BillService"));

const FinanceBillService = lazy(() => import("./Finance/BillService"));
const TheatreBillService = lazy(() => import("./Theatre/BillService"));
const BillTheatre = lazy(() => import("./Theatre/BillTheatre"));
const CaseDefinition = lazy(() => import("./Epidemiology/CaseDefinition"));
const ChartofAccount = lazy(() => import("./Accounts/ChartofAccount"));
const ClientsAppointments = lazy(() => import("./Client/Appointments"));
const ClinicHome = lazy(() => import("./Clinic/ClinicHome"));
const Clinic = lazy(() => import("./Clinic/Clinic"));
const ClinicReport = lazy(() => import("./Clinic/ClinicReport"));
const ClinicCheckIn = lazy(() => import("./Appointment/ClinicWorkflow"));
const ClinicSetup = lazy(() => import("./Clinic/ClinicSetup"));
const ClinicStore = lazy(() => import("./Clinic/ClinicStore"));
const ClinicCheckin = lazy(() => import("./Clinic/CheckIn"));
const Collections = lazy(() => import("./Finance/Collections"));
const EpidemiologyDashboard = lazy(() => import("./Epidemiology/DashBoard"));

const InventoryDispense = lazy(() => import("./inventory/Dispensary"));
const Documentation = lazy(() => import("./Documentation/Documentation"));
const EpidemiologyHome = lazy(() => import("./Epidemiology/EpidemiologyHome"));
const Expense = lazy(() => import("./Accounts/Expense"));
const FacilityAccount = lazy(() => import("./Finance/FacilityAccount"));
const FacilityHome = lazy(() => import("./Admin/FacilityHome"));
const Accessibility = lazy(() => import("./Admin/Accessibility"));
const FinanceHome = lazy(() => import("./Finance/FinanceHome"));
const FinanceReport = lazy(() => import("./Finance/FinanceReport"));
const FinanceSetup = lazy(() => import("./Finance/FinanceSetup"));
const CareTeam = lazy(() => import("./Admin/CareTeam"));
const Department = lazy(() => import("./Admin/Department"));
const DeptUnits = lazy(() => import("./Admin/DeptUnits"));
const Employee = lazy(() => import("./Admin/Employee"));
const Facility = lazy(() => import("./Admin/Facility"));
const HSModules = lazy(() => import("./Admin/HSModules"));
const Bands = lazy(() => import("./Admin/Bands"));
const Roaster = lazy(() => import("./Admin/Roaster"));
const Workspace = lazy(() => import("./Admin/Workspace"));
const WardHome = lazy(() => import("./Ward/WardHome"));
const Inpatient = lazy(() => import("./Ward/Inpatient"));
const Admissions = lazy(() => import("./Ward/Admissions"));
const Discharge = lazy(() => import("./Ward/Discharge"));
const Location = lazy(() => import("./Admin/Location"));
const Transfer = lazy(() => import("./Ward/Transfer"));

const PharmacyTransfer = lazy(() => import("./Pharmacy/Transfer"));
const useRepository = lazy(() => import("../components/hooks/repository"));

const FrontDesk = lazy(() => import("./Client/FrontDesk"));

const HMOauth = lazy(() => import("./Finance/HMOauth"));
const InventoryHome = lazy(() => import("./inventory/InventoryHome"));
const InventoryReport = lazy(() => import("./inventory/InventoryReport"));
const InventorySetup = lazy(() => import("./inventory/InventorySetup"));
const PharmacyReport = lazy(() => import("./Pharmacy/InventoryReport"));
const PharmacyInventoryStore = lazy(() => import("./Pharmacy/InventoryStore"));

const PharmacyProductEntry = lazy(() => import("./Pharmacy/ProductEntry"));
const PharmacyProductExit = lazy(() => import("./Pharmacy/ProductExit"));
const InventoryStore = lazy(() => import("./inventory/InventoryStore"));
const Journal = lazy(() => import("./Accounts/Journal"));
const LaboratoryHome = lazy(() => import("./Laboratory/LaboratoryHome"));
const LaboratoryPayment = lazy(() => import("./Laboratory/LaboratoryPayment"));
const LabReport = lazy(() => import("./Laboratory/LabReport"));
const Labs = lazy(() => import("./Laboratory/Labs"));
const Ledgers = lazy(() => import("./Accounts/Ledgers"));
const Map = lazy(() => import("./Epidemiology/Map"));
const Patients = lazy(() => import("./Client/Client"));
const Payment = lazy(() => import("./Finance/Payment"));
const ClientPayment = lazy(() => import("./Client/Payment"));

const PharmacyHome = lazy(() => import("./Pharmacy/PharmacyHome"));
const PharmacyInventoryReport = lazy(() =>
  import("./Pharmacy/InventoryReport")
);

const PharmacyPayment = lazy(() => import("./Pharmacy/PharmacyPayment"));
const InventoryPayment = lazy(() => import("./inventory/InventoryPayment"));
const FinacneProductEntry = lazy(() => import("./Finance/Services"));
const InventoryProductEntry = lazy(() => import("./inventory/ProductEntry"));
const FinanceProductExit = lazy(() => import("./Finance/ProductExit"));
const InventoryProductExit = lazy(() => import("./inventory/ProductExit"));
const FinanceProducts = lazy(() => import("./Finance/Products"));
const InventoryProducts = lazy(() => import("./inventory/Products"));
const PharmacyProducts = lazy(() => import("./Pharmacy/Products"));

const RadAppointments = lazy(() => import("./Appointment/RadAppointments"));
const RadCheckedin = lazy(() => import("./Appointment/Radworkflow"));
const Radiology = lazy(() => import("./Radiology/Radiologys"));
const RadiologyHome = lazy(() => import("./Radiology/RadiologyHome"));
const RadiologyPayment = lazy(() => import("./Radiology/RadiologyPayment"));
const RadDetails = lazy(() => import("./Radiology/RadDetails"));
const RadiologyReport = lazy(() => import("./Radiology/RadiologyReport"));
const Report = lazy(() => import("./Accounts/Report"));
const Services = lazy(() => import("./Finance/Services"));
const EpidemiologySignals = lazy(() => import("./Epidemiology/Signals"));

const Theatre = lazy(() => import("./Theatre/Theatres"));
const TheatreAppointments = lazy(() =>
  import("./Appointment/TheatreAppointments")
);
//import TheatreCheckedin = lazy( () => import( './Appointment/TheatreWorkflow';
const TheatreHome = lazy(() => import("./Theatre/TheatreHome"));
const TheatrePayment = lazy(() => import("./Theatre/TheatrePayment"));
const TheatreReport = lazy(() => import("./Theatre/TheatreReport"));

const {Models} = lazy(() => import("./app/Constants"));

const Store = lazy(() => import("./inventory/Store"));

const ClientHome = lazy(() => import("./Client/ClientHome"));
const TheatreCheckIn = lazy(() => import("./Appointment/TheatreWorkflow"));
const GeneralAppointments = lazy(() =>
  import("./Appointment/generalAppointment")
);

const ClientDashboard = lazy(() =>
  import("./dashBoardUiComponent/@modules/ClientDashboard")
);
const ClinicDashboard = lazy(() =>
  import("./dashBoardUiComponent/@modules/ClinicDashboard")
);
const LandingPageDashboard = lazy(() =>
  import("./dashBoardUiComponent/@modules/LandingPageDashboard")
);
const WardDashboard = lazy(() =>
  import("./dashBoardUiComponent/@modules/WardDashboard")
);
const PharmacyDashboard = lazy(() =>
  import("./dashBoardUiComponent/@modules/PharmacyDashboard")
);
const InventoryDashboard = lazy(() =>
  import("./dashBoardUiComponent/@modules/InventoryDashboard")
);
const FinanceDashboard = lazy(() =>
  import("./dashBoardUiComponent/@modules/FinanceDashboard")
);
const LaboratoryDashboard = lazy(() =>
  import("./dashBoardUiComponent/@modules/LaboratoryDashboard")
);
const ForgotPassword = lazy(() => import("./auth/ForgotPassword"));
const CreatePassword = lazy(() => import("./auth/CreatePassword"));
const ManagedCareHome = lazy(() => import("./ManagedCare/ManagedCareHome"));
const Policy = lazy(() => import("./ManagedCare/Policy"));
const Beneficiary = lazy(() => import("./ManagedCare/Beneficiary"));
const ReferralsCollections = lazy(() => import("./ManagedCare/Referral"));
const TarrifList = lazy(() => import("./ManagedCare/Tarrifs"));
const HealthPlan = lazy(() => import("./ManagedCare/HealthPlan"));
const Referral = lazy(() => import("./ManagedCare/Referral"));
const Provider = lazy(() => import("./ManagedCare/Providers"));
const Product = lazy(() => import("./ManagedCare/UserManagement"));
const ProductEntry = lazy(() => import("./ManagedCare/HealthPlan"));
const HiaOrganizationClient = lazy(() => import("./ManagedCare/HIA"));
const CorporateClient = lazy(() => import("./ManagedCare/Corporate"));
const Claims = lazy(() => import("./ManagedCare/Claims"));
const FundsManagement = lazy(() => import("./ManagedCare/FundsManagement"));

const ManagedCareFrontDashboard = lazy(() =>
  import("./dashBoardUiComponent/@modules/ManagedCareFrontDashboard")
);
const ProviderOrganizationClient = lazy(() =>
  import("./ManagedCare/Providers")
);

const ComplaintsInventoryReport = lazy(() =>
  import("./ManagedCare/Complaints")
);
const ReferralHome = lazy(() => import("./Referral/ReferralHome"));

const PreAuth = lazy(() => import("./ManagedCare/PreAuth"));

const CRMHome = lazy(() => import("./CRM/CrmHome"));
const Leads = lazy(() => import("./CRM/Lead"));
const Proposal = lazy(() => import("./CRM/Proposals"));
const Invoice = lazy(() => import("./CRM/Invoice"));
const SLA = lazy(() => import("./CRM/SLA"));
const CrmAppointment = lazy(() => import("./CRM/Appointment"));
const Deal = lazy(() => import("./CRM/Deal"));
const Complaint = lazy(() => import("./Complaints/Complaint"));
const ImmunizationHome = lazy(() => import("./Immunization/ImmunizationHome"));
const VaccineProfile = lazy(() => import("./Immunization/VaccineProfile"));
const BloodBankInventory = lazy(() => import("./Bloodbank/Inventory"));
const BloodBankHome = lazy(() => import("./Bloodbank/BloodBankHome"));
const PremiumPayment = lazy(() => import("./ManagedCare/PremiumPayment"));
const BloodBankAppointments = lazy(() =>
  import("./Appointment/bloodBankAppoinment")
);
const ImmunizationAppointments = lazy(() =>
  import("./Appointment/immunizationAppoinment")
);
const ImmunizationCheckIn = lazy(() => import("./Immunization/Checkin"));
const ReferralIncoming = lazy(() => import("./Appointment/referralWorkflow"));
const BloodBankLab = lazy(() => import("./Bloodbank/Lab"));
const ImmunizationInventory = lazy(() => import("./Immunization/Inventory"));

import PageLoaderComponent from "../components/page-loader/page-loader";
import LazyLoader from "../components/lazy-loader/Lazy-Loader";

const AccountDashboard = lazy(() =>
  import("./dashBoardUiComponent/@modules/AccountDashboard")
);
const AdminDashboard = lazy(() =>
  import("./dashBoardUiComponent/@modules/AdminDashboard")
);
const RadiologyDashboard = lazy(() =>
  import("./dashBoardUiComponent/@modules/RadiologyDashboard")
);
const TheatreDashboard = lazy(() =>
  import("./dashBoardUiComponent/@modules/TheatreDashboard")
);
const CrmDashboard = lazy(() =>
  import("./dashBoardUiComponent/@modules/CrmDashboard")
);
const ReferralDashboard = lazy(() =>
  import("./dashBoardUiComponent/@modules/ReferralDashboard")
);
const CommunicationDashboard = lazy(() =>
  import("./dashBoardUiComponent/@modules/CommunicationDashboard")
);
const ImmunizationDashboardComponent = lazy(() =>
  import("./dashBoardUiComponent/@modules/ImmunizationDashboard")
);
const BloodbankDashboard = lazy(() =>
  import("./dashBoardUiComponent/@modules/BloodbankDashboard")
);
const OrganizationClient = lazy(() =>
  import("./ManagedCare/OrganizationClient")
);
const ProviderPayment = lazy(() => import("./ManagedCare/ProviderPayment"));

const ComplaintDetails = lazy(() => import("./ManagedCare/ComplaintDetails"));

const WalletOTP = lazy(() => import("./PouchiiWallet/walletOtp"));
const CheckIn = lazy(() => import("./ManagedCare/Checkin"));

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
              <Route
                path="/app/clinic/dashboard"
                element={<ClinicDashboard />}
              />
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
              <Route
                path="/app/finance/collections"
                element={<Collections />}
              />
              <Route path="/app/finance/services" element={<Services />} />
              <Route
                path="/app/finance/billservices"
                element={<FinanceBillService />}
              />
              <Route
                path="/app/finance/hmoauthorization"
                element={<HMOauth />}
              />
              <Route
                path="/app/finance/revenue"
                element={<FacilityAccount />}
              />
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
              <Route
                path="/app/laboratory/billlaborders"
                element={<BillLab />}
              />
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
              <Route
                path="/app/pharmacy/payment"
                element={<PharmacyPayment />}
              />
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
              <Route
                path="/app/radiology/checkedin"
                element={<RadCheckedin />}
              />
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
              <Route
                path="/app/radiology/rad-details"
                element={<RadDetails />}
              />
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
              <Route
                path="/app/theatre/theatre-bill"
                element={<BillTheatre />}
              />
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
              <Route
                path="/app/ward/documentation"
                element={<Documentation />}
              />
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
              <Route
                path="/app/managed-care/referrals"
                element={<Referral />}
              />
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
      </Suspense>
    </>
  );
};

export default AppRoutes;
