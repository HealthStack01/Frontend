import React from 'react';

import { TableMenu } from '../../../styles/global';
// import { columnLab, labData } from '../../app/clients/Appointments/data';
import Button from '../../buttons/Button';
import CustomTable from '../../customtable';
import Input from '../../inputs/basic/Input';
import FilterMenu from '../FilterMenu';

const Orders = ({ onClick, columns, data }) => {
  return (
    <div>
      <TableMenu style={{}}>
        <div className="inner-table">
          <Input placeholder="Search here" label="Search here" size="small" />
          <FilterMenu />
        </div>

        <Button label="Add new" onClick={onClick} />
      </TableMenu>
      <CustomTable columns={columns} data={data} pointerOnHover highlightOnHover striped />
    </div>
  );
};

export default Orders;
