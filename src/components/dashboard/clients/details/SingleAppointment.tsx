import React, { useState } from 'react';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import { AppointmentDataRow } from '../data';

interface SingleProps {
  row: AppointmentDataRow;
  onClick: () => void;
}

const SingleAppointment: React.FC<SingleProps> = ({ row, onClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <PageWrapper>
        <GrayWrapper>
          <HeadWrapper>
            <div>
              <h2>Appointment Details</h2>
              <span>Below are your client’s details</span>
            </div>
            <Button
              label={isEditing ? 'Cancel Editing' : 'Edit Details'}
              background={isEditing ? '#f2f2f2' : '#ECF3FF'}
              color={isEditing ? '#333' : '#0364FF'}
              showicon={true}
              icon='bi bi-pen-fill'
              onClick={() => setIsEditing(!isEditing)}
              // disabled={isEditing ? true : false}
            />
          </HeadWrapper>
          <DetailsWrapper>
            <span onClick={onClick}>Appointments</span> / {row.id}
            {isEditing ? (
              <GridWrapper>
                <Input label='ID' value={row.id} />
                <Input label='Date and Time' value={row.dtime} type='date' />
                <Input label='First name' value={row.fname} />
                <Input label='Last name' value={row.lname} />
                <Input label='Classification' value={row.classification} />
                <Input label='Location' value={row.location} />
                <Input label='Type' value={row.type} />
                <Input label='Status' value={row.status} />
                <Input label='Reason' value={row.reason} />
                <Input label='Practitioner' value={row.practitioner} />
              </GridWrapper>
            ) : (
              <GridWrapper>
                <div>
                  <label>ID</label>
                  <p>{row.id}</p>
                </div>
                <div>
                  <label>Date and Times</label>
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
            )}
          </DetailsWrapper>

          <BottomWrapper>
            <Button
              label='Delete Client'
              background='#FFE9E9'
              color='#ED0423'
            />
            <Button label='Attend to Client' />
          </BottomWrapper>
        </GrayWrapper>
      </PageWrapper>
    </>
  );
};

export default SingleAppointment;
