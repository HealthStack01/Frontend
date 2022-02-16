import React from 'react';

import { useObjectState } from '../../../../context/context';
import useRepository from '../../../hooks';
import { Models, Views } from '../../Constants';
import EmployeeCreate from './EmployeeCreate';
import EmployeeDetails from './EmployeeDetail';
import EmployeeList from './EmployeeList';
import EmployeeModify from './EmployeeModify';

function AppEmployees() {
  const { resource, setResource } = useObjectState();
  const {
    employeeResource: { show, selectedEmployee },
  } = resource;

  const navigate = (show: string) => (selectedEmployee?: any) =>
    setResource({
      ...resource,
      employeeResource: {
        ...resource.employeeResource,
        show,
        selectedEmployee: selectedEmployee || resource.employeeResource.selectedEmployee,
      },
    });

  const {
    list: employees,
    find: getEmployees,
    remove: handleDelete,
    submit: handleSubmit,
  } = useRepository<any>(Models.EMPLOYEE, navigate);

  return (
    <>
      {show === Views.LIST && (
        <EmployeeList
          handleCreate={navigate(Views.CREATE)}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          handleSearch={getEmployees}
          items={employees}
        />
      )}
      {show === Views.CREATE && <EmployeeCreate backClick={navigate(Views.LIST)} onSubmit={handleSubmit} />}
      {show === Views.DETAIL && (
        <EmployeeDetails
          row={selectedEmployee}
          backClick={navigate(Views.LIST)}
          editBtnClicked={() => navigate(Views.EDIT)(selectedEmployee)}
          handleDelete={() => handleDelete(selectedEmployee)}
        />
      )}
      {resource.bandResource.show === Views.EDIT && (
        <EmployeeModify
          row={selectedEmployee}
          backClick={navigate(Views.LIST)}
          cancelEditClicked={navigate(Views.DETAIL)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default AppEmployees;
