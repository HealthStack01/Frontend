import React from 'react';

import { useObjectState } from '../../../../context/context';
import { FormType } from '../../schema/util';
import BillCreate from './BillCreate';
import BillDetails from './BillDetail';
import BillClient from './BillList';
import BillModify from './BillModify';

const AppBillClientLab = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.billClientResource.show === 'lists' && (
        <BillClient
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
        />
      )}
      {resource.billClientResource.show === FormType.CREATE && (
        <BillCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'lists',
              },
            }))
          }
        />
      )}
      {resource.billClientResource.show === FormType.DETAIL && (
        <BillDetails
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
        />
      )}
      {resource.billClientResource.show === FormType.EDIT && (
        <BillModify
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

export default AppBillClientLab;
