import React from 'react';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import { ButtonGroup } from '../../../../ui/styled/global';
import { BillServiceSchema } from '../../schema';
import { FullDetailsWrapper, GrayWrapper, HeadWrapper, PageWrapper } from '../../styles';

const BillDetails = ({ editBtnClicked, row, backClick }) => {
  row.bills.forEach((obj) => {
    obj.order.forEach((orderObj) => {
      orderObj.category = obj.catName;
    });
  });
  const orders = row.bills.map((obj) => obj.order).flat();
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Bill Details</h2>
            <span>Below are your Bill’s details</span>
          </div>
          <ButtonGroup>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
            <Button
              label={'Delete'}
              background="#FFE9E9"
              color="#ED0423"
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={editBtnClicked}
            />
          </ButtonGroup>
        </HeadWrapper>
        <FullDetailsWrapper>
          <CustomTable
            title={`Bills for ${row.clientname}`}
            columns={BillServiceSchema}
            data={orders}
            pointerOnHover
            highlightOnHover
            striped
          />
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default BillDetails;
