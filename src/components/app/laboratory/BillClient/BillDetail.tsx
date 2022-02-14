import React from 'react';
import { ButtonGroup } from '../../../../styles/global';

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

const BillDetails: React.FC<Props> = ({ editBtnClicked, row, backClick }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Bill Details</h2>
            <span>Below are your Bill’s details</span>
          </div>
          <ButtonGroup>
            <Button
              label="Back to List"
              background="#fdfdfd"
              color="#333"
              onClick={backClick}
            />
            <Button
              label={'Delete'}
              background="#FFE9E9"
              color="#ED0423"
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={editBtnClicked}
            />
            <Button
              label={'Edit Details'}
              background={'#ECF3FF'}
              color="#0364FF"
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={editBtnClicked}
            />
          </ButtonGroup>
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
              <label>Bill Service Description</label>
              <p>{row.description}</p>
            </div>
            <div>
              <label>Bill Status</label>
              <p>{row.status}</p>
            </div>
            <div>
              <label>Bill Amount</label>
              <p>{row.amount}</p>
            </div>
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default BillDetails;
