import React, { useState } from 'react';

import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import CalenderGrid from '../../../calender';
import CustomTable from '../../../customtable';
import Input from '../../../inputs/basic/Input';
import DateRange from '../../../inputs/DateRange';
import SwitchButton from '../../../switch';
import FilterMenu from '../../../utilities/FilterMenu';
import { PageWrapper } from '../../styles';
import { columnsAppointment, dataAppointments } from '../data';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (row: any, event: any) => void;
}

const Appointments: React.FC<Props> = ({ handleCreate, onRowClicked }) => {
  const [listView, setListView] = useState(true);
  console.log(listView);
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
          <Input placeholder="Search here" label="Search here" size="small" />
          {/* <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'nowrap',
            }}
          >
            <span>Filer by</span>
            <i className='bi bi-chevron-down'></i>
          </div> */}
          <FilterMenu />
          <SwitchButton onClick={() => setListView(!listView)} />
        </div>

        <Button onClick={handleCreate}>
          <i className="bi bi-plus-circle"></i> Add new
        </Button>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        {listView ? (
          <CustomTable
            columns={columnsAppointment}
            data={dataAppointments}
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
