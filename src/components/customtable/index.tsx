import React from 'react';
import DataTable from 'react-data-table-component';

interface Props {
  title?: string;
  columns: any;
  data: any;
  pointerOnHover?: boolean;
  highlightOnHover?: boolean;
  striped?: boolean;
  onRowClicked?: (row: any, event: any) => void;
  dense?: boolean;
}

const customStyles = {
  header: {
    style: {
      minHeight: '40px',
    },
  },
  headRow: {
    style: {
      background: '#F8F8F8',
      color: '#03045E',
      fontWeight: 'bold',
      fontSize: '14px',
      border: 'none',
      boxShadow: '0 3px 3px 0 rgba(3,4,94,0.2)',
    },
  },
  headCells: {
    style: {
      '&:not(:last-of-type)': {
        border: 'none',
      },
      background: '#F8F8F8',
      fontWeight: 'bold',
      fontSize: '0.75rem',
      border: 'none',
    },
  },
  cells: {
    style: {
      border: 'none',
    },
  },
  rows: {
    style: {
      border: 'none',
      background: '#F8F8F8',
      padding: '16px',
      fontSize: '14px',
      fontWeight: '500',
      fontFamily: 'Manrope, sans-serif',
    },
    stripedStyle: {
      background: '#fff',
      border: 'none',
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
}) => {
  return (
    <DataTable
      title={title}
      columns={columns}
      data={data}
      pointerOnHover={pointerOnHover}
      highlightOnHover={highlightOnHover}
      striped={striped}
      customStyles={customStyles}
      onRowClicked={onRowClicked}
      fixedHeader={true}
      fixedHeaderScrollHeight="100%"
      responsive
      dense={dense}
      style={{
        width: '100%',
      }}
    />
  );
};

export default CustomTable;
