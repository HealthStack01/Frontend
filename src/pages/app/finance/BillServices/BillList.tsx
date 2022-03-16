import React from 'react';
import DataTable from 'react-data-table-component';

import AccordionBox from '../../../../components/accordion';
import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/basic/Input';
import SwitchButton from '../../../../components/switch';
import { TableMenu } from '../../../../ui/styled/global';
import { BillServiceSchema } from '../../schema/ModelSchema';
import { PageWrapper } from '../../styles';

interface Props {
  handleCreate?: () => void;
  handleSearch: (_event) => void;
  dataTree: any[];
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

const Bills: React.FC<Props> = ({ handleCreate, onRowClicked, handleSearch, dataTree }) => {
  return (
    <PageWrapper>
      <h2>Bill Services</h2>

      <TableMenu>
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <Input
            placeholder="Search here"
            label="Search here"
            size="small"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'nowrap',
            }}
          >
            <span>Filer by</span>
            <i className="bi bi-chevron-down"></i>
          </div>
          <SwitchButton />
        </div>

        <Button onClick={handleCreate}>
          <i className="bi bi-plus-circle"></i> Add new
        </Button>
      </TableMenu>
      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        {dataTree.map((data, index) => (
          <AccordionBox title={data.clientname} key={index}>
            {data.bills.map((child, index) => {
              return (
                <AccordionBox key={index} title={`${child.catName} with ${child.order.length} Unpaid bills`}>
                  <DataTable
                    title={`${child.catName} with ${child.order.length} Unpaid bills`}
                    columns={BillServiceSchema}
                    data={child.order}
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
        ))}
      </div>
    </PageWrapper>
  );
};

export default Bills;
