import React from 'react';
import DataTable from 'react-data-table-component';

import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import { PageWrapper } from '../../styles';
import { columnHead, rowData } from './data';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (row: { id: any; name: string; locationType: string }, event: any) => void;
}

const Collections: React.FC<Props> = ({ handleCreate, onRowClicked }) => {
  return (
    <PageWrapper>
      <h2>Collections</h2>

      <TableMenu>
        <div className="inner-table">
          <Input placeholder="Search here" label="Search here" />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Filer by</span>
            <i className="bi bi-chevron-down"></i>
          </div>
        </div>

        <Button label="Add new" onClick={handleCreate} />
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <DataTable
          title="Collections"
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

export default Collections;
