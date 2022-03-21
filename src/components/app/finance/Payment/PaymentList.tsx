import React from 'react';
import { TableColumn } from 'react-data-table-component';

import { TableMenu } from '../../../../ui/styled/global';
import { PageWrapper } from '../../../../ui/styled/styles';
import AccordionBox from '../../../accordion';
import CustomTable from '../../../customtable';
import Input from '../../../inputs/basic/Input';
import FilterMenu from '../../../utilities/FilterMenu';

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
  name: any;
  date: string;
  description: string;
  status: string;
  amount: string;
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
    title: 'Ada Chris',
    description: 'Prescription of one unpaid bill(s)',
    children: [
      {
        title: 'Registration with 1 Unpaid bills.',
        description: 'Prescription of 1 unpaid bill(s)',
        data: rowData,
      },
      {
        title: 'Consultation of 1 Unpaid bill',
        description: 'Consultationof one unpaid bill(s)',
        data: rowData,
      },
    ],
  },
  {
    title: 'Eve Adam',
    description: 'Prescription of one unpaid bill(s)',
    children: [
      {
        title: 'Registration with 1 Unpaid bills.',
        description: 'Prescription of one unpaid bill(s)',

        data: rowData,
      },
      {
        title: 'Consultation of 1 Unpaid bill',
        description: 'Consultation of one unpaid bill(s)',

        data: rowData,
      },
    ],
  },
  {
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    children: [
      {
        title: 'Registration with 1 Unpaid bills.',
        description: 'Prescription of one unpaid bill(s)',
        data: rowData,
      },
      {
        title: 'Consultation of 1 Unpaid bill',
        description: 'Consultation of one unpaid bill(s)',
        data: rowData,
      },
    ],
  },
  {
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    children: [
      {
        title: 'Registration with 1 Unpaid bills.',
        description: 'Prescription of one unpaid bill(s)',
        data: rowData,
      },
      {
        title: 'Consultation of 1 Unpaid bill',
        description: 'Consultation of one unpaid bill(s)',
        data: rowData,
      },
    ],
  },
  {
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    children: [
      {
        title: 'Registration with 1 Unpaid bills.',
        description: 'Prescription of one unpaid bill(s)',
        data: rowData,
      },
      {
        title: 'Consultation of 1 Unpaid bill',
        description: 'Consultation of one unpaid bill(s)',
        data: rowData,
      },
    ],
  },
  {
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    children: [
      {
        title: 'Registration with 1 Unpaid bills.',
        description: 'Prescription of one unpaid bill(s)',
        data: rowData,
      },
      {
        title: 'Consultation of 1 Unpaid bill',
        description: 'Consultation of one unpaid bill(s)',
        data: rowData,
      },
    ],
  },
  {
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    children: [
      {
        title: 'Registration with 1 Unpaid bills.',
        description: 'Prescription of one unpaid bill(s)',
        data: rowData,
      },
      {
        title: 'Consultation of 1 Unpaid bill',
        description: 'Consultation of one unpaid bill(s)',
        data: rowData,
      },
    ],
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
          <Input placeholder="Search here" label="Search here" size="small" />
          <FilterMenu />
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        {dataTree.map((data, index) => (
          <AccordionBox title={data.title} key={index}>
            {data.children.map((child, index) => {
              return (
                <AccordionBox key={index} title={child.title}>
                  <CustomTable
                    title={child.description}
                    columns={columnHead}
                    data={child.data}
                    pointerOnHover
                    highlightOnHover
                    striped
                    onRowClicked={onRowClicked}
                  />
                </AccordionBox>
              );
            })}
          </AccordionBox>
        ))}
      </div>
    </PageWrapper>
  );
};

export default Payments;
