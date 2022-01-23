import React from 'react';

import { useObjectState } from '../../../../context/context';
import BillCreate from './BillCreate';
import BillDetails from './BillDetail';
import BillClient from './BillList';
import BillModify from './BillModify';

const AppBillClient = () => {
  const { resource, setResource } = useObjectState();

  console.log(resource.billClientResource.show);

  return (
    <>
      {resource.billClientResource.show === 'lists' && (
        <BillClient
          handleCreate={() =>
            setResource(prevState => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row, event) => {
            // https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object

            setResource(prevState => ({
              ...prevState,
              billClientResource: {
                show: 'details',
                selectedBillClient: row,
              },
            }));
          }}
        />
      )}
      {resource.billClientResource.show === 'create' && (
        <BillCreate
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'lists',
              },
            }))
          }
        />
      )}
      {resource.billClientResource.show === 'details' && (
        <BillDetails
          row={resource.billClientResource.selectedBillClient}
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource(prevState => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
      {resource.billClientResource.show === 'edit' && (
        <BillModify
          row={resource.billClientResource.selectedBillClient}
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource(prevState => ({
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

export default AppBillClient;
