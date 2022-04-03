import React, { useEffect } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import DetailView from '../../generic/DetailView';
import FormView from '../../generic/FormView';
import ListView from '../../generic/ListView';
import { BandSchema } from '../../schema';

const AppBand = () => {
  const { resource, setResource } = useObjectState();
  const {
    bandResource: { selectedBand },
  } = resource;

  const navigate = (show: string) => (selectedBand?: any) =>
    setResource({
      ...resource,
      bandResource: {
        ...resource.bandResource,
        show,
        selectedBand: selectedBand || resource.bandResource.selectedBand,
      },
    });

  const {
    list: bands,
    find: handleSearch,
    remove: handleDelete,
    submit: handleSubmit,
    setFindQuery,
  } = useRepository<any>(Models.BAND, navigate);

  useEffect(() => {
    setFindQuery({ query: { facility: undefined } });
  }, []);

  return (
    <>
      {resource.bandResource.show === 'lists' && (
        <ListView
          title="Band"
          schema={BandSchema}
          handleCreate={navigate(Views.CREATE)}
          handleSearch={handleSearch}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          items={bands}
        />
      )}
      {(resource.bandResource.show === 'create' || resource.bandResource.show === 'edit') && (
        <FormView
          title="Band"
          schema={BandSchema}
          backClick={navigate(Views.LIST)}
          onSubmit={handleSubmit}
          selectedData={selectedBand}
        />
      )}
      {resource.bandResource.show === 'details' && (
        <DetailView
          title="Band"
          schema={BandSchema}
          value={selectedBand}
          backClick={navigate(Views.LIST)}
          onEdit={() => navigate(Views.EDIT)(selectedBand)}
          onDelete={() => handleDelete(selectedBand)}
        />
      )}
    </>
  );
};

export default AppBand;
