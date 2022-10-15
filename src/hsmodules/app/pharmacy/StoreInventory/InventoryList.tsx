import React from 'react';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { PageWrapper } from '../../styles';
import { InventoryStoreSchema } from '../schema';

const Inventory = ({ onRowClicked, items, onSearch, onBackClick }) => {
  return (
    <PageWrapper>
      <h2>Inventory</h2>
      <div>
        <Button
          label="Back to List"
          background="#fdfdfd"
          color="#333"
          onClick={onBackClick}
        />
      </div>

      <TableMenu>
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <FilterMenu onSearch={onSearch} />
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <CustomTable
          title="Inventory"
          columns={InventoryStoreSchema}
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

export default Inventory;
