import React, { useState } from 'react';

import Button from '../../../../../components/buttons/Button';
import CustomTable from '../../../../../components/customtable';
import Input from '../../../../../components/inputs/basic/Input';
import FilterMenu from '../../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../../ui/styled/global';
import { FullDetailsWrapper, PageWrapper } from '../../../styles';
import Document from './FormBox';

const Orders = ({ onClick: _onClick, schema, data }) => {
  const [open, setOpen] = useState(false);
  return (
    <PageWrapper className="attend-wrapper p-1">
      <FullDetailsWrapper className="attend attend-large">
        <TableMenu>
          <div className="inner-table">
            <Input placeholder="Search here" label="Search here" size="small" />
            <FilterMenu />
          </div>
          <Button label="Add new" onClick={() => setOpen(true)} />
        </TableMenu>
        <CustomTable columns={schema} data={data} pointerOnHover highlightOnHover striped selectable />
      </FullDetailsWrapper>
      {open && (
        <FullDetailsWrapper className="attend attend-medium">
          <Document schema={schema} onCancel={() => setOpen(false)} onSubmit={() => {}} />
        </FullDetailsWrapper>
      )}
    </PageWrapper>
  );
};

export default Orders;
