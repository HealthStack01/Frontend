import React, { useEffect } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import DetailView from '../../generic/DetailView';
import FormView from '../../generic/FormView';
import ListView from '../../generic/ListView';
import { FormType } from '../../schema/util';
import { ChannelSchema } from '../schema';

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
        selectedChannel: show === FormType.CREATE ? {} : selectedChannel,
      },
    });

  const {
    list: channels,
    find: handleSearch,
    remove: handleDelete,
    submit,
    setFindQuery,
  } = useRepository<any>(Models.CHANNEL, navigate);

  const preSubmit = (data) => {
    submit({ ...data, providerConfig: JSON.parse(data.providerConfig) });
  };

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
      {(resource.channelResource.show === FormType.CREATE ||
        resource.channelResource.show === FormType.EDIT) && (
        <FormView
          title="Channel"
          schema={ChannelSchema}
          backClick={navigate(Views.LIST)}
          onSubmit={preSubmit}
          selectedData={{
            ...selectedChannel,
            providerConfig: JSON.stringify(selectedChannel['providerConfig']),
          }}
        />
      )}
      {resource.channelResource.show === FormType.DETAIL && (
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
