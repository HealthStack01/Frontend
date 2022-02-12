import React from 'react';
import DataTable from 'react-data-table-component';
import { DebounceInput } from 'react-debounce-input';

import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import { BandSchema } from '../../schema/ModelSchema';
import { PageWrapper } from '../../styles';

const Bands = ({ handleCreate, handleSearch, onRowClicked, items }) => {
  return (
    <PageWrapper>
      <h2>Bands</h2>

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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Filer by</span>
            <i className="bi bi-chevron-down" />
          </div>
        </div>

        <Button label="Add new" onClick={handleCreate} />
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <DataTable
          title="Bands"
          columns={BandSchema}
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

export default Bands;
