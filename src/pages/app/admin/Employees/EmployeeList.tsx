import React from 'react';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import DebouncedInput from '../../../../components/inputs/DebouncedInput';
import LocationModal from '../../../../components/locationModal';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { EmployeeSchema } from '../../schema/ModelSchema';
import { PageWrapper } from '../../styles';

const Employees = ({ handleCreate, handleSearch, onRowClicked, items }) => {
  const locations = ['Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', 'Location 6', 'Location 7'];
  return (
    <>
      <LocationModal data={locations} />
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
    </>
  );
};

export default Employees;
