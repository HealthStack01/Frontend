import React from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import ListView from '../../generic/ListView';
import { SubmissionSchema } from '../../schema/communication';
import SubmissionDetails from './SubmissionDetail';
import SubmissionForm from './SubmissionForm';

const AppSubmission = () => {
  const { resource, setResource } = useObjectState();
  const {
    submissionResource: { selectedSubmission },
  } = resource;

  const navigate = (show: string) => (selectedSubmission?: any) =>
    setResource({
      ...resource,
      submissionResource: {
        ...resource.submissionResource,
        show,
        selectedSubmission: selectedSubmission || resource.submissionResource.selectedSubmission,
      },
    });

  const {
    list: submissions,
    find: handleSearch,
    remove: handleDelete,
    submit: handleSubmit,
  } = useRepository<any>(Models.SUBMISSION, navigate);

  return (
    <>
      {resource.submissionResource.show === 'lists' && (
        <ListView
          title="Submission"
          schema={SubmissionSchema}
          handleCreate={navigate(Views.CREATE)}
          handleSearch={handleSearch}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          items={submissions}
        />
      )}
      {(resource.submissionResource.show === 'create' || resource.submissionResource.show === 'edit') && (
        <SubmissionForm backClick={navigate(Views.LIST)} onSubmit={handleSubmit} data={selectedSubmission} />
      )}
      {resource.submissionResource.show === 'details' && (
        <SubmissionDetails
          backClick={navigate(Views.LIST)}
          onEdit={() => navigate(Views.EDIT)(selectedSubmission)}
          onDelete={() => handleDelete(selectedSubmission)}
          row={selectedSubmission}
        />
      )}
    </>
  );
};

export default AppSubmission;
