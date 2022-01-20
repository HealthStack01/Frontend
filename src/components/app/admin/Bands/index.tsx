import React from 'react';

import { useObjectState } from '../../../../context/context';
import BandCreate from './BandCreate';
import BandDetails from './BandDetail';
import Bands from './BandList';
import BandModify from './BandModify';

function AppBands() {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.bandResource.show === 'lists' && (
        <Bands
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row) => {
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                show: 'details',
                selectedBand: row,
              },
            }));
          }}
        />
      )}
      {resource.bandResource.show === 'create' && (
        <BandCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'lists',
              },
            }))
          }
        />
      )}
      {resource.bandResource.show === 'details' && (
        <BandDetails
          row={resource.bandResource.selectedBand}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
      {resource.bandResource.show === 'edit' && (
        <BandModify
          row={resource.bandResource.selectedBand}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'details',
              },
            }))
          }
        />
      )}
    </>
  );
}

export default AppBands;
