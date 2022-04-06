import React from 'react';
import { TableColumn } from 'react-data-table-component';

import CustomTable from '../../../../components/customtable';
import Input from '../../../../components/inputs/basic/Input';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { PageWrapper } from '../../styles';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (row: any, event: any) => void;
}

export interface DataProps {
  title: any;
  description: string;
  data: any;
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
    name: 'Title',
    selector: (row) => row.title,
    sortable: true,
  },

  {
    name: 'Description',
    selector: (row) => row.description,
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
        <CustomTable
          columns={columnHead}
          data={dataTree}
          pointerOnHover
          highlightOnHover
          onRowClicked={onRowClicked}
          striped
        />
      </div>
    </PageWrapper>
  );
};

export default Dispensary;
