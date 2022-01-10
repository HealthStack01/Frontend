import React from 'react';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import RadioButton from '../../../inputs/basic/Radio';
import CustomSelect from '../../../inputs/basic/Select';
import Textarea from '../../../inputs/basic/Textarea';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

const appointmentFormData = [
  { title: 'Date and Time', type: 'datetime-local' },
  { title: 'First Name' },
  { title: 'Last Name' },
  { title: 'Classification' },
  { title: 'Location' },
  { title: 'Type' },
  { title: 'Status' },
  { title: 'Reason' },
  { title: 'Practitioner' },
];

const appointmetOptions = [
  {
    value: 'Onsite',
    label: 'On-site',
  },
  {
    value: 'Telemedicine',
    label: 'Telemedicine',
  },
  {
    value: 'homevisit',
    label: 'Home Visit',
  },
];

const typeOptions = [
  'Type A',
  'Type B',
  'Type C',
  'Type D',
  'Type E',
  'Type F',
];
const statusOptions = ['Status A', 'Status B'];

const AppointmentForm = () => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Appointment</h2>
            <span>Create a new appointment by filling out the form below.</span>
          </div>
        </HeadWrapper>
        <DetailsWrapper title='Appointment Form'>
          <Input placeholder='Search for Client' />
          <Input placeholder='Search for Location, Typing or Active state' />
          <Input placeholder='Search for Employee' />
          <RadioButton
            title='Appointment Schedule'
            options={appointmetOptions}
          />

          <GridWrapper className='subgrid two-columns'>
            <Input label='Date of Appointment' type='date' />
            <Input label='Time of Appointment' type='time' />
            <CustomSelect label='Appointment Type' options={typeOptions} />
            <CustomSelect label='Appointment Status' options={typeOptions} />
          </GridWrapper>
          <Textarea label='Reason for Appointment' />
        </DetailsWrapper>
        <BottomWrapper>
          <Button
            label='Close without Saving'
            background='#ECF3FF'
            color='#0364FF'
          />
          <Button label='Create Appointment' />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default AppointmentForm;
