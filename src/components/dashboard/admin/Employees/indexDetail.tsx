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
  row?: any;
}

const EmployeeDetails: React.FC<Props> = ({ editBtnClicked, row }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Employee Details</h2>
            <span>Below are your employee’s details</span>
          </div>
          <Button
            label={'Edit Details'}
            background={'#ECF3FF'}
            color='#0364FF'
            showicon={true}
            icon='bi bi-pen-fill'
            onClick={editBtnClicked}
          />
        </HeadWrapper>
        <FullDetailsWrapper>
          <GridWrapper>
            <div>
              <label>ID</label>
              <p>{row.id}</p>
            </div>
            <div>
              <label>Name</label>
              <p>{row.name}</p>
            </div>
            <div>
              <label>Band Type</label>
              <p>{row.bandType}</p>
            </div>
            <div>
              <label>Description</label>
              <p>{row.description}</p>
            </div>
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default EmployeeDetails;
