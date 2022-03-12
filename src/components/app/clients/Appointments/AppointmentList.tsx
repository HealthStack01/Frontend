import React, { useState } from 'react';

import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import CalenderGrid from '../../../calender';
import CustomTable from '../../../customtable';
import DateRange from '../../../inputs/DateRange';
import SwitchButton from '../../../switch';
import FilterMenu from '../../../utilities/FilterMenu';
import DebouncedInput from '../../DebouncedInput';
import { AppointmentSchema } from '../../schema';
import { PageWrapper } from '../../styles';

const Appointments = ({ handleCreate, onRowClicked, onSearch, items }) => {
  const [listView, setListView] = useState(true);

  return (
    <PageWrapper>
      <h2>Appointments </h2>

      <TableMenu>
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <DebouncedInput label="Search Appointments" onChangeValue={onSearch} />
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
