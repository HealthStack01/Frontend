import React from 'react';g

import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import CustomTable from '../../../customtable';
import FilterMenu from '../../../utilities/FilterMenu';
import DebouncedInput from '../../DebouncedInput';
import { EmployeeSchema } from '../../schema/ModelSchema';
import { PageWrapper } from '../../styles';

const Employees = ({ handleCreate, handleSearch, onRowClicked, items }) => {
  return (
    <PageWrapper>
      <h2>Employees</h2>

      <TableMenu>
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <DebouncedInput label="Search Bands" onChangeValue={handleSearch} />

          <FilterMenu />
        </div>

        <Button onClick={handleCreate}>
          <i className="bi bi-plus-circle"></i> Add new
        </Button>
      </TableMenu>

      <div style={{ width: '100%', height: 'auto', overflow: 'auto' }}>
        <CustomTable
          title="Employees"
          columns={EmployeeSchema}
          data={items}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={onRowClicked}
        />
      </div>
    </PageWrapper>
  );
};

export default Employees;
