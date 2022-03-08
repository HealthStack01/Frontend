import React, { useState } from 'react';

import Button from '../../../buttons/Button';
import DynamicInput from '../../DynamicInput';
import { BillServiceSchema } from '../../schema/ModelSchema';
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
          <div>
            <Button
              label="Back to List"
              background="#fdfdfd"
              color="#333"
              onClick={backClick}
            />
           
            <Button
              label={'Edit Details'}
              background={'#ECF3FF'}
              color="#0364FF"
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={editBtnClicked}
            />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <GridWrapper>
            {BillServiceSchema.map((schema) => (
              <div>
                <label>{schema.name}</label>
                <p>{schema.selector(row)}</p>
              </div>
            ))}
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default BillDetails;