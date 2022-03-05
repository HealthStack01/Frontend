import React from 'react';
import { TableColumn } from 'react-data-table-component';

import { TableMenu } from '../../../../styles/global';
import CollapsableGrid from '../../../datagrids/CollapsableGrid';
import Input from '../../../inputs/basic/Input';
import FilterMenu from '../../../utilities/FilterMenu';
import { PageWrapper } from '../../styles';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (row: any, event: any) => void;
}

export interface DataProps {
  id: any;
  date: string;
  name: string;
  description: string;
  status: string;
  amount: string;
}

export const rowData = [
  {
    id: 1,
    name: 'Wale Ojo',
    date: '2022-01-20 19:45',
    description: 'lorem',
    status: 'unpaid',
    amount: '5000',
  },
  {
    id: 2,
    name: 'Wale Ojo',
    date: '2022-01-20 19:45',
    description: 'lorem',
    status: 'unpaid',
    amount: '5000',
  },
  {
    id: 3,
    name: 'Wale Ojo',
    date: '2022-01-20 19:45',
    description: 'lorem',
    status: 'unpaid',
    amount: '5000',
  },
];

const dataTree = [
  {
    title: 'Ada Chris',
    description: 'Prescription of one unpaid bill(s)',
    data: rowData,
  },
  {
    title: 'John Doela Pat',
    description: 'Prescription of one unpaid bill(s)',
    data: rowData,
  },
  {
    title: 'Simpa E Dania',
    description: 'Prescription of one unpaid bill(s)',
    data: rowData,
  },
];

export const columnHead: TableColumn<DataProps>[] = [
  {
    name: 'S/N',
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: 'Date',
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: 'Description',
    selector: (row) => row.description,
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: 'Amount',
    selector: (row) => row.amount,
    sortable: true,
  },
];

const Dispensary: React.FC<Props> = ({ onRowClicked }) => {
  return (
    <PageWrapper>
      <h2>Dispensary</h2>

      <TableMenu>
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <Input placeholder="Search here" label="Search here" size="small" />

          <FilterMenu />
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        {dataTree.map((data, index) => (
          <CollapsableGrid
            key={index}
            columnHead={columnHead}
            description={data.description}
            title={data.title}
            rowData={data.data}
            onRowClicked={onRowClicked}
          />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Dispensary;
