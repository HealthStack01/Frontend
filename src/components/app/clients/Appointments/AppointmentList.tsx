import React, { useState } from 'react';

import { AppointmentSchema } from '../../../../pages/app/schema';
import { TableMenu } from '../../../../ui/styled/global';
import { PageWrapper } from '../../../../ui/styled/styles';
import Button from '../../../buttons/Button';
import CalenderGrid from '../../../calender';
import CustomTable from '../../../customtable';
import DateRange from '../../../inputs/DateRange';
import DebouncedInput from '../../../inputs/DebouncedInput';
import SwitchButton from '../../../switch';
import FilterMenu from '../../../utilities/FilterMenu';

const Appointments = ({ handleCreate, onRowClicked, handleSearch, items }) => {
  const [listView, setListView] = useState(true);
  return (
    <PageWrapper>
      <h2>Appointments </h2>

      <TableMenu className="appointment-flex">
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <DebouncedInput label="Search Appointments" onChangeValue={handleSearch} />

          <FilterMenu />
          <DateRange />

          <SwitchButton onClick={() => setListView(!listView)} />
        </div>

        <Button onClick={handleCreate}>
          <i className="bi bi-plus-circle"></i> Add new
        </Button>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        {listView ? (
          <CustomTable
            columns={AppointmentSchema.flat()}
            data={items}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={onRowClicked}
          />
        ) : (
          <CalenderGrid />
        )}
      </div>
    </PageWrapper>
  );
};

export default Appointments;
