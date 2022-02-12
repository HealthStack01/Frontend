import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import RadioButton from '../../../inputs/basic/Radio';
import CustomSelect from '../../../inputs/basic/Select';
import Textarea from '../../../inputs/basic/Textarea';
import DynamicInput from '../../DynamicInput';
import { AppointmentSchema, Schema } from '../../schema';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

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

const AppointmentCreate = ({ onSubmit, backClick }) => {
  const { handleSubmit, control } = useForm();
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Appointment</h2>
            <span>Create a new appointment by filling out the form below.</span>
          </div>
        </HeadWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DetailsWrapper title="Appointment Form" defaultExpanded={true}>
            {AppointmentSchema.map((obj: Schema | Schema[], index, options) => {
              if (obj['length']) {
                const schemas = obj as Schema[];
                return schemas.map((schema) => (
                  <GridWrapper className="subgrid two-columns">
                     <DynamicInput
                      key={index}
                      name={schema.key}
                      control={control}
                      label={schema.name}
                      inputType={schema.inputType}
                      options={options}
                    />
                  </GridWrapper>
                ));
              } else {
                const schema = obj as Schema;
                return (
                  <DynamicInput
                    key={index}
                    name={schema.key}
                    control={control}
                    label={schema.name}
                    inputType={schema.inputType}
                    options={options}
                  />
                );
              }
            })}
            {/* <Input placeholder="Search for Client" />
            <Input placeholder="Search for Location, Typing or Active state" />
            <Input placeholder="Search for Employee" />
            <RadioButton
              title="Appointment Schedule"
              options={appointmetOptions}
            />

            <GridWrapper className="subgrid two-columns">
              <Input label="Date of Appointment" type="date" />
              <Input label="Time of Appointment" type="time" />
              <CustomSelect label="Appointment Type" options={typeOptions} />
              <CustomSelect label="Appointment Status" options={typeOptions} />
            </GridWrapper>
            <Textarea label="Reason for Appointment" /> */}
          </DetailsWrapper>
        </form>
        <BottomWrapper>
          <Button
            label="Close without Saving"
            background="#ECF3FF"
            color="#0364FF"
          />
          <Button label="Create Appointment" />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default AppointmentCreate;
