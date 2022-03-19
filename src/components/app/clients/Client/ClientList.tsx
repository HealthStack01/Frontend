import React from 'react';

import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import CustomTable from '../../../customtable';
import Input from '../../../inputs/basic/Input';
import FilterMenu from '../../../utilities/FilterMenu';
import { ClientMiniSchema } from '../../schema';
import { PageWrapper } from '../../styles';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (row: any, event: any) => void;
  items: any[];
  handleSearch: (_) => void;
}

const Clients: React.FC<Props> = ({ handleCreate, onRowClicked, items }) => {
  return (
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

      <div style={{ width: '100%', height: 'auto', overflow: 'auto' }}>
        <CustomTable
          title="Clients"
          columns={ClientMiniSchema}
          data={items}
          pointerOnHover
          highlightOnHover
          onRowClicked={onRowClicked}
          striped
        />
      </div>
    </PageWrapper>
  );
};

export default Clients;
