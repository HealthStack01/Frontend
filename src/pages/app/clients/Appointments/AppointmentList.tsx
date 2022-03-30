import React, { useState } from 'react';

import Button from '../../../../components/buttons/Button';
import CalenderGrid from '../../../../components/calender';
import CustomTable from '../../../../components/customtable';
import Input from '../../../../components/inputs/basic/Input';
import LocationModal from '../../../../components/locationModal';
import SwitchButton from '../../../../components/switch';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { AppointmentSchema } from '../../schema';
import { PageWrapper } from '../../styles';

const Appointments = ({ handleCreate, onRowClicked, onSearch, items }) => {
  const [listView, setListView] = useState(true);
  const locations = ['Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', 'Location 6', 'Location 7'];

  return (
    <>
      <LocationModal data={locations} />
      <PageWrapper>
        <h2>Appointments </h2>

        <TableMenu>
          <div className="inner-table">
            <Input placeholder="Search here" label="Search here" size="small" />

            <FilterMenu schema={AppointmentSchema.flat()} onSearch={onSearch} />

            <SwitchButton onClick={() => setListView(!listView)} />
          </div>

          <Button onClick={handleCreate}>
            <i className="bi bi-plus-circle"></i> Add new
          </Button>
        </TableMenu>

        <div style={{ width: '100%', height: 'calc(100vh - 200px)', overflow: 'auto' }}>
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
    </>
  );
};

export default Appointments;
