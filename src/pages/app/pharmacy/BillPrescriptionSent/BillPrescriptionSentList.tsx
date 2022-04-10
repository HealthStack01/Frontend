import React from 'react';

import AccordionBox from '../../../../components/accordion';
import CustomTable from '../../../../components/customtable';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { BillPrescriptionSchema } from '../../schema';
import { PageWrapper } from '../../styles';

const BillPrescriptionSent = ({ onRowClicked, onSearch, items }) => {
  return (
    <PageWrapper>
      <h2>Bill Prescription Sent</h2>

      <TableMenu>
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <FilterMenu schema={BillPrescriptionSchema} onSearch={onSearch} />
        </div>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        {items.map((data, index) => (
          <AccordionBox title={`${data.clientname} with ${data.orders.length} Pending Prescriptions`} key={index}>
            <CustomTable
              key={index}
              columns={BillPrescriptionSchema}
              data={data.orders}
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

export default BillPrescriptionSent;
