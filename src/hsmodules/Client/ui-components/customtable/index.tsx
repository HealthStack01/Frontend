import React from 'react';
import DataTable from 'react-data-table-component';
import EmptyData from '../../../../components/empty';

//import { customStyles } from './styles';

interface Props {
  title?: string;
  columns: any;
  data: any;
  pointerOnHover?: boolean;
  highlightOnHover?: boolean;
  striped?: boolean;
  selectable?: boolean;
  onRowClicked?: (row: any, event: any) => void;
  dense?: boolean;
  progressPending?: any;
  onSelectedRowsChange?: any;
}

const CustomLoader = () => (
  <div style={{ padding: '24px' }}>
    <img src='/loading.gif' width={400} />
  </div>
);

const customStyles = {
  rows: {
    style: {
      minHeight: '40px', // override the row height
      '&:not(:last-of-type)': {
        borderBottomWidth: '0px',
      },
      padding: '0.25rem',
      backgroundColor: '##F8F8F8',
    },
  },
  headRow: {
    style: {
      borderBottomWidth: '0px',
      padding: '0.25rem',
      backgroundColor: '#F8F8F8',
      fontSize: '0.75rem',
    },
  },
  headCells: {
    style: {
      padding: '0.25rem',
      paddingLeft: '0.5rem', // override the cell padding for head cells
      paddingRight: '0.5rem',
      paddingTop: '0.2rem',
      paddingBottom: '0.2rem',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      color: '#000',
    },
  },
  cells: {
    style: {
      paddingLeft: '0.5rem', // override the cell padding for data cells
      paddingRight: '0.5rem',
      paddingTop: '0.2rem',
      paddingBottom: '0.2rem',
      fontSize: '0.8rem',
      color: '#000',
      fontWeight: '400',
    },
  },
};

const CustomTable: React.FC<Props> = ({
  title,
  columns,
  data,
  onRowClicked,
  pointerOnHover = true,
  highlightOnHover = true,
  striped = true,
  dense = false,
  progressPending,
  selectable = false,
  onSelectedRowsChange,
}) => {
  return (
    <DataTable
      title={title}
      columns={columns}
      data={data} //TODO: only add sn if it's in the schema, to improve performance here
      pointerOnHover={pointerOnHover}
      highlightOnHover={highlightOnHover}
      striped={striped}
      customStyles={customStyles}
      onRowClicked={onRowClicked}
      fixedHeader={true}
      selectableRows={selectable}
      onSelectedRowsChange={onSelectedRowsChange}
      fixedHeaderScrollHeight='100%'
      responsive
      dense={dense}
      style={{
        width: '100%',
      }}
      progressComponent={<CustomLoader />}
      progressPending={progressPending}
      noDataComponent={<EmptyData />}
    />
  );
};

export default CustomTable;
