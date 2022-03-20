import React from 'react';

import Button from '../../../../components/buttons/Button';
import { FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const PaymentDetails: React.FC<Props> = ({ editBtnClicked, row, backClick }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Employee Details</h2>
            <span>Below are your employee’s details</span>
          </div>
          <div>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
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
              <label>First Name</label>
              <p>{row.fname}</p>
            </div>
            <div>
              <label>Last Name</label>
              <p>{row.lname}</p>
            </div>
            <div>
              <label>Profession</label>
              <p>{row.profession}</p>
            </div>
            <div>
              <label>Phone Number</label>
              <p>{row.phone}</p>
            </div>
            <div>
              <label>Email Address</label>
              <p>{row.email}</p>
            </div>
            <div>
              <label>Department</label>
              <p>{row.department}</p>
            </div>
            <div>
              <label>Departmental Unit</label>
              <p>{row.departmentalUnit}</p>
            </div>
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default PaymentDetails;
