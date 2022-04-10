import React from 'react';

import CustomTable from '../../../../components/customtable';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { PaymentsSummary } from '../../schema';
import { PageWrapper } from '../../styles';

const Payments = ({ onMakePayment, onSearch: _, items, loading = false }) => {
  return (
    <PageWrapper>
      <h2>Payments</h2>

      <TableMenu>
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <FilterMenu />
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <CustomTable
          title="Payments"
          columns={PaymentsSummary}
          data={items}
          pointerOnHover
          highlightOnHover
          onRowClicked={onMakePayment}
          striped
          progressPending={loading}
        />
      </div>
    </PageWrapper>
  );
};

export default Payments;
