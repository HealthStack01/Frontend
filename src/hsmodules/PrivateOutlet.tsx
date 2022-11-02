import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from '../context';
import Dashboard from './Dashboard/Dashboard';

const PrivateOutlet = () => {
  // const { user: data } = useContext(UserContext);
  const data = localStorage.getItem('user');
  const user = JSON.parse(data);

  return user ? <Dashboard /> : <Navigate to='/' />;
};

export default PrivateOutlet;
