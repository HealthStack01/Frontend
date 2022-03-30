import React, { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models } from '../../Constants';
import { queryClients } from '../Appointments/query';
import ClientCreate from './ClientCreate';
import ClientDetails from './ClientDetail';
import Clients from './ClientList';
import ClientModify from './ClientModify';

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
        selectedClient: selectedClient || resource.clientResource.selectedClient,
      },
    });

  const {
    list: clients,
    remove: handleDelete,
    submit: handleSubmit,
    setFindQuery,
  } = useRepository<any>(Models.CLIENT, navigate);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setFindQuery(queryClients(undefined, undefined, searchText ? searchText : undefined));
  }, [searchText]);

  return (
    <>
      {resource.billClientResource.show === 'lists' && (
        <Clients
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row, _event) => {
            setResource((prevState) => ({
              ...prevState,
              billClientResource: {
                show: 'details',
                selectedBillClient: row,
              },
            }));
          }}
          items={clients}
          handleSearch={setSearchText}
        />
      )}

      {resource.billClientResource.show === 'create' && (
        <ClientCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'lists',
              },
            }))
          }
          onSubmit={handleSubmit}
        />
      )}

      {resource.billClientResource.show === 'details' && (
        <ClientDetails
          row={resource.billClientResource.selectedBillClient}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'edit',
              },
            }))
          }
          handleDelete={() => handleDelete(selectedClient)}
        />
      )}
      {resource.billClientResource.show === 'edit' && (
        <ClientModify
          row={resource.billClientResource.selectedBillClient}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              clientResource: {
                ...prevState.clientResource,
                show: 'details',
              },
            }))
          }
          onSubmit={handleSubmit}
          handleDelete={() => handleDelete(selectedClient)}
        />
      )}
    </>
  );
};

export default AppClient;
