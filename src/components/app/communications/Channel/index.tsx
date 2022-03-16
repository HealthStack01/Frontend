import React from 'react';

import { useObjectState } from '../../../../context/context';
import ChannelCreate from './ChannelCreate';
import ChannelDetails from './ChannelDetail';
import Channels from './ChannelList';
import ChannelModify from './ChannelModify';

const AppChannel = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.bandResource.show === 'lists' && (
        <Channels
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
        <ChannelCreate
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
        <ChannelDetails
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
        <ChannelModify
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
};

export default AppChannel;
