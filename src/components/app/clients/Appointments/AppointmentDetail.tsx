import React, { useState } from 'react';
import { ButtonGroup } from '../../../../styles/global';

import Button from '../../../buttons/Button';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import Attend from './Attend';

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
  const [values, setValues] = useState({});
  const [state, setState] = useState('all');

  return (
    <>
      {state === 'attend' && <Attend row={row} backClick={backClick} />}

      <PageWrapper>
        <HeadWrapper>
          <div>
            <h2>Appointment Details</h2>
            <span>Below are your Appointment’s details</span>
          </div>
          <ButtonGroup>
            <Button
              label="Back to List"
              background="#fdfdfd"
              color="#333"
              onClick={backClick}
            />
            <Button
              label={'Start or Join Telemedicine'}
              background={'#04ed7c'}
              color={'#fff'}
            />
          </ButtonGroup>
        </HeadWrapper>
        <FullDetailsWrapper>
          {state === 'all' && (
            <>
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
              <BottomWrapper>
                <Button
                  label={'Edit Appointment Details'}
                  background={'#04ed7c'}
                  color={'#fff'}
                  onClick={editBtnClicked}
                />
                <Button
                  label="Attend to Client"
                  onClick={() => setState('attend')}
                />
              </BottomWrapper>
            </>
          )}
        </FullDetailsWrapper>
      </PageWrapper>
    </>
  );
};

export default AppointmentDetails;
