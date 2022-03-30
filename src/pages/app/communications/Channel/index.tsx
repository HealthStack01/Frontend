import React, { useEffect } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import DetailView from '../../generic/DetailView';
import FormView from '../../generic/FormView';
import ListView from '../../generic/ListView';
import { ChannelSchema } from '../../schema/communication';

const AppChannel = () => {
  const { resource, setResource } = useObjectState();
  const {
    channelResource: { selectedChannel },
  } = resource;

  const navigate = (show: string) => (selectedChannel?: any) =>
    setResource({
      ...resource,
      channelResource: {
        ...resource.channelResource,
        show,
        selectedChannel: selectedChannel || resource.channelResource.selectedChannel,
      },
    });

  const {
    list: channels,
    find: handleSearch,
    remove: handleDelete,
    submit: handleSubmit,
    setFindQuery,
  } = useRepository<any>(Models.CHANNEL, navigate);

  useEffect(() => {
    setFindQuery({ query: { facility: undefined } });
  }, []);

  return (
    <>
      {resource.channelResource.show === 'lists' && (
        <ListView
          title="Channel"
          schema={ChannelSchema}
          handleCreate={navigate(Views.CREATE)}
          handleSearch={handleSearch}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          items={channels}
        />
      )}
      {(resource.channelResource.show === 'create' || resource.channelResource.show === 'edit') && (
        <FormView
          title="Channel"
          schema={ChannelSchema}
          backClick={navigate(Views.LIST)}
          onSubmit={handleSubmit}
          data={{ ...selectedChannel, providerConfig: JSON.stringify(selectedChannel['providerConfig']) }}
        />
      )}
      {resource.channelResource.show === 'details' && (
        <DetailView
          title="Channel"
          schema={ChannelSchema}
          value={selectedChannel}
          backClick={navigate(Views.LIST)}
          onEdit={() => navigate(Views.EDIT)(selectedChannel)}
          onDelete={() => handleDelete(selectedChannel)}
        />
      )}
    </>
  );
};

export default AppChannel;
