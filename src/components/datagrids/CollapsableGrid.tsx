import React from 'react';
import DataTable from 'react-data-table-component';
import AccordionBox from '../accordion';

interface Props {
  title: string;
  description: string;
  rowData: any;
  columnHead: any;
  onRowClicked?: (row: any, event: any) => void;
}

const CollapsableGrid: React.FC<Props> = ({
  title,
  description,
  rowData,
  columnHead,
  onRowClicked,
}) => {
  return (
    <>
      <AccordionBox title={title} defaultExpanded={true}>
        <AccordionBox title={description}>
          <DataTable
            title={description}
            columns={columnHead}
            data={rowData}
            selectableRows
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={onRowClicked}
          />
        </AccordionBox>
      </AccordionBox>
    </>
  );
};

export default CollapsableGrid;
