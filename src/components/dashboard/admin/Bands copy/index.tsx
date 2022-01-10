import React, { useState, useContext } from 'react';
import { ObjectContext, useObjectState } from '../../../../context/context';
import BandCreate from './indexCreate';
import BandDetails from './indexDetail';
import Bands from './indexList';
import BandModify from './indexModify';

const AppBands = () => {
  const [show, setShow] = useState('lists');
  const { module, setModule } = useObjectState();

  console.log(module.bandModule.selectedBand, setModule);
  console.log(show);
  return (
    <>
      {module.bandModule.show === 'lists' && (
        <Bands
          handleCreate={() =>
            setModule(prevState => ({
              ...prevState,
              bandModule: {
                ...prevState.bandModule,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row, event) => {
            // https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object

            setModule(prevState => ({
              ...prevState,
              bandModule: {
                show: 'details',
                selectedBand: row,
              },
            }));
          }}
        />
      )}
      {module.bandModule.show === 'create' && (
        <BandCreate
          backClick={() =>
            setModule(prevState => ({
              ...prevState,
              bandModule: {
                ...prevState.bandModule,
                show: 'lists',
              },
            }))
          }
        />
      )}
      {module.bandModule.show === 'details' && (
        <BandDetails
          row={module.bandModule.selectedBand}
          backClick={() =>
            setModule(prevState => ({
              ...prevState,
              bandModule: {
                ...prevState.bandModule,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setModule(prevState => ({
              ...prevState,
              bandModule: {
                ...prevState.bandModule,
                show: 'edit',
              },
            }))
          }
        />
      )}
      {module.bandModule.show === 'edit' && (
        <BandModify
          row={module.bandModule.selectedBand}
          backClick={() =>
            setModule(prevState => ({
              ...prevState,
              bandModule: {
                ...prevState.bandModule,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setModule(prevState => ({
              ...prevState,
              bandModule: {
                ...prevState.bandModule,
                show: 'details',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppBands;
