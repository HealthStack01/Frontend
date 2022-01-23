import React from 'react';

import Button from '../../../buttons/Button';
import {
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const RevenueDetails: React.FC<Props> = ({ row, backClick }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Revenue Details</h2>
            <span>Below are your Revenue’s details</span>
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
          <GridWrapper>
            <div>
              <label>ID</label>
              <p>{row.id}</p>
            </div>
            <div>
              <label>Date</label>
              <p>{row.date}</p>
            </div>
            <div>
              <label>Description</label>
              <p>{row.description}</p>
            </div>
            <div>
              <label>Client</label>
              <p>{row.client}</p>
            </div>
            <div>
              <label>Amont</label>
              <p>{row.amount}</p>
            </div>
            <div>
              <label>Mode</label>
              <p>{row.mode}</p>
            </div>
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default RevenueDetails;
