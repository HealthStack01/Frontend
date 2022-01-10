import React, { useState } from 'react';
import LocationCreate from './indexCreate';
import LocationDetails from './indexDetail';
import EmployeeDetails from './indexDetail';
import Locations from './indexList';
import LocationModify from './indexModify';
import EmployeeModify from './indexModify';

const AppLocation = () => {
  const [show, setShow] = useState('lists');
  const [deets, setDeets] = useState({});

  console.log(deets);
  console.log(show);
  return (
    <>
      {show === 'lists' && (
        <Locations
          handleCreate={() => setShow('create')}
          onRowClicked={(row, event) => {
            setDeets(row);
            setShow('details');
          }}
        />
      )}
      {show === 'create' && <LocationCreate />}
      {show === 'details' && (
        <LocationDetails row={deets} editBtnClicked={() => setShow('edit')} />
      )}
      {show === 'edit' && (
        <LocationModify
          row={deets}
          cancelEditClicked={() => setShow('details')}
        />
      )}
    </>
  );
};

export default AppLocation;
