import React from 'react';

import { useObjectState } from '../../../../context/context';
import RevenueDetails from './RevenueDetail';
import Revenue from './RevenueList';

const AppRevenue = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.revenuesResource.show === 'lists' && (
        <Revenue
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
        <RevenueDetails
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

export default AppRevenue;
