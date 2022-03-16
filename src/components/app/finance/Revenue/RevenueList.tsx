import React from 'react';
import { DebounceInput } from 'react-debounce-input';

import { TableMenu } from '../../../../styles/global';
import CustomTable from '../../../customtable';
import Input from '../../../inputs/basic/Input';
import SwitchButton from '../../../switch';
import { RevenueSchema } from '../../schema/ModelSchema';
import { PageWrapper } from '../../styles';

interface Props {
  handleCreate?: () => void;
  handleSearch: (_event) => void;
  onRowClicked?: (
    _row: {
      id: any;
      date: any;
      description: string;
      client: string;
      amount: number;
      mode: string;
    },
    _event: any
  ) => void;
  items: any[];
}

const Revenue: React.FC<Props> = ({ onRowClicked, handleSearch, items }) => {
  return (
    <PageWrapper>
      <h2>Revenue</h2>
      <TableMenu>
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <Input placeholder="Search here" label="Search here" size="small"  onChange={(e) => handleSearch(e.target.value)} />
          
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
          title="Revenues"
          columns={RevenueSchema}
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

export default Revenue;
