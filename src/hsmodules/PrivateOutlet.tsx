import { useContext } from 'react';

import { UserContext } from '../context';
import Dashboard from '../hsmodules/Dashboard';

const PrivateOutlet = () => {
  const { user } = useContext(UserContext);
  return user ? <Dashboard /> : <div>Access Denied</div>;
};

export default PrivateOutlet;
