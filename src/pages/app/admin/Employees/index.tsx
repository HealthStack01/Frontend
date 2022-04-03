import React, { useEffect } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import DetailView from '../../generic/DetailView';
import FormView from '../../generic/FormView';
import ListView from '../../generic/ListView';
import { EmployeeSchema } from '../../schema';

const AppEmployee = () => {
  const { resource, setResource } = useObjectState();
  const {
    employeeResource: { selectedEmployee },
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
    find: handleSearch,
    remove: handleDelete,
    submit: handleSubmit,
    setFindQuery,
  } = useRepository<any>(Models.EMPLOYEE, navigate);

  useEffect(() => {
    setFindQuery({ query: { facility: undefined } });
  }, []);

  return (
    <>
      {resource.employeeResource.show === 'lists' && (
        <ListView
          title="Employee"
          schema={EmployeeSchema}
          handleCreate={navigate(Views.CREATE)}
          handleSearch={handleSearch}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          items={employees}
        />
      )}
      {(resource.employeeResource.show === 'create' || resource.employeeResource.show === 'edit') && (
        <FormView
          title="Employee"
          schema={EmployeeSchema}
          backClick={navigate(Views.LIST)}
          onSubmit={handleSubmit}
          selectedData={selectedEmployee}
        />
      )}
      {resource.employeeResource.show === 'details' && (
        <DetailView
          title="Employee"
          schema={EmployeeSchema}
          value={selectedEmployee}
          backClick={navigate(Views.LIST)}
          onEdit={() => navigate(Views.EDIT)(selectedEmployee)}
          onDelete={() => handleDelete(selectedEmployee)}
        />
      )}
    </>
  );
};

export default AppEmployee;
