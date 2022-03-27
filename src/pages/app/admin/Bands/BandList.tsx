import React from 'react';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import DebouncedInput from '../../../../components/inputs/DebouncedInput';
import LocationModal from '../../../../components/locationModal';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { BandSchema } from '../../schema/ModelSchema';
import { PageWrapper } from '../../styles';

const Bands = ({ handleCreate, handleSearch, onRowClicked, items }) => {
  const locations = ['Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', 'Location 6', 'Location 7'];

  return (
    <>
      <LocationModal data={locations} />
      <PageWrapper>
        <h2>Bands</h2>

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

        <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
          <CustomTable
            title="Bands"
            columns={BandSchema}
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

export default Bands;
