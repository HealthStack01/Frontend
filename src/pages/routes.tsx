import { Route, Routes } from 'react-router-dom';

import AdminDashboard from '../pages/app/admin/AdminDashboard';
import AppBands from '../pages/app/admin/Bands';
import AppEmployees from '../pages/app/admin/Employees';
import AppLocation from '../pages/app/admin/Locations';
import AppClientAppointment from '../pages/app/clients/Appointments';
import AppClinic from '../pages/app/clients/Appointments';
import AppClient from '../pages/app/clients/Client';
import ClientDashboard from '../pages/app/clients/ClientDashboard';
import ClinicDashboard from '../pages/app/clinic/ClinicDashboard';
import AppChannel from '../pages/app/communications/Channel';
import CommunicationsDashboard from '../pages/app/communications/CommunicationDashboard';
import AppConfiguration from '../pages/app/communications/Configurations';
import AppInput from '../pages/app/communications/InputField';
import AppQuestionnaires from '../pages/app/communications/Questionaries';
import AppSubmission from '../pages/app/communications/Submissions';
import AppBills from '../pages/app/finance/BillServices';
import AppCollections from '../pages/app/finance/Collections';
import FinanceDashboard from '../pages/app/finance/FinanceDashboard';
import AppPayments from '../pages/app/finance/Payment';
import AppRevenue from '../pages/app/finance/Revenue';
import AppServices from '../pages/app/finance/Services';
import AppBillClientLab from '../pages/app/laboratory/BillClient';
import AppBillLabSent from '../pages/app/laboratory/BillLabSent';
import LaboratoryDashboard from '../pages/app/laboratory/LaboratoryDashboard';
import AppLaboratory from '../pages/app/laboratory/LaboratoryTest';
import AppPaymentsLab from '../pages/app/laboratory/Payment';
import AppClaimPayments from '../pages/app/managedCare/ClaimPayment';
import AppClaims from '../pages/app/managedCare/Claims';
import ManagedCareDashboard from '../pages/app/managedCare/ManagedCareDashboard';
import AppPreAuthorization from '../pages/app/managedCare/PreAuthorization';
import AppReferrals from '../pages/app/managedCare/Referrals';
import Overview from '../pages/app/Overview';
import AppBillClient from '../pages/app/pharmacy/BillClient';
import AppBillPrescriptionSent from '../pages/app/pharmacy/BillPrescriptionSent';
import AppDispensary from '../pages/app/pharmacy/Dispensory';
import AppPaymentsPharmacy from '../pages/app/pharmacy/Payment';
import PharmacyDashboard from '../pages/app/pharmacy/PharmacyDashboard';
import AppPOS from '../pages/app/pharmacy/POS';
import AppProductEntry from '../pages/app/pharmacy/ProductEntry';
import AppInventory from '../pages/app/pharmacy/StoreInventory';
import Login from '../pages/auth';
import IndividualSignup from '../pages/auth/IndividualSignup';
import Signup from '../pages/auth/Signup';
import PrivateOutlet from './PrivateOutlet';

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupindividual" element={<IndividualSignup />} />
        <Route path="/app" element={<PrivateOutlet />}>
          <Route index element={<Overview />} />

          {/* Clients */}
          <Route path="/app/clients" element={<ClientDashboard />} />
          <Route path="/app/clients/appointments" element={<AppClientAppointment />} />
          <Route path="/app/clients/clients" element={<AppClient />} />

          {/* Admin */}
          <Route path="/app/admin" element={<AdminDashboard />} />
          <Route path="/app/admin/bands" element={<AppBands />} />
          <Route path="/app/admin/employees" element={<AppEmployees />} />
          <Route path="/app/admin/location" element={<AppLocation />} />

          {/* Laboratory */}
          <Route path="/app/laboratory" element={<LaboratoryDashboard />} />
          <Route path="/app/laboratory/billlabsent" element={<AppBillLabSent />} />
          <Route path="/app/laboratory/billclient" element={<AppBillClientLab />} />
          <Route path="/app/laboratory/payment" element={<AppPaymentsLab />} />
          <Route path="/app/laboratory/result" element={<AppLaboratory />} />

          {/* Finance */}
          <Route path="/app/finance" element={<FinanceDashboard />} />
          <Route path="/app/finance/billservices" element={<AppBills />} />
          <Route path="/app/finance/collections" element={<AppCollections />} />
          <Route path="/app/finance/payment" element={<AppPayments />} />
          <Route path="/app/finance/revenue" element={<AppRevenue />} />
          <Route path="/app/finance/services" element={<AppServices />} />

          {/* Pharmacy */}

          <Route path="/app/pharmacy" element={<PharmacyDashboard />} />
          <Route path="/app/pharmacy/billclient" element={<AppBillClient />} />
          <Route path="/app/pharmacy/billsent" element={<AppBillPrescriptionSent />} />
          <Route path="/app/pharmacy/payment" element={<AppPaymentsPharmacy />} />
          <Route path="/app/pharmacy/dispensory" element={<AppDispensary />} />
          <Route path="/app/pharmacy/inventory" element={<AppInventory />} />
          <Route path="/app/pharmacy/productentry" element={<AppProductEntry />} />
          <Route path="/app/pharmacy/pos" element={<AppPOS />} />

          {/* Clinic */}
          <Route path="/app/clinic" element={<ClinicDashboard />} />
          <Route path="/app/clinic/appointments" element={<AppClinic />} />

          {/* Manged Care */}
          <Route path="/app/managedCare" element={<ManagedCareDashboard />} />
          <Route path="/app/managedCare/claimpayment" element={<AppClaimPayments />} />
          <Route path="/app/managedCare/claims" element={<AppClaims />} />
          <Route path="/app/managedCare/referrals" element={<AppReferrals />} />
          <Route path="/app/managedCare/preauthorization" element={<AppPreAuthorization />} />

          {/* Communication */}
          <Route path="/app/communication" element={<CommunicationsDashboard />} />
          <Route path="/app/communication/channel" element={<AppChannel />} />
          <Route path="/app/communication/configuration" element={<AppConfiguration />} />
          <Route path="/app/communication/questionnaires" element={<AppQuestionnaires />} />
          <Route path="/app/communication/submissions" element={<AppSubmission />} />
          <Route path="/app/communication/inputfields" element={<AppInput />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
