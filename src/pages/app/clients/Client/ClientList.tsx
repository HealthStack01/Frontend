import React from 'react';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import Input from '../../../../components/inputs/basic/Input';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
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

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
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
