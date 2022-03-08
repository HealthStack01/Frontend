import React from 'react';
import { TableColumn } from 'react-data-table-component';

import { TableMenu } from '../../../../styles/global';
import AccordionBox from '../../../accordion';
import CustomTable from '../../../customtable';
import Input from '../../../inputs/basic/Input';
import SwitchButton from '../../../switch';
import { PageWrapper } from '../../styles';
import Button from '../../../buttons/Button';
import { PaymentSchema } from '../../schema/ModelSchema';
import { ToastContainer } from 'react-toastify';

interface Props {
  handleCreate?: () => void;
  handleSearch: (_event) => void;
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
  dataTree: any[];
}


const Payments: React.FC<Props> = ({ handleCreate,
  onRowClicked,
  handleSearch,
  dataTree, }) => {
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
          <Input placeholder="Search here" label="Search here" size="small"  onChange={(e) => handleSearch(e.target.value)} />
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
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
      {dataTree.map((data, index) => (
          <AccordionBox title={data.clientname} key={index}>
            {data.bills.map((child, index) => {
             
              return (
                <AccordionBox
                key={index}
                title={`${child.catName} with ${child.order.length} Unpaid bills`}
              >
                <CustomTable
                  title={`${child.catName} with ${child.order.length} Unpaid bills`}
                  columns={PaymentSchema}
                  data={child.order}
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
