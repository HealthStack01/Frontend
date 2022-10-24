import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from '../context';
import Dashboard from '../hsmodules/Dashboard';

const PrivateOutlet = () => {
  const { user } = useContext(UserContext);
  
  return user ? <Dashboard /> :  <Navigate to = "/"/>
};

export default PrivateOutlet;
