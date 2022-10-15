import React, { useEffect } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import DetailView from '../../generic/DetailView';
import FormView from '../../generic/FormView';
import ListView from '../../generic/ListView';
import { FormType } from '../../schema/util';
import { LocationSchema } from '../schema';

const AppLocation = () => {
  const { resource, setResource } = useObjectState();
  const {
    locationResource: { selectedLocation },
  } = resource;

  const navigate = (show: string) => (selectedLocation?: any) =>
    setResource({
      ...resource,
      locationResource: {
        ...resource.locationResource,
        show,
        selectedLocation: selectedLocation?._id
          ? selectedLocation
          : resource.locationResource.selectedLocation,
      },
    });

  const {
    list: locations,
    find: handleSearch,
    remove: handleDelete,
    submit: handleSubmit,
    setFindQuery,
  } = useRepository<any>(Models.LOCATION, navigate);

  useEffect(() => {
    setFindQuery({ query: { facility: undefined } });
  }, []);

  return (
    <>
      {resource.locationResource.show === 'lists' && (
        <ListView
          title="Location"
          schema={LocationSchema}
          handleCreate={navigate(Views.CREATE)}
          handleSearch={handleSearch}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          items={locations}
        />
      )}
      {(resource.locationResource.show === FormType.CREATE ||
        resource.locationResource.show === FormType.EDIT) && (
        <FormView
          title="Location"
          schema={LocationSchema}
          backClick={navigate(Views.LIST)}
          onSubmit={handleSubmit}
          selectedData={selectedLocation}
        />
      )}
      {resource.locationResource.show === FormType.DETAIL && (
        <DetailView
          title="Location"
          schema={LocationSchema}
          value={selectedLocation}
          backClick={navigate(Views.LIST)}
          onEdit={() => navigate(Views.EDIT)(selectedLocation)}
          onDelete={() => handleDelete(selectedLocation)}
        />
      )}
    </>
  );
};

export default AppLocation;
