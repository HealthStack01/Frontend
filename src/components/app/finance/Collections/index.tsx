import React from 'react';

import { useObjectState } from '../../../../context/context';
import EmployeeCreate from './CollectionCreate';
import EmployeeDetails from './CollectionDetail';
import Employees from './CollectionList';
import EmployeeModify from './CollectionModify';

const AppCollections = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.collectionsResource.show === 'lists' && (
        <Employees
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
      {resource.collectionsResource.show === 'create' && (
        <EmployeeCreate
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              collectionsResource: {
                ...prevState.collectionsResource,
                show: 'lists',
              },
            }))
          }
        />
      )}
      {resource.collectionsResource.show === 'details' && (
        <EmployeeDetails
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
      {resource.collectionsResource.show === 'edit' && (
        <EmployeeModify
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
          cancelEditClicked={() =>
            setResource(prevState => ({
              ...prevState,
              collectionsResource: {
                ...prevState.collectionsResource,
                show: 'details',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppCollections;
