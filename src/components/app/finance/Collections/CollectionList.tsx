import React from 'react';
import DataTable from 'react-data-table-component';

import { TableMenu } from '../../../../styles/global';
import CustomTable from '../../../customtable';
import Input from '../../../inputs/basic/Input';
import SwitchButton from '../../../switch';
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

const Collections: React.FC<Props> = ({ onRowClicked }) => {
  return (
    <PageWrapper>
      <h2>Collections</h2>
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'nowrap',
            }}
          >
            <span>Filer by</span>
            <i className="bi bi-chevron-down"></i>
          </div>
          <SwitchButton />
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <CustomTable
          title="Collections"
          columns={columnHead}
          data={rowData}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={onRowClicked}
        />
      </div>
    </PageWrapper>
  );
};

export default Collections;
