import React from 'react';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { BillsSummary } from '../../schema';
import { PageWrapper } from '../../styles';

const BillClient = ({ handleCreate, onRowClicked, onSearch, progressPending, items }) => {
  return (
    <>
      <PageWrapper>
        <h2>Bill Client </h2>
        <TableMenu>
          <div
            className="inner-table"
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '40px',
            }}
          >
            {/* <Input placeholder="Search here" label="Search here" size="small" /> */}

            <FilterMenu schema={BillsSummary} onSearch={onSearch} />
          </div>

          <Button onClick={handleCreate}>
            <i className="bi bi-plus-circle"></i> Add new
          </Button>
        </TableMenu>

        <div style={{ width: '100%', height: 'calc(100vh - 200px)', overflow: 'auto' }}>
          <CustomTable
            title="Bills"
            columns={BillsSummary}
            data={items}
            pointerOnHover
            highlightOnHover
            onRowClicked={onRowClicked}
            striped
            progressPending={progressPending}
          />
        </div>
      </PageWrapper>
    </>
  );
};

export default BillClient;
