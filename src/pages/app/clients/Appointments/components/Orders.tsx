import React from 'react';

import Button from '../../../../../components/buttons/Button';
import CustomTable from '../../../../../components/customtable';
import { TableMenu } from '../../../../../ui/styled/global';
import { FullDetailsWrapper, PageWrapper } from '../../../styles';

const Orders = ({ onAddNew, schema, data }) => {
  return (
    <PageWrapper className="attend-wrapper p-1">
      <FullDetailsWrapper className="attend attend-large">
        <TableMenu>
          <div className="inner-table"></div>
          <Button label="Add new" onClick={onAddNew} />
        </TableMenu>
        <CustomTable
          columns={schema}
          data={data}
          pointerOnHover
          highlightOnHover
          striped
        />
      </FullDetailsWrapper>
    </PageWrapper>
  );
};

export default Orders;
