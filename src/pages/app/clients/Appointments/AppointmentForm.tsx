import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { AppointmentSchema, Schema } from '../../schema';
import { BottomWrapper, DetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

const AppointmentForm = ({ onSubmit, backClick, selectedData }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: selectedData,
  });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Appointment</h2>
            <span>Create a new appointment by filling out the form below.</span>
          </div>
          <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
        </HeadWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DetailsWrapper title="Appointment Form" defaultExpanded={true}>
            {AppointmentSchema.map((obj, index) => {
              if (obj['length']) {
                const schemas = obj as Schema[];

                return (
                  <GridWrapper className="subgrid two-columns" key={index}>
                    {schemas.map((field, childIndex) => (
                      <DynamicInput
                        key={childIndex}
                        name={field.key}
                        control={control}
                        label={field.name}
                        inputType={field.inputType}
                        options={field.options || []}
                        data={selectedData}
                      />
                    ))}
                  </GridWrapper>
                );
              } else {
                const field = obj as Schema;
                return (
                  <DynamicInput
                    key={index}
                    name={field.key}
                    control={control}
                    label={field.name}
                    inputType={field.inputType}
                    options={field.options || []}
                    data={selectedData}
                  />
                );
              }
            })}
          </DetailsWrapper>
          <BottomWrapper>
            <Button label="Close without Saving" background="#ECF3FF" color="#0364FF" onClick={backClick} />
            <Button label="Save Appointment" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default AppointmentForm;
