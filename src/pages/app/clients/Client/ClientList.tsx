import React from 'react';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import Input from '../../../../components/inputs/basic/Input';
import LocationModal from '../../../../components/locationModal';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { ClientMiniSchema } from '../../schema';
import { PageWrapper } from '../../styles';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (row: any, event: any) => void;
  items: any[];
  handleSearch: (_) => void;
  progressPending?: any;
}

const Clients: React.FC<Props> = ({ handleCreate, onRowClicked, items, progressPending }) => {
  const locations = ['Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', 'Location 6', 'Location 7'];

  return (
    <>
      <LocationModal data={locations} />
      <PageWrapper>
        <h2> Client </h2>

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

            <FilterMenu />
          </div>

          <Button onClick={handleCreate}>
            <i className="bi bi-plus-circle"></i> Add new
          </Button>
        </TableMenu>

        <div style={{ width: '100%', height: 'calc(100vh - 200px)', overflow: 'auto' }}>
          <CustomTable
            title="Clients"
            columns={ClientMiniSchema}
            data={items}
            pointerOnHover
            highlightOnHover
            onRowClicked={onRowClicked}
            striped
            progressPending={progressPending}
          />
        </div>
      </PageWrapper>
    </>
  );
};

export default Clients;
