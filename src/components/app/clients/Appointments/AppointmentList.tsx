import React from 'react';
import { DebounceInput } from 'react-debounce-input';

import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import CustomTable from '../../../customtable';
import Input from '../../../inputs/basic/Input';
import SwitchButton from '../../../switch';
import { AppointmentSchema } from '../../schema';
import { PageWrapper } from '../../styles';

const Appointments = ({ handleCreate, onRowClicked, handleSearch, items }) => {
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
          <DebounceInput
            className="input is-small "
            type="text"
            placeholder="Search Appointments"
            minLength={1}
            debounceTimeout={400}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'nowrap',
            }}
          >
            <span>Filer by</span>
            <i className="bi bi-chevron-down"></i>
          </div>
          <SwitchButton />
        </div>

        <Button onClick={handleCreate}>
          <i className="bi bi-plus-circle"></i> Add new
        </Button>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <CustomTable
          title="Appointments"
          columns={AppointmentSchema.flat()}
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

export default Appointments;
