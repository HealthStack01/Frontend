import React, { useState } from 'react';
import EmployeeCreate from './indexCreate';
import BandCreate from './indexCreate';
import EmployeeDetails from './indexDetail';
import BandDetails from './indexDetail';
import Employees from './indexList';
import Bands from './indexList';
import EmployeeModify from './indexModify';
import BandModify from './indexModify';

const AppEmployees = () => {
  const [show, setShow] = useState('lists');
  const [deets, setDeets] = useState({});

  console.log(deets);
  console.log(show);
  return (
    <>
      {show === 'lists' && (
        <Employees
          handleCreate={() => setShow('create')}
          onRowClicked={(row, event) => {
            setDeets(row);
            setShow('details');
          }}
        />
      )}
      {show === 'create' && <EmployeeCreate />}
      {show === 'details' && (
        <EmployeeDetails row={deets} editBtnClicked={() => setShow('edit')} />
      )}
      {show === 'edit' && (
        <EmployeeModify
          row={deets}
          cancelEditClicked={() => setShow('details')}
        />
      )}
    </>
  );
};

export default AppEmployees;
