import React, { useEffect } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import DetailView from '../../generic/DetailView';
import FormView from '../../generic/FormView';
import ListView from '../../generic/ListView';
import { FormType } from '../../schema/util';
import { BandSchema } from '../schema';

const AppBand = () => {
  const { resource, setResource } = useObjectState();
  const {
    bandResource: { selectedBand },
  } = resource;

  const navigate = (show: string) => (selectedBand?: any) => {
    console.debug({ show, selectedBand });
    setResource({
      ...resource,
      bandResource: {
        ...resource.bandResource,
        show,
        selectedBand: selectedBand?._id
          ? selectedBand
          : resource.bandResource.selectedBand,
      },
    });
  };

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
      {resource.bandResource.show === FormType.LIST && (
        <ListView
          title="Band"
          schema={BandSchema}
          handleCreate={navigate(Views.CREATE)}
          handleSearch={handleSearch}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          items={bands}
        />
      )}
      {(resource.bandResource.show === FormType.CREATE ||
        resource.bandResource.show === FormType.EDIT) && (
        <FormView
          title="Band"
          schema={BandSchema}
          backClick={navigate(Views.LIST)}
          onSubmit={handleSubmit}
          selectedData={selectedBand}
        />
      )}
      {resource.bandResource.show === FormType.DETAIL && (
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
