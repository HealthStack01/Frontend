import React from 'react';
import DataTable from 'react-data-table-component';

import AccordionBox from '../../../accordion';
import Button from '../../../buttons/Button';
import {
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import { columnHead } from './data';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const CollectionDetails: React.FC<Props> = ({ row, backClick }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Collection Details</h2>
            <span>Below are your Collection’s details</span>
          </div>
          <div>
            <Button
              label="Back to List"
              background="#fdfdfd"
              color="#333"
              onClick={backClick}
            />
            <label
              style={{
                padding: '14px 20px',
                background: '#b3ffed',
                color: '#062e12',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Current Balance {row.amount}
            </label>
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <GridWrapper className="two-columns">
            <AccordionBox defaultExpanded={true} title="Credit">
              <DataTable
                data={row.credit}
                columns={columnHead}
                title="Credit"
                pointerOnHover
                highlightOnHover
                striped
              />
            </AccordionBox>
            <AccordionBox defaultExpanded={true} title="Debit">
              <DataTable
                data={row.debit}
                columns={columnHead}
                title="Debit"
                pointerOnHover
                highlightOnHover
                striped
              />
            </AccordionBox>
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default CollectionDetails;
