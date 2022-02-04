import React from 'react';
import DataTable from 'react-data-table-component';
import { ToastContainer } from 'react-toastify';

import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import { PageWrapper } from '../../styles';

import { clientFormData } from '../../ModelSchema';

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
        <div className="inner-table">
          <Input
            placeholder="Search here"
            label="Search here"
            onChange={handleSearch}
          />

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Filer by</span>
            <i className="bi bi-chevron-down"></i>
          </div>
        </div>

        <Button label="Add new" onClick={handleCreate} />
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <DataTable
          title="Clients"
          columns={clientFormData}
          data={items}
          selectableRows
          pointerOnHover
          highlightOnHover
          onRowClicked={onRowClicked}
          striped
          style={{ overflow: 'hidden' }}
        />
      </div>
      <ToastContainer />
    </PageWrapper>
  );
};

export default Clients;
