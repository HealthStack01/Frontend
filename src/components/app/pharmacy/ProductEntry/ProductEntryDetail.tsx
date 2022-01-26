import React from 'react';
import DataTable from 'react-data-table-component';

import { FlexBox, Htag } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import {
  FullDetailsWrapper,
  GrayWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import { columnHead } from '../Payment/PaymentList';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const ProductEntryDetails: React.FC<Props> = ({ row, backClick }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Product Entry</h2>
            <span>Below are your Product Entry’s details</span>
          </div>
          <div>
            <Button
              label="Back to List"
              background="#fdfdfd"
              color="#333"
              onClick={backClick}
            />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <FlexBox className="between">
            <div>
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
            </div>

            <div>
              <FlexBox className="between">
                <Htag>Supplier</Htag>
                <label>{row.source}</label>
              </FlexBox>
              <FlexBox className="between">
                <Htag>Invoice No</Htag>
                <label>{row.documentNo}</label>
              </FlexBox>
            </div>
          </FlexBox>
        </FullDetailsWrapper>
        <FullDetailsWrapper>
          <DataTable
            title="Product Items"
            columns={columnHead}
            data={row.data}
            selectableRows
            pointerOnHover
            highlightOnHover
            striped
          />
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ProductEntryDetails;
