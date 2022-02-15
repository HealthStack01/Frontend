import React from 'react';

import { useObjectState } from '../../../../context/context';
import ReferralsDetails from './ReferralsDetail';
import Referrals from './ReferralsList';
const AppReferrals = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.revenuesResource.show === 'lists' && (
        <Referrals
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              revenuesResource: {
                ...prevState.revenuesResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row) => {
            setResource((prevState) => ({
              ...prevState,
              revenuesResource: {
                show: 'details',
                selectedRevenue: row,
              },
            }));
          }}
        />
      )}

      {resource.revenuesResource.show === 'details' && (
        <ReferralsDetails
          row={resource.revenuesResource.selectedRevenue}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              revenuesResource: {
                ...prevState.revenuesResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              revenuesResource: {
                ...prevState.revenuesResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppReferrals;
