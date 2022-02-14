import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../buttons/Button';
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

const AppointmentCreate = ({ onSubmit, backClick }) => {
  const { handleSubmit, control } = useForm({
   defaultValues: {
    client: ''
   }
  });
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
            {AppointmentSchema.map((obj, index) => {
              if (obj['length']) {
                const schemas = obj as Schema[];

                return (
                  <GridWrapper className="subgrid two-columns">
                    {schemas.map((schema) => (
                      <DynamicInput
                        key={index}
                        name={schema.key}
                        control={control}
                        label={schema.description}
                        inputType={schema.inputType}
                        options={schema.options || []}
                      />
                    ))}
                  </GridWrapper>
                );
              } else {
                const schema = obj as Schema;
                return (
                  <DynamicInput
                    key={index}
                    name={schema.key}
                    control={control}
                    label={schema.description}
                    inputType={schema.inputType}
                    options={schema.options || []}
                  />
                );
              }
            })}
          </DetailsWrapper>
          <BottomWrapper>
            <Button
              label="Close without Saving"
              background="#ECF3FF"
              color="#0364FF"
              onClick={backClick}
            />
            <Button label="Create Appointment" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default AppointmentCreate;
