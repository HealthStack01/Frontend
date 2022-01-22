import React from 'react';

import { useObjectState } from '../../../../context/context';
import CollectionDetails from './CollectionDetail';
import Collections from './CollectionList';

const AppCollections = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.collectionsResource.show === 'lists' && (
        <Collections
          handleCreate={() =>
            setResource(prevState => ({
              ...prevState,
              collectionsResource: {
                ...prevState.collectionsResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row, event) => {
            // https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object

            setResource(prevState => ({
              ...prevState,
              collectionsResource: {
                show: 'details',
                selectedCollection: row,
              },
            }));
          }}
        />
      )}

      {resource.collectionsResource.show === 'details' && (
        <CollectionDetails
          row={resource.collectionsResource.selectedCollection}
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              collectionsResource: {
                ...prevState.collectionsResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource(prevState => ({
              ...prevState,
              collectionsResource: {
                ...prevState.collectionsResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppCollections;
