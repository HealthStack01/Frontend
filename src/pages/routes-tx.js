import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

/* import useRepository from '../components/hooks/repository'; */
import AdminDashboard from './app/admin/AdminDashboard';
/* import AppBands from '../pages/app/admin/Bands'; */
import Bands from './app/admin/Bands/Bands';
import AppEmployees from './app/admin/Employees';
import AppLocation from './app/admin/Locations';
import AppClientAppointment from './app/clients/Appointments';
import AppClient from './app/clients/Client';
import ClientDashboard from './app/clients/ClientDashboard';
import ClinicDashboard from './app/clinic/ClinicDashboard';
import AppChannel from './app/communications/Channel';
import CommunicationsDashboard from './app/communications/CommunicationDashboard';
import AppConfiguration from './app/communications/Configurations';
import AppQuestionnaires from './app/communications/Questionaries';
import AppSubmission from './app/communications/Submissions';
import AppCollections from './app/finance/Collections';
import FinanceDashboard from './app/finance/FinanceDashboard';
import AppPayments from './app/finance/Payment';
import AppRevenue from './app/finance/Revenue';
import AppServices from './app/finance/Services';
import AppBillClientLab from './app/laboratory/BillClient';
import AppBillLabSent from './app/laboratory/BillLabSent';
import LaboratoryDashboard from './app/laboratory/LaboratoryDashboard';
import AppLaboratory from './app/laboratory/LaboratoryTest';
import AppPaymentsLab from './app/laboratory/Payment';
import AppClaimPayments from './app/managedCare/ClaimPayment';
import AppClaims from './app/managedCare/Claims';
import ManagedCareDashboard from './app/managedCare/ManagedCareDashboard';
import AppPreAuthorization from './app/managedCare/PreAuthorization';
import AppReferrals from './app/managedCare/Referrals';
import Overview from './app/Overview';
import AppBillClient from './app/pharmacy/BillClient';
import AppBillPrescriptionSent from './app/pharmacy/BillPrescriptionSent';
import Appdispensory from './app/pharmacy/Dispensory';
import AppPaymentsPharmacy from './app/pharmacy/Payment';
import PharmacyDashboard from './app/pharmacy/PharmacyDashboard';
import AppPOS from './app/pharmacy/POS';
import AppProductEntry from './app/pharmacy/ProductEntry';
import AppInventory from './app/pharmacy/StoreInventory';
import Login from './auth';
import IndividualSignup from './auth/IndividualSignup';
import Signup from './auth/Signup';
import { Models } from './app/Constants';
import AppCaseDefinition from './app/epidemology/CaseDefinition';
import EpidemiologyDashboard from './app/epidemology/EpidemiologyDashboard';
import PrivateOutlet from '../hsmodules/PrivateOutlet';

const moduleLocationTypes = {
  clinic: 'Clinic',
  clients: 'Front Desk',
  admin: 'Front Desk',
  pharmacy: 'Pharmacy',
  finance: 'Finance',
  inventory: 'Store',
  ward: 'Ward',
  laboratory: 'Laboratory',
};

const AppRoutes = () => {
  const { setLocationType } = useRepository(Models.LOCATION);

  const [currentModule, setCurrentModule] = useState('');
  const location = useLocation();
  useEffect(() => {
    const paths = location.pathname.split('/');
    const newModule = paths.length > 2 && paths[2];
    setCurrentModule(newModule);
    if (
      newModule != currentModule &&
      Object.keys(moduleLocationTypes).includes(newModule)
    ) {
      setLocationType(moduleLocationTypes[newModule]);
    }
  }, [location]);
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
          <Route
            path="/app/clients/appointments"
            element={<AppClientAppointment />}
          />
          <Route path="/app/clients/clients" element={<AppClient />} />

          {/* Admin */}
          <Route path="/app/admin" element={<AdminDashboard />} />
          <Route path="/app/admin/bands" element={<Bands/>} />
          <Route path="/app/admin/employees" element={<AppEmployees />} />
          <Route path="/app/admin/location" element={<AppLocation />} />

          {/* Laboratory */}
          <Route path="/app/laboratory" element={<LaboratoryDashboard />} />
          <Route
            path="/app/laboratory/billlabsent"
            element={<AppBillLabSent />}
          />
          <Route
            path="/app/laboratory/billclient"
            element={<AppBillClientLab />}
          />
          <Route path="/app/laboratory/payment" element={<AppPaymentsLab />} />
          <Route path="/app/laboratory/result" element={<AppLaboratory />} />

          {/* Finance */}
          <Route path="/app/finance" element={<FinanceDashboard />} />
          <Route path="/app/finance/billservices" element={<AppBillClient />} />
          <Route path="/app/finance/collections" element={<AppCollections />} />
          <Route path="/app/finance/payment" element={<AppPayments />} />
          <Route path="/app/finance/revenue" element={<AppRevenue />} />
          <Route path="/app/finance/services" element={<AppServices />} />

          {/* Pharmacy */}

          <Route path="/app/pharmacy" element={<PharmacyDashboard />} />
          <Route path="/app/pharmacy/billclient" element={<AppBillClient />} />
          <Route
            path="/app/pharmacy/billsent"
            element={<AppBillPrescriptionSent />}
          />
          <Route
            path="/app/pharmacy/payment"
            element={<AppPaymentsPharmacy />}
          />
          <Route path="/app/pharmacy/dispensory" element={<Appdispensory />} />
          <Route path="/app/pharmacy/inventory" element={<AppInventory />} />
          <Route
            path="/app/pharmacy/productentry"
            element={<AppProductEntry />}
          />
          <Route path="/app/pharmacy/pos" element={<AppPOS />} />

          {/* Clinic */}
          <Route path="/app/clinic" element={<ClinicDashboard />} />
          <Route
            path="/app/clinic/appointments"
            element={<AppClientAppointment />}
          />

          {/* Manged Care */}
          <Route path="/app/managedCare" element={<ManagedCareDashboard />} />
          <Route
            path="/app/managedCare/claimpayment"
            element={<AppClaimPayments />}
          />
          <Route path="/app/managedCare/claims" element={<AppClaims />} />
          <Route path="/app/managedCare/referrals" element={<AppReferrals />} />
          <Route
            path="/app/managedCare/preauthorization"
            element={<AppPreAuthorization />}
          />

          {/* Communication */}
          <Route
            path="/app/communication"
            element={<CommunicationsDashboard />}
          />
          <Route path="/app/communication/channel" element={<AppChannel />} />
          <Route
            path="/app/communication/configuration"
            element={<AppConfiguration />}
          />
          <Route
            path="/app/communication/questionnaires"
            element={<AppQuestionnaires />}
          />
          <Route
            path="/app/communication/submissions"
            element={<AppSubmission />}
          />

          {/* Epidemiology */}
          <Route path="/app/epidemiology" element={<EpidemiologyDashboard />} />
          <Route
            path="/app/epidemiology/case-definition"
            element={<AppCaseDefinition />}
          />
          <Route
            path="/app/epidemiology/signals"
            element={<AppCaseDefinition />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
