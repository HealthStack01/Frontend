import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

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
import { AppointmentDataRow, dataAppointments } from '../data';
import AttendMode from './AttendMode';

function AppointmentDetails() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [attendMode, setAttendMode] = useState(false);
  const details = dataAppointments.filter(
    (appointment) => appointment.id === id
  );
  const [values, setValues] = useState<AppointmentDataRow>({
    id: details[0].id,
    dtime: details[0].dtime,
    fname: details[0].fname,
    lname: details[0].lname,
    classification: details[0].classification,
    location: details[0].location,
    type: details[0].type,
    status: details[0].status,
    reason: details[0].reason,
    practitioner: details[0].practitioner,
  });

  if (attendMode) {
    return <AttendMode />;
  }
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Appointment Details</h2>
            <span>Below are your appointment’s details</span>
          </div>
          <Button
            label={isEditing ? 'Cancel Editing' : 'Edit Details'}
            background={isEditing ? '#f2f2f2' : '#ECF3FF'}
            color={isEditing ? '#333' : '#0364FF'}
            showicon
            icon="bi bi-pen-fill"
            onClick={() => setIsEditing(!isEditing)}
          />
        </HeadWrapper>
        <DetailsWrapper title="Appointment Details">
          {isEditing ? (
            <GridWrapper>
              <Input label="ID" value={values.id} disabled />
              <Input
                label="Date and Time"
                value={values.dtime}
                type="datetime-local"
                onChange={(e) =>
                  setValues({ ...values, dtime: e.target.value })
                }
              />
              <Input
                label="First Name"
                value={values.fname}
                onChange={(e) =>
                  setValues({ ...values, fname: e.target.value })
                }
              />
              <Input
                label="Last Name"
                value={values.lname}
                onChange={(e) =>
                  setValues({ ...values, lname: e.target.value })
                }
              />
              <Input
                label="Classification"
                value={values.classification}
                onChange={(e) =>
                  setValues({
                    ...values,
                    classification: e.target.value,
                  })
                }
              />
              <Input
                label="Location"
                value={values.location}
                onChange={(e) =>
                  setValues({
                    ...values,
                    location: e.target.value,
                  })
                }
              />
              <Input
                label="Type"
                value={values.type}
                onChange={(e) =>
                  setValues({
                    ...values,
                    type: e.target.value,
                  })
                }
              />
              <Input
                label="Status"
                value={values.status}
                onChange={(e) =>
                  setValues({
                    ...values,
                    status: e.target.value,
                  })
                }
              />
              <Input
                label="Reason"
                value={values.reason}
                onChange={(e) =>
                  setValues({
                    ...values,
                    reason: e.target.value,
                  })
                }
              />
              <Input
                label="Practitioner"
                value={values.practitioner}
                onChange={(e) =>
                  setValues({
                    ...values,
                    practitioner: e.target.value,
                  })
                }
              />
            </GridWrapper>
          ) : (
            <GridWrapper>
              <div>
                <label>ID</label>
                <p>{details[0].id}</p>
              </div>
              <div>
                <label>Date and Time</label>
                <p>{details[0].dtime}</p>
              </div>
              <div>
                <label>First Name</label>
                <p>{details[0].fname}</p>
              </div>
              <div>
                <label>Last Name</label>
                <p>{details[0].lname}</p>
              </div>
              <div>
                <label>Classification</label>
                <p>{details[0].classification}</p>
              </div>
              <div>
                <label>Location</label>
                <p>{details[0].location}</p>
              </div>
              <div>
                <label>Type</label>
                <p>{details[0].type}</p>
              </div>
              <div>
                <label>Status</label>
                <p>{details[0].status}</p>
              </div>
              <div>
                <label>Reason</label>
                <p>{details[0].reason}</p>
              </div>
              <div>
                <label>Practitioner</label>
                <p>{details[0].practitioner}</p>
              </div>
            </GridWrapper>
          )}
          {isEditing ? (
            <BottomWrapper>
              <Button
                label="Save"
                background="#04ed7c"
                color={isEditing ? '#333' : '#fff'}
                onClick={() => setIsEditing(!isEditing)}
              />
              <Button label="Cancel" background="#eddd04" color="#fff" />
              <Button label="Discard" background="#ed0410" />
            </BottomWrapper>
          ) : (
            <BottomWrapper>
              <Button
                label={
                  isEditing ? 'Cancel Editing' : 'Edit Appointment Details'
                }
                background={isEditing ? '#f2f2f2' : '#04ed7c'}
                color={isEditing ? '#333' : '#fff'}
                onClick={() => setIsEditing(!isEditing)}
              />
              <Button
                label="Attend to Client"
                onClick={() => setAttendMode(true)}
              />
            </BottomWrapper>
          )}
        </DetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
}

export default AppointmentDetails;
