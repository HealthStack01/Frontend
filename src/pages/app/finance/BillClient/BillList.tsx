import React from 'react';
import { TableColumn } from 'react-data-table-component';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import SearchInput from '../../../../components/inputs/Search';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { PageWrapper } from '../../styles';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (
    row: {
      id: any;
      name: any;
      data: any;
      date: any;
      status: string;
      description: string;
      amount: string;
    },
    event: any
  ) => void;
  progressPending?: any;
}

export interface DataProps {
  id: any;
  date: string;
  description: string;
  status: string;
  amount: string;
}

export interface TableProps {
  id: any;
  name: string;
  data: any;
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

const data = [
  {
    id: '1',
    name: 'John Doe',
    data: rowData,
  },
  {
    id: '2',
    name: 'Simpson Jackob',
    data: rowData,
  },
  {
    id: '3',
    name: 'Dawin Nunez',
    data: rowData,
  },
  {
    id: '4',
    name: 'Ade Ojo',
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

const tableHead: TableColumn<TableProps>[] = [
  {
    name: 'S/N',
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Bills',
    selector: (row) => row.data.length,
    sortable: true,
  },
];

const BillClient: React.FC<Props> = ({ handleCreate, onRowClicked, progressPending }) => {
  return (
    <>
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
            <SearchInput />

            <FilterMenu />
          </div>

          <Button onClick={handleCreate}>
            <i className="bi bi-plus-circle"></i> Add new
          </Button>
        </TableMenu>

        <div style={{ width: '100%', height: 'calc(100vh - 200px)', overflow: 'auto' }}>
          <CustomTable
            title="Bills"
            columns={tableHead}
            data={data}
            pointerOnHover
            highlightOnHover
            onRowClicked={onRowClicked}
            striped
            progressPending={progressPending}
          />
        </div>
      </PageWrapper>
    </>
  );
};

export default BillClient;
