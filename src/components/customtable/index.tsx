import React from 'react';
import DataTable from 'react-data-table-component';

import EmptyData from '../empty';

// const rotate360 = keyframes`
// form {
//   transform: rotate(0deg)
// }
// to {
//   transform: rotate(360deg)
// }`;

// const Spinner = styled.div`
//   margin: 10px;
//   animation: ${rotate360} 1s linear infinite;
//   transform: translateZ(0);
//   border-top: 2px solid grey;
//   border-right: 2px solid grey;
//   border-bottom: 2px solid grey;
//   border-left: 4px solid black;
//   background: transparent;
//   width: 80px;
//   height: 80px;
//   border-radius: 50%;
// `;

interface Props {
  title?: string;
  columns: any;
  data: any;
  pointerOnHover?: boolean;
  highlightOnHover?: boolean;
  striped?: boolean;
  onRowClicked?: (row: any, event: any) => void;
  dense?: boolean;
  progressPending?: any;
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

const CustomLoader = () => (
  <div style={{ padding: '24px' }}>
    <img src="/loading.gif" width={400} />
  </div>
);

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
      progressComponent={<CustomLoader />}
      progressPending={progressPending}
      noDataComponent={<EmptyData />}
    />
  );
};

export default CustomTable;
