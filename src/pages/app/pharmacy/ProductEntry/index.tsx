import React from 'react';

import { useObjectState } from '../../../../context/context';
import ProductEntryCreate from './ProductEntryCreate';
import ProductEntryDetails from './ProductEntryDetail';
import ProductEntryList from './ProductEntryList';

const AppProductEntry = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.employeeResource.show === 'lists' && (
        <ProductEntryList
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row, _event) => {
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                show: 'details',
                selectedEmployee: row,
              },
            }));
          }}
        />
      )}
      {resource.employeeResource.show === 'create' && (
        <ProductEntryCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'lists',
              },
            }))
          }
        />
      )}
      {resource.employeeResource.show === 'details' && (
        <ProductEntryDetails
          row={resource.employeeResource.selectedEmployee}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'lists',
              },
            }))
          }
        />
      )}
      =
    </>
  );
};

export default AppProductEntry;
