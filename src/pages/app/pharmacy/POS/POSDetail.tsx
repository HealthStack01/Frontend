import React from 'react';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import { FlexBox, Htag } from '../../../../ui/styled/global';
import { FullDetailsWrapper, GrayWrapper, HeadWrapper, PageWrapper } from '../../styles';
// import { columnHead } from '../Payment/PaymentList';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const POSDetails: React.FC<Props> = ({ row, backClick }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>POS</h2>
            <span>Below are your POS’s details</span>
          </div>
          <div>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <FlexBox className="between">
            <FlexBox>
              <FlexBox className="between">
                <Htag>Type</Htag>
                <label>{row.type}</label>
              </FlexBox>

              <FlexBox className="between">
                <Htag>Date</Htag>
                <label>{row.date}</label>
              </FlexBox>
              <FlexBox className="between">
                <Htag>Total Amount</Htag>
                <label>{row.amount}</label>
              </FlexBox>
            </FlexBox>

            <FlexBox>
              <FlexBox className="between">
                <Htag>Supplier</Htag>
                <label>{row.source}</label>
              </FlexBox>
              <FlexBox className="between">
                <Htag>Invoice No</Htag>
                <label>{row.documentNo}</label>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </FullDetailsWrapper>
        <FullDetailsWrapper>
          <CustomTable title="Product Items" columns={[]} data={row.data} pointerOnHover highlightOnHover striped />
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default POSDetails;
