import React from 'react';
import { TableColumn } from 'react-data-table-component';

// import { DebounceInput } from 'react-debounce-input';
import { TableMenu } from '../../../../styles/global';
import AccordionBox from '../../../accordion';
import CustomTable from '../../../customtable';
import Input from '../../../inputs/basic/Input';
import FilterMenu from '../../../utilities/FilterMenu';
import { PageWrapper } from '../../styles';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (row: any, event: any) => void;
}

interface DataProps {
  id: any;
  name: any;
  date: string;
  description: string;
  status: string;
  amount: string;
}

const rowData = [
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
    data: rowData,
  },
  {
    title: 'Eve Adam',
    description: 'Prescription of one unpaid bill(s)',
    data: rowData,
  },
  {
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    data: rowData,
  },
  {
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    data: rowData,
  },
  {
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    data: rowData,
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

const BillLabSent: React.FC<Props> = ({ onRowClicked }) => {
  return (
    <PageWrapper>
      <h2>Bill Lab Sent</h2>

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
          {/* <DebounceInput
            className="input is-small "
            type="text"
            placeholder="Search Employees"
            minLength={1}
            debounceTimeout={400}
            onChange={() => {}}
          /> */}

          <FilterMenu />
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        {dataTree.map((data, index) => (
          <AccordionBox title={data.title} key={index}>
            <CustomTable
              title={data.description}
              columns={columnHead}
              data={data.data}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={onRowClicked}
            />
          </AccordionBox>
        ))}
      </div>
    </PageWrapper>
  );
};

export default BillLabSent;
