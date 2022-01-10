import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Clients from '../components/dashboard/clients/Appointments';
import Overview from '../components/dashboard/Overview';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Overview />} />
      <Route path='/dashboard/clients' element={<Clients />} />
    </Routes>
  );
};

export default DashboardRoutes;
