import React, { useContext, useEffect } from 'react';

import { UserContext } from '../../../context/context';
import { PageWrapper } from '../styles';

const ClinicDashboard = () => {
  const { locationType, setLocationType } = useContext(UserContext);

  useEffect(() => {
    setLocationType('Clinic');
  }, [locationType]);

  return (
    <PageWrapper>
      <h2>Clinic Dashboard</h2>
    </PageWrapper>
  );
};

export default ClinicDashboard;
