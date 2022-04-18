import React, { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import DetailView from '../../generic/DetailView';
import FormView from '../../generic/FormView';
import ListView from '../../generic/ListView';
import { FormType } from '../../schema/util';
import { queryEmployee } from '../query';
import { getEmployeeSchema } from '../schema';

const AppEmployee = () => {
  const { resource, setResource } = useObjectState();
  const [schema, setSchema] = useState<any>([]);
  const {
    employeeResource: { selectedEmployee },
  } = resource;

  const navigate = (show: string) => (selectedEmployee?: any) =>
    setResource({
      ...resource,
      employeeResource: {
        ...resource.employeeResource,
        show,
        selectedEmployee: selectedEmployee?._id
          ? selectedEmployee
          : resource.employeeResource.selectedEmployee,
      },
    });

  const {
    list: employees,
    find: handleSearch,
    remove: handleDelete,
    submit: handleSubmit,
    setFindQuery,
    facility,
  } = useRepository<any>(Models.EMPLOYEE, navigate);

  useEffect(() => {
    if (facility && facility._id) {
      setFindQuery(queryEmployee(facility._id));
      setSchema(getEmployeeSchema(facility._id));
    }
  }, [facility]);

  return (
    <>
      {resource.employeeResource.show === 'lists' && (
        <ListView
          title="Employee"
          schema={schema}
          handleCreate={navigate(Views.CREATE)}
          handleSearch={handleSearch}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          items={employees}
        />
      )}
      {(resource.employeeResource.show === FormType.CREATE ||
        resource.employeeResource.show === FormType.EDIT) && (
        <FormView
          title="Employee"
          schema={schema}
          backClick={navigate(Views.LIST)}
          onSubmit={handleSubmit}
          selectedData={selectedEmployee}
        />
      )}
      {resource.employeeResource.show === FormType.DETAIL && (
        <DetailView
          title="Employee"
          schema={schema}
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
