import React from 'react';

import { useObjectState } from '../../../../context/context';
import POSCreate from './POSCreate';
import POSDetails from './POSDetail';
import POS from './POSList';
import POSModify from './POSModify';

const AppPOS = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.employeeResource.show === 'lists' && (
        <POS
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row, _event) => {
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                show: 'details',
                selectedEmployee: row,
              },
            }));
          }}
        />
      )}
      {resource.employeeResource.show === 'create' && (
        <POSCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'lists',
              },
            }))
          }
        />
      )}
      {resource.employeeResource.show === 'details' && (
        <POSDetails
          row={resource.employeeResource.selectedEmployee}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
      {resource.employeeResource.show === 'edit' && (
        <POSModify
          row={resource.employeeResource.selectedEmployee}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'details',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppPOS;
