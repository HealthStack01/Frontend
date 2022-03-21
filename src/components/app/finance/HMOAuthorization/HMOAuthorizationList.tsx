import React from 'react';
import DataTable from 'react-data-table-component';

import { columnHead, rowData } from '../../../../pages/app/managedCare/PreAuthorization/data';
import { TableMenu } from '../../../../ui/styled/global';
import { PageWrapper } from '../../../../ui/styled/styles';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import FilterMenu from '../../../utilities/FilterMenu';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (row: { id: any; name: string; locationType: string }, event: any) => void;
}

const HMOAuthorization: React.FC<Props> = ({ handleCreate, onRowClicked }) => {
  return (
    <PageWrapper>
      <h2>HMO Authorization</h2>

      <TableMenu>
        <div className="inner-table">
          <Input placeholder="Search here" label="Search here" />
          <FilterMenu />
        </div>

        <Button label="Add new" onClick={handleCreate} />
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <DataTable
          title="HMO Authorization"
          columns={columnHead}
          data={rowData}
          selectableRows
          pointerOnHover
          highlightOnHover
          striped
          style={{ overflow: 'hidden' }}
        />
      </div>
    </PageWrapper>
  );
};

export default HMOAuthorization;
