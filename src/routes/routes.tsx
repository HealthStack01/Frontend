import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminDashboard from '../components/app/admin/AdminDashboard';
import AppBands from '../components/app/admin/Bands';
import AppEmployees from '../components/app/admin/Employees';
import AppLocation from '../components/app/admin/Locations';
import AppClient from '../components/app/clients/Client';
import ClientDashboard from '../components/app/clients/ClientDashboard';
import AppAppointment from '../components/app/clinic/Appointments/';
import ClinicDashboard from '../components/app/clinic/ClinicDashboard';
import AppBills from '../components/app/finance/BillServices';
import AppCollections from '../components/app/finance/Collections';
import FinanceDashboard from '../components/app/finance/FinanceDashboard';
import AppPayments from '../components/app/finance/Payment';
import AppRevenue from '../components/app/finance/Revenue';
import AppServices from '../components/app/finance/Services';
import AppBillClientLab from '../components/app/laboratory/BillClient';
import AppBillLabSent from '../components/app/laboratory/BillLabSent';
import LaboratoryDashboard from '../components/app/laboratory/LaboratoryDashboard';
import AppLaboratory from '../components/app/laboratory/LaboratoryTest';
import AppPaymentsLab from '../components/app/laboratory/Payment';
import Overview from '../components/app/Overview';
import AppBillClient from '../components/app/pharmacy/BillClient';
import AppBillPrescriptionSent from '../components/app/pharmacy/BillPrescriptionSent';
import AppDispensary from '../components/app/pharmacy/Dispensory';
import AppPaymentsPharmacy from '../components/app/pharmacy/Payment';
import PharmacyDashboard from '../components/app/pharmacy/PharmacyDashboard';
import AppPOS from '../components/app/pharmacy/POS';
import AppProductEntry from '../components/app/pharmacy/ProductEntry';
import AppInventory from '../components/app/pharmacy/StoreInventory';
import Login from '../pages/auth';
import IndividualSignup from '../pages/auth/IndividualSignup';
import Signup from '../pages/auth/Signup';
import PrivateOutlet from './PrivateOutlet';

function AppRoutes() {
  useEffect(() => {
    console.log('loaded');
  });
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupindividual" element={<IndividualSignup />} />
        <Route path="/app" element={<PrivateOutlet />}>
          <Route index element={<Overview />} />

          {/* Clients */}
          {/* <Route path="/app/clients" element={<Clients />} />
          <Route path="/app/clients/:id" element={<ClientDetails />} />
          <Route path="/app/clients/appointments" element={<Appointments />} /> */}

          {/* <Route
            path='/app/clients/appointments/:id'
            element={<AppointmentDetails />}
          /> */}

          {/* Clients */}
          <Route path="/app/clients" element={<ClientDashboard />} />
          <Route
            path="/app/clients/appointments"
            element={<AppAppointment />}
          />
          <Route path="/app/clients/clients" element={<AppClient />} />

          {/* Admin */}
          <Route path="/app/admin" element={<AdminDashboard />} />
          <Route path="/app/admin/bands" element={<AppBands />} />
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
          <Route path="/app/finance/billservices" element={<AppBills />} />
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
          <Route path="/app/pharmacy/dispensory" element={<AppDispensary />} />
          <Route path="/app/pharmacy/inventory" element={<AppInventory />} />
          <Route
            path="/app/pharmacy/productentry"
            element={<AppProductEntry />}
          />
          <Route path="/app/pharmacy/pos" element={<AppPOS />} />

          {/* Clinic */}
          <Route path="/app/clinic" element={<ClinicDashboard />} />
          <Route path="/app/clinic/appointments" element={<AppAppointment />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
