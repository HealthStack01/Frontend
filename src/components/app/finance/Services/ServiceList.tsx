import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import CollapsableGrid from '../../../datagrids/CollapsableGrid';
import Input from '../../../inputs/basic/Input';
import { PageWrapper } from '../../styles';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (row: any, event: any) => void;
}

export interface DataProps {
  id: any;
  name: string;
  panel: string;
  amount: string;
}

export const rowData = [
  {
    id: 1,
    name: 'Contour 1',
    panel: 'No',
    amount: '5000',
  },
  {
    id: 2,
    name: 'Contour 1',
    panel: 'No',
    amount: '5000',
  },
  {
    id: 3,
    name: 'Contour 1',
    panel: 'No',
    amount: '5000',
  },
];

const dataTree = [
  {
    title: 'Service 1',
    data: rowData,
  },
  {
    title: 'Service 2',
    data: rowData,
  },
  {
    title: 'Service 3',
    data: rowData,
  },
];

export const columnHead: TableColumn<DataProps>[] = [
  {
    name: 'S/N',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Panel',
    selector: row => row.panel,
    sortable: true,
  },

  {
    name: 'Amount',
    selector: row => row.amount,
    sortable: true,
  },
];

const Servicess: React.FC<Props> = ({ handleCreate, onRowClicked }) => {
  return (
    <PageWrapper>
      <h2>Services </h2>

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
        {dataTree.map((data, index) => (
          <CollapsableGrid
            key={index}
            columnHead={columnHead}
            description={data.title}
            title={data.title}
            rowData={data.data}
            onRowClicked={onRowClicked}
          />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Servicess;
