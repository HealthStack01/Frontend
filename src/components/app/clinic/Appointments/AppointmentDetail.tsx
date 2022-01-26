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

const AppointmentDetails: React.FC<Props> = ({
  editBtnClicked,
  row,
  backClick,
}) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Appointment Details</h2>
            <span>Below are your Appointment’s details</span>
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
              <label>Date and Time</label>
              <p>{row.dtime}</p>
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
              <label>Classification</label>
              <p>{row.classification}</p>
            </div>
            <div>
              <label>Location</label>
              <p>{row.location}</p>
            </div>
            <div>
              <label>Type</label>
              <p>{row.type}</p>
            </div>
            <div>
              <label>Status</label>
              <p>{row.status}</p>
            </div>
            <div>
              <label>Reason</label>
              <p>{row.reason}</p>
            </div>
            <div>
              <label>Practitioner</label>
              <p>{row.practitioner}</p>
            </div>
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default AppointmentDetails;
