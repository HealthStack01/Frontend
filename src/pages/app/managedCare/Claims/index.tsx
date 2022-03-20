import React from 'react';

import { useObjectState } from '../../../../context/context';
import ClaimsDetails from './ClaimsDetail';
import Claims from './ClaimsList';

const AppClaims = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.collectionsResource.show === 'lists' && (
        <Claims
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              collectionsResource: {
                ...prevState.collectionsResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row) => {
            setResource((prevState) => ({
              ...prevState,
              collectionsResource: {
                show: 'details',
                selectedCollection: row,
              },
            }));
          }}
        />
      )}

      {resource.collectionsResource.show === 'details' && (
        <ClaimsDetails
          row={resource.collectionsResource.selectedCollection}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              collectionsResource: {
                ...prevState.collectionsResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              collectionsResource: {
                ...prevState.collectionsResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppClaims;
