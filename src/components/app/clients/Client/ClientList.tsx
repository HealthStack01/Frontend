import React from 'react';
import DataTable from 'react-data-table-component';
import { ToastContainer } from 'react-toastify';

import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import CustomTable from '../../../customtable';
import Input from '../../../inputs/basic/Input';
import SwitchButton from '../../../switch';
import FilterMenu from '../../../utilities/FilterMenu';
import { ClientMiniSchema } from '../../schema';
import { PageWrapper } from '../../styles';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (row: any, event: any) => void;
  items: any[];
  handleSearch: (_) => void;
}

const Clients: React.FC<Props> = ({
  handleCreate,
  onRowClicked,
  handleSearch,
  items,
}) => {
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

          <SwitchButton />
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
      <ToastContainer />
    </PageWrapper>
  );
};

export default Clients;
