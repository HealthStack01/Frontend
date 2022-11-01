import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from '../context';
import Dashboard from './Dashboard/Dashboard';

const PrivateOutlet = () => {
  const { user: data } = useContext(UserContext);
  const user = localStorage.getItem('user');

  return user ? <Dashboard /> : <Navigate to='/' />;
};

export default PrivateOutlet;
