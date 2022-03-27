import React from 'react';
import { TableColumn } from 'react-data-table-component';

import Button from '../../../../components/buttons/Button';
import CollapsableGrid from '../../../../components/datagrids/CollapsableGrid';
import Input from '../../../../components/inputs/basic/Input';
import LocationModal from '../../../../components/locationModal';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { PageWrapper } from '../../styles';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (
    row: {
      id: any;
      date: any;
      status: string;
      description: string;
      amount: string;
    },
    event: any
  ) => void;
}

export interface DataProps {
  id: any;
  date: string;
  description: string;
  status: string;
  amount: string;
}

export const rowData = [
  {
    id: 1,
    date: '2022-01-20 19:45',
    description: 'lorem',
    status: 'unpaid',
    amount: '5000',
  },
  {
    id: 2,
    date: '2022-01-20 19:45',
    description: 'lorem',
    status: 'unpaid',
    amount: '5000',
  },
  {
    id: 3,
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

const BillClient: React.FC<Props> = ({ handleCreate, onRowClicked }) => {
  const locations = ['Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', 'Location 6', 'Location 7'];
  return (
    <>
      <LocationModal data={locations} />

      <PageWrapper>
        <h2>Bill Client </h2>
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

          <Button onClick={handleCreate}>
            <i className="bi bi-plus-circle"></i> Add new
          </Button>
        </TableMenu>

        <div style={{ width: '100%', height: 'calc(100vh - 200px)', overflow: 'auto' }}>
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
    </>
  );
};

export default BillClient;
