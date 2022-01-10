import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../components/dashboard/admin/AdminDashboard';
import AppBands from '../components/dashboard/admin/Bands';
import AppEmployees from '../components/dashboard/admin/Employees';
import AppLocation from '../components/dashboard/admin/Locations';
import Appointments from '../components/dashboard/clients/Appointments';
import Clients from '../components/dashboard/clients/Clients';
import AppointmentDetails from '../components/dashboard/clients/details/AppointmentDetails';
import ClientDetails from '../components/dashboard/clients/details/ClientDetails';
import SingleClient from '../components/dashboard/clients/details/SingleClient';
import ClientQuickForm from '../components/dashboard/clients/forms/ClientQuickForm';
import Overview from '../components/dashboard/Overview';
import Login from '../pages/auth';
import IndividualSignup from '../pages/auth/IndividualSignup';
import Signup from '../pages/auth/Signup';
import Dashboard from '../pages/Dashboard';
const Details = () => {
  return <h1>Details</h1>;
};

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signupindividual' element={<IndividualSignup />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Overview />} />
          <Route path='/dashboard/clients' element={<Clients />} />
          <Route path='/dashboard/clients/:id' element={<ClientDetails />} />
          <Route
            path='/dashboard/clients/appointments'
            element={<Appointments />}
          />

          <Route
            path='/dashboard/clients/appointments/:id'
            element={<AppointmentDetails />}
          />
          <Route path='/dashboard/admin' element={<AdminDashboard />} />
          <Route path='/dashboard/admin/bands' element={<AppBands />} />
          <Route path='/dashboard/admin/employees' element={<AppEmployees />} />
          <Route path='/dashboard/admin/location' element={<AppLocation />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
