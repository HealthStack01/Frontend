import React from 'react';
import { TableColumn } from 'react-data-table-component';

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
  title: any;
  description: string;
}

export const rowData = [
  {
    id: 1,
    name: 'Simpa',
    date: '2022-01-20 19:45',
    description: 'lorem',
    status: 'unpaid',
    amount: '5000',
  },
  {
    id: 2,
    name: 'Simpa',
    date: '2022-01-20 19:45',
    description: 'lorem',
    status: 'unpaid',
    amount: '5000',
  },
  {
    id: 3,
    name: 'Simpa',
    date: '2022-01-20 19:45',
    description: 'lorem',
    status: 'unpaid',
    amount: '5000',
  },
];

const dataTree = [
  {
    id: 1,
    title: 'Ada Chris',
    description: 'Prescription of one unpaid bill(s)',
    children: rowData,
  },
  {
    id: 2,
    title: 'Eve Adam',
    description: 'Prescription of one unpaid bill(s)',
    children: rowData,
  },
  {
    id: 3,
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    children: rowData,
  },
  {
    id: 4,
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    children: rowData,
  },
  {
    id: 5,
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    children: rowData,
  },
  {
    id: 6,
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    children: rowData,
  },
  {
    id: 7,
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    children: rowData,
  },
];

export const columnHead: TableColumn<DataProps>[] = [
  {
    name: 'S/N',
    selector: (row) => row.id,
    sortable: true,
  },
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

const Payments: React.FC<Props> = ({ onRowClicked }) => {
  return (
    <PageWrapper>
      <h2>Payments</h2>

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
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        {/* {dataTree.map((data, index) => (
          <AccordionBox title={data.title} key={index}>
            {data.children.map((child) => {
              return (
                <AccordionBox title={child.title}>
                  <DataTable
                    title={child.description}
                    columns={columnHead}
                    data={child.data}
                    selectableRows
                    pointerOnHover
                    highlightOnHover
                    striped
                    onRowClicked={onRowClicked}
                  />
                </AccordionBox>
              );
            })}
          </AccordionBox>
        ))} */}

        <CustomTable
          title="Bills"
          columns={columnHead}
          data={dataTree}
          pointerOnHover
          highlightOnHover
          onRowClicked={onRowClicked}
          striped
          // progressPending={progressPending}
        />
      </div>
    </PageWrapper>
  );
};

export default Payments;
