import React from 'react';

import AccordionBox from '../accordion';
import CustomTable from '../customtable';

interface Props {
  title: string;
  description: string;
  rowData?: any;
  columnHead?: any;
  onRowClicked?: (row: any, event: any) => void;
  table?: boolean;
}

const CollapsableGrid: React.FC<Props> = ({
  title,
  description,
  rowData,
  columnHead,
  onRowClicked,
  table = true,
}) => {
  return (
    <>
      <AccordionBox title={title} defaultExpanded={true}>
        <AccordionBox title={description}>
          {table && (
            <CustomTable
              columns={columnHead}
              data={rowData}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={onRowClicked}
            />
          )}
        </AccordionBox>
      </AccordionBox>
    </>
  );
};

export default CollapsableGrid;
