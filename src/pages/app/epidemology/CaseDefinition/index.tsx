import React, { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import DetailView from '../../generic/DetailView';
import FormView from '../../generic/FormView';
import ListView from '../../generic/ListView';
import { FormType } from '../../schema/util';
import { queryCaseDefinition } from '../query';
import { getCaseDefinitionSchema } from '../schema';

const AppCaseDefinition = () => {
  const { resource, setResource } = useObjectState();
  const [searchText, setSearchText] = useState();
  const CaseDefinitionSchema = getCaseDefinitionSchema('');
  const {
    caseDefinitionResource: { selectedCaseDefinition },
  } = resource;

  const navigate = (show: string) => (selectedcaseDefinition?: any) =>
    setResource({
      ...resource,
      caseDefinitionResource: {
        ...resource.caseDefinitionResource,
        show,
        selectedCaseDefinition:
          show === FormType.CREATE ? {} : selectedcaseDefinition,
      },
    });

  const { list, submit, remove, setFindQuery, facility } = useRepository<any>(
    Models.CASE_DEFINITION,
    navigate,
  );

  const onSubmit = async (data) => {
    const { findings, labs, symptoms } = data;
    data = {
      ...data,
      disease: {
        name: data.disease,
        icdcode: '',
        icdver: '',
        snomed: '',
        snomedver: '',
      },
      observation: [...symptoms, ...findings, ...labs],
      notification_destination: data.notifiedPerson,
      facility: facility._id,
    };
    submit(data);
  };

  useEffect(() => {
    if (facility && facility._id) {
      setFindQuery(queryCaseDefinition(facility._id, undefined));
    }
  }, [facility]);

  useEffect(() => {
    setFindQuery(queryCaseDefinition(facility?._id, searchText));
  }, [facility, searchText]);

  return (
    <>
      {resource.caseDefinitionResource.show === FormType.LIST && (
        <ListView
          title="Case Definition"
          schema={CaseDefinitionSchema.filter((obj) => !obj.th)}
          handleCreate={navigate(Views.CREATE)}
          handleSearch={setSearchText}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          items={list}
        />
      )}
      {(resource.caseDefinitionResource.show === FormType.CREATE ||
        resource.caseDefinitionResource.show === FormType.EDIT) && (
        <FormView
          title="Case Definition"
          schema={CaseDefinitionSchema}
          backClick={navigate(Views.LIST)}
          onSubmit={onSubmit}
          selectedData={selectedCaseDefinition}
        />
      )}
      {resource.caseDefinitionResource.show === FormType.DETAIL && (
        <DetailView
          title="Case Definition"
          schema={CaseDefinitionSchema}
          value={selectedCaseDefinition}
          backClick={navigate(Views.LIST)}
          onEdit={() => navigate(Views.EDIT)(selectedCaseDefinition)}
          onDelete={() => remove(selectedCaseDefinition)}
        />
      )}
    </>
  );
};

export default AppCaseDefinition;
