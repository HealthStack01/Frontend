import React from 'react';

import { useObjectState } from '../../../../context/context';
import DispensaryDetails from './DispensaryDetail';
import Dispensary from './DispensaryList';

const AppDispensary = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.dispensaryResource.show === 'lists' && (
        <Dispensary
          handleCreate={() =>
            setResource(prevState => ({
              ...prevState,
              dispensaryResource: {
                ...prevState.dispensaryResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row, event) => {
            // https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object

            setResource(prevState => ({
              ...prevState,
              dispensaryResource: {
                show: 'details',
                selectedDispensary: row,
              },
            }));
          }}
        />
      )}

      {resource.dispensaryResource.show === 'details' && (
        <DispensaryDetails
          row={resource.dispensaryResource.selectedDispensary}
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              dispensaryResource: {
                ...prevState.dispensaryResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource(prevState => ({
              ...prevState,
              dispensaryResource: {
                ...prevState.dispensaryResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppDispensary;
