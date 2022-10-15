import React, { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import ListView from '../../generic/ListView';
import { LabTestSummary } from '../schema';
import LaboratoryDetails from './LaboratoryDetail';
import { labTestQuery } from './query';

const AppLaboratory = () => {
  const { resource, setResource } = useObjectState();
  const {
    employeeResource: { show, selectedEmployee },
  } = resource;
  const handleNavigation = (show: string) => (selectedEmployee?: any) =>
    setResource({
      ...resource,
      employeeResource: {
        ...resource.employeeResource,
        show,
        selectedEmployee:
          selectedEmployee || resource.employeeResource.selectedEmployee,
      },
    });
  const {
    list: labtest,
    submit: handleSubmit,
    setFindQuery,
  } = useRepository(Models.BILLS, handleNavigation);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setFindQuery(labTestQuery(undefined, searchText || undefined));
  }, [searchText]);

  useEffect(() => {
    setFindQuery(labTestQuery(undefined, searchText || undefined));
  }, []);

  return (
    <>
      {show === Views.LIST && (
        <ListView
          title="Lab Test Result"
          schema={LabTestSummary}
          items={labtest}
          handleSearch={setSearchText}
          onRowClicked={(rows) => handleNavigation(Views.DETAIL)(rows)}
          loading={false}
        />
      )}
      {show === Views.DETAIL && (
        <LaboratoryDetails
          onSubmit={handleSubmit}
          row={selectedEmployee}
          backClick={handleNavigation(Views.LIST)}
        />
      )}
    </>
  );
};

export default AppLaboratory;
