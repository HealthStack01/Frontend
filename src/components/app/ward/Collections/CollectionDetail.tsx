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

const CollectionDetails: React.FC<Props> = ({
  editBtnClicked,
  row,
  backClick,
}) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Employee Details</h2>
            <span>Below are your employee’s details</span>
          </div>
          <div>
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
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <GridWrapper>
            <div>
              <label>ID</label>
              <p>{row.id}</p>
            </div>
            <div>
              <label>Name</label>
              <p>{row.locationname}</p>
            </div>
            <div>
              <label>Band Type</label>
              <p>{row.locationType}</p>
            </div>
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default CollectionDetails;
