import React from 'react';

import { useObjectState } from '../../../../context/context';
import EmployeeCreate from './EmployeeCreate';
import EmployeeDetails from './EmployeeDetail';
import Employees from './EmployeeList';
import EmployeeModify from './EmployeeModify';

function AppEmployees() {
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
          onRowClicked={(row, _) => {
            // https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object

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
}

export default AppEmployees;
