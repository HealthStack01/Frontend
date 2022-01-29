import React from 'react';

import { useObjectState } from '../../../../context/context';
import EmployeeCreate from './CollectionCreate';
import EmployeeDetails from './CollectionDetail';
import Employees from './CollectionList';
import EmployeeModify from './CollectionModify';

const AppCollections = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.employeeResource.show === 'lists' && (
        <Employees
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row) => {
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
        <EmployeeCreate
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
        <EmployeeDetails
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
        <EmployeeModify
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

export default AppCollections;
