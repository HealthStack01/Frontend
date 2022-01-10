import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import { PageWrapper } from '../../styles';
import { columnHead, rowData } from './data';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (
    row: { id: any; name: string; bandType: string; description: string },
    event: any
  ) => void;
}

const Locations: React.FC<Props> = ({ handleCreate, onRowClicked }) => {
  const [details, setDetails] = useState();
  return (
    <PageWrapper>
      <h2>Locations</h2>

      <TableMenu>
        <div className='inner-table'>
          <Input placeholder='Search here' label='Search here' />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Filer by</span>
            <i className='bi bi-chevron-down'></i>
          </div>
        </div>

        <Button label='Add new' onClick={handleCreate} />
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <DataTable
          title='Locations'
          columns={columnHead}
          data={rowData}
          selectableRows
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={onRowClicked}
          // onRowClicked={(row, event) => {
          //   // setSingleBand(row);
          //   // setShowSingleBand(true);
          // }}
          style={{ overflow: 'hidden' }}
        />
      </div>
    </PageWrapper>
  );
};

export default Locations;
