import React from 'react';

import CustomTable from '../../../../components/customtable';
import Input from '../../../../components/inputs/basic/Input';
import SwitchButton from '../../../../components/switch';
import { TableMenu } from '../../../../ui/styled/global';
import { CollectionSchema } from '../../schema/ModelSchema';
import { PageWrapper } from '../../styles';

interface Props {
  handleCreate?: () => void;
  handleSearch: (_event) => void;
  items: any[];
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

const Collections: React.FC<Props> = ({ onRowClicked, handleSearch, items }) => {
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
          <Input
            placeholder="Search here"
            label="Search here"
            size="small"
            onChange={(e) => handleSearch(e.target.value)}
          />
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
          columns={CollectionSchema}
          data={items}
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
