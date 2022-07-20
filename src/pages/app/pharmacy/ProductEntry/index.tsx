import React, { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import DetailView from '../../generic/DetailView';
import FormView from '../../generic/FormView';
import ListView from '../../generic/ListView';
import { FormType } from '../../schema/util';
import { ProductEntrySchema } from '../schema';
import { productEntryQuery } from './query';

const AppProductEntry = () => {
  const { resource, setResource } = useObjectState();
  const {
    productEntryResource: { selectedProductEntry },
  } = resource;

  const navigate = (show: string) => (selectedProductEntry?: any) =>
    setResource({
      ...resource,
      productEntryResource: {
        ...resource.productEntryResource,
        show,
        selectedProductEntry: selectedProductEntry?._id
          ? selectedProductEntry
          : resource.productEntryResource.selectedProductEntry,
      },
    });
  const [searchText, setSearchText] = useState('');

  const {
    list: productEntries,
    remove: handleDelete,
    submit: handleSubmit,
    facility,
    location,
    setFindQuery,
  } = useRepository<any>(Models.PRODUCTENTRY, navigate);

  useEffect(() => {
    setFindQuery(
      productEntryQuery(facility?._id, location?._id, searchText || undefined)
    );
  }, []);

  return (
    <>
      {resource.productEntryResource.show === 'lists' && (
        <ListView
          title="Product Entry"
          schema={ProductEntrySchema}
          handleCreate={navigate(Views.CREATE)}
          handleSearch={setSearchText}
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          items={productEntries}
        />
      )}
      {(resource.productEntryResource.show === FormType.CREATE ||
        resource.productEntryResource.show === FormType.EDIT) && (
        <FormView
          title="Product Entry"
          schema={ProductEntrySchema}
          backClick={navigate(Views.LIST)}
          onSubmit={handleSubmit}
          selectedData={selectedProductEntry}
        />
      )}

      {resource.productEntryResource.show === FormType.DETAIL && (
        <DetailView
          title="Product Entry"
          schema={ProductEntrySchema}
          value={selectedProductEntry}
          backClick={navigate(Views.LIST)}
          onEdit={() => navigate(Views.EDIT)(selectedProductEntry)}
          onDelete={() => handleDelete(selectedProductEntry)}
        />
      )}
    </>
  );
};

export default AppProductEntry;
