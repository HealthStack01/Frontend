import React from 'react';
import DataTable from 'react-data-table-component';
import { DebounceInput } from 'react-debounce-input';

import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import { AppointmentSchema } from '../../schema';
import { PageWrapper } from '../../styles';

const Appointments = ({ handleCreate, onRowClicked, handleSearch, items }) => {
  return (
    <PageWrapper>
      <h2>Appointments </h2>

      <TableMenu>
        <div className="inner-table">
          <DebounceInput
            className="input is-small "
            type="text"
            placeholder="Search Bands"
            minLength={1}
            debounceTimeout={400}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <Button label="Add new" onClick={handleCreate} />
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <DataTable
          title="Appointments"
          columns={AppointmentSchema.flat()}
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

export default Appointments;
