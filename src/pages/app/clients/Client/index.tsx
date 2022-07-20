import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import DetailView from '../../generic/DetailView';
import FormView from '../../generic/FormView';
import ListView from '../../generic/ListView';
import { FormType } from '../../schema/util';
import { queryClients } from '../Appointments/query';
import { ClientMiniSchema } from '../schema';

const AppClient = () => {
  const { resource, setResource } = useObjectState();
  const {
    clientResource: { selectedClient },
  } = resource;

  const navigate = (show: string) => (selectedClient?: any) =>
    setResource({
      ...resource,
      clientResource: {
        ...resource.clientResource,
        show,
        selectedClient:
          selectedClient || resource.clientResource.selectedClient,
      },
    });

  const {
    list: clients,
    remove: handleDelete,
    submit: handleSubmit,
    setFindQuery,
  } = useRepository<any>(Models.CLIENT, navigate);
  const [formSchema] = useState(ClientMiniSchema);

  
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setFindQuery(
      queryClients(undefined, undefined, searchText || undefined),
    );
  }, [searchText]);

  return (
    <>
      {resource.clientResource.show === 'lists' && (
        <ListView
          title="Client"
          schema={ClientMiniSchema}
          handleCreate={navigate(Views.CREATE)}
          handleSearch={setSearchText}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          items={clients}
        />
      )}
      {(resource.clientResource.show === FormType.CREATE ||
        resource.clientResource.show === FormType.EDIT) && (
        <FormView
          title="Client"
          schema={formSchema}
          backClick={navigate(Views.LIST)}
          onSubmit={handleSubmit}
          selectedData={selectedClient}
        />
      )}
      {resource.clientResource.show === FormType.DETAIL && (
        <DetailView
          title="Client"
          schema={formSchema}
          value={selectedClient}
          backClick={navigate(Views.LIST)}
          onEdit={() => navigate(Views.EDIT)(selectedClient)}
          onDelete={() => handleDelete(selectedClient)}
        />
      )}
    </>
  );
};

export default AppClient;
