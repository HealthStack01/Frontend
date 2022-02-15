import React from 'react';
import DataTable from 'react-data-table-component';

import { TableMenu } from '../../../../styles/global';
import Input from '../../../inputs/basic/Input';
import { PageWrapper } from '../../styles';
import { columnHead, rowData } from './data';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (
    row: {
      id: any;
      name: string;
      client: string;
      amount: string;
      mode: string;
    },
    event: any
  ) => void;
}

const PreAuthorizations: React.FC<Props> = ({ onRowClicked }) => {
  return (
    <PageWrapper>
      <h2>PreAuthorizations</h2>

      <TableMenu>
        <div className="inner-table">
          <Input placeholder="Search here" label="Search here" />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Filer by</span>
            <i className="bi bi-chevron-down"></i>
          </div>
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <DataTable
          title="PreAuthorizations"
          columns={columnHead}
          data={rowData}
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

export default PreAuthorizations;
