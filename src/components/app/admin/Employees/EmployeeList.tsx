import React from 'react';
import DataTable from 'react-data-table-component';
import { DebounceInput } from 'react-debounce-input';

import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import { EmployeeSchema } from '../../schema/ModelSchema';
import { PageWrapper } from '../../styles';

const Employees = ({ handleCreate, handleSearch, onRowClicked, items }) => {
  return (
    <PageWrapper>
      <h2>Employees</h2>

      <TableMenu>
        <div className="inner-table">
          <Input placeholder="Search here" label="Search here" onChange={handleSearch} />
          <DebounceInput
            className="input is-small "
            type="text"
            placeholder="Search Employees"
            minLength={1}
            debounceTimeout={400}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Filer by</span>
            <i className="bi bi-chevron-down" />
          </div>
        </div>

        <Button label="Add new" onClick={handleCreate} />
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <DataTable
          title="Employees"
          columns={EmployeeSchema}
          data={items}
          selectableRows
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={onRowClicked}
          style={{ overflow: 'hidden' }}
        />
      </div>
    </PageWrapper>
  );
};

export default Employees;
