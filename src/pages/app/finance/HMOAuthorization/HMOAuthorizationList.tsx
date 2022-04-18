import React from 'react';
import DataTable from 'react-data-table-component';

import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/basic/Input';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { PageWrapper } from '../../styles';
import { columnHead, rowData } from './data';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (
    row: { id: any; name: string; locationType: string },
    event: any,
  ) => void;
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
          onRowClicked={onRowClicked}
          style={{ overflow: 'hidden' }}
        />
      </div>
    </PageWrapper>
  );
};

export default HMOAuthorization;
