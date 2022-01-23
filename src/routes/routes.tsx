import { Route, Routes } from 'react-router-dom';

import AdminDashboard from '../components/app/admin/AdminDashboard';
import AppBands from '../components/app/admin/Bands';
import AppEmployees from '../components/app/admin/Employees';
import AppLocation from '../components/app/admin/Locations';
import Appointments from '../components/app/clients/Appointments';
import Clients from '../components/app/clients/Clients';
import AppointmentDetails from '../components/app/clients/details/AppointmentDetails';
import ClientDetails from '../components/app/clients/details/ClientDetails';
import AppBills from '../components/app/finance/BillServices';
import AppCollections from '../components/app/finance/Collections';
import FinanceDashboard from '../components/app/finance/FinanceDashboard';
import AppHMOAuthorization from '../components/app/finance/HMOAuthorization';
import AppPayments from '../components/app/finance/Payment';
import AppRevenue from '../components/app/finance/Revenue';
import AppServices from '../components/app/finance/Services';
import Overview from '../components/app/Overview';
import AppBillClient from '../components/app/pharmacy/BillClient';
import AppBillPrescriptionSent from '../components/app/pharmacy/BillPrescriptionSent';
import AppDispensary from '../components/app/pharmacy/Dispensory';
import AppPaymentsPharmacy from '../components/app/pharmacy/Payment';
import PharmacyDashboard from '../components/app/pharmacy/PharmacyDashboard';
import AppInventory from '../components/app/pharmacy/StoreInventory';
import Login from '../pages/auth';
import IndividualSignup from '../pages/auth/IndividualSignup';
import Signup from '../pages/auth/Signup';
import Dashboard from '../pages/Dashboard';

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signupindividual' element={<IndividualSignup />} />
        <Route path='/app' element={<Dashboard />}>
          <Route index element={<Overview />} />

          {/* Clients */}
          <Route path='/app/clients' element={<Clients />} />
          <Route path='/app/clients/:id' element={<ClientDetails />} />
          <Route path='/app/clients/appointments' element={<Appointments />} />

          <Route
            path='/app/clients/appointments/:id'
            element={<AppointmentDetails />}
          />

          {/* Admin */}
          <Route path='/app/admin' element={<AdminDashboard />} />
          <Route path='/app/admin/bands' element={<AppBands />} />
          <Route path='/app/admin/employees' element={<AppEmployees />} />
          <Route path='/app/admin/location' element={<AppLocation />} />

          {/* Finance */}
          <Route path='/app/finance' element={<FinanceDashboard />} />
          <Route path='/app/finance/billservices' element={<AppBills />} />
          <Route path='/app/finance/collections' element={<AppCollections />} />
          <Route path='/app/finance/payment' element={<AppPayments />} />
          <Route path='/app/finance/revenue' element={<AppRevenue />} />
          <Route path='/app/finance/services' element={<AppServices />} />

          {/* Pharmacy */}

          <Route path='/app/pharmacy' element={<PharmacyDashboard />} />
          <Route path='/app/pharmacy/billclient' element={<AppBillClient />} />
          <Route
            path='/app/pharmacy/billsent'
            element={<AppBillPrescriptionSent />}
          />
          <Route
            path='/app/pharmacy/payment'
            element={<AppPaymentsPharmacy />}
          />
          <Route path='/app/pharmacy/dispensory' element={<AppDispensary />} />
          <Route path='/app/pharmacy/inventory' element={<AppInventory />} />
          <Route path='/app/pharmacy/productentry' element={<AppServices />} />
          <Route path='/app/pharmacy/pos' element={<AppHMOAuthorization />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
