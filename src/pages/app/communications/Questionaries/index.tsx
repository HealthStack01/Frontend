import React, { useEffect } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import DetailView from '../../generic/DetailView';
import ListView from '../../generic/ListView';
import { QuestionnaireSchema } from '../../schema/communication';
import QuestionnaireForm from './QuestionnaireForm';

const AppQuestionnaire = () => {
  const { resource, setResource } = useObjectState();
  const {
    questionnaireResource: { selectedQuestionnaire },
  } = resource;

  const navigate = (show: string) => (selectedQuestionnaire?: any) =>
    setResource({
      ...resource,
      questionnaireResource: {
        ...resource.questionnaireResource,
        show,
        selectedQuestionnaire: selectedQuestionnaire || resource.questionnaireResource.selectedQuestionnaire,
      },
    });

  const {
    list: questionnaires,
    find: handleSearch,
    remove: handleDelete,
    submit: handleSubmit,
    setFindQuery,
  } = useRepository<any>(Models.QUESTIONNAIRE, navigate);

  useEffect(() => {
    setFindQuery({ query: { facility: undefined } });
  }, []);

  return (
    <>
      {resource.questionnaireResource.show === 'lists' && (
        <ListView
          title="Questionnaire"
          schema={QuestionnaireSchema}
          handleCreate={navigate(Views.CREATE)}
          handleSearch={handleSearch}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          items={questionnaires}
        />
      )}
      {(resource.questionnaireResource.show === 'create' || resource.questionnaireResource.show === 'edit') && (
        <QuestionnaireForm
          questionnaire={selectedQuestionnaire}
          backClick={navigate(Views.LIST)}
          onSubmit={handleSubmit}
        />
      )}
      {resource.questionnaireResource.show === 'details' && (
        <DetailView
          title="Questionnaire"
          schema={QuestionnaireSchema}
          value={selectedQuestionnaire}
          backClick={navigate(Views.LIST)}
          onEdit={() => navigate(Views.EDIT)(selectedQuestionnaire)}
          onDelete={() => handleDelete(selectedQuestionnaire)}
        />
      )}
    </>
  );
};

export default AppQuestionnaire;
