import React from 'react';

import { useObjectState } from '../../../../context/context';
import PreAuthorzationDetails from './PreAuthorizationDetail';
import PreAuthorizations from './PreAuthorizationList';

const AppPreAuthorization = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.collectionsResource.show === 'lists' && (
        <PreAuthorizations
          handleCreate={() =>
            setResource(prevState => ({
              ...prevState,
              collectionsResource: {
                ...prevState.collectionsResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={row => {
            setResource(prevState => ({
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
        <PreAuthorzationDetails
          row={resource.collectionsResource.selectedCollection}
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              collectionsResource: {
                ...prevState.collectionsResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource(prevState => ({
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

export default AppPreAuthorization;
