import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { getResolver } from '../../schema/util';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

let resolver;
const AppointmentForm = ({ schema, onSubmit, backClick, selectedData }) => {
  resolver = yupResolver(getResolver(schema.flat() as any[]));
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { ...selectedData },
    resolver,
  });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Appointment</h2>
            <span>Create a new appointment by filling out the form below.</span>
          </div>
          <Button
            label="Back to List"
            background="#fdfdfd"
            color="#333"
            onClick={backClick}
          />
        </HeadWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DetailsWrapper title="Appointment Form" defaultExpanded={true}>
            {schema.map((field: any, index) => {
              if (field['length']) {
                return (
                  <GridWrapper className="subgrid two-columns" key={index}>
                    {field.map((field, childIndex) => (
                      <DynamicInput
                        {...field}
                        key={childIndex}
                        name={field.key}
                        control={control}
                        label={field.name}
                        inputType={field.inputType}
                        options={field.options || []}
                        data={selectedData}
                        errors={errors}
                      />
                    ))}
                  </GridWrapper>
                );
              } else {
                return (
                  <DynamicInput
                    {...field}
                    key={index}
                    name={field.key}
                    control={control}
                    label={field.name}
                    inputType={field.inputType}
                    options={field.options || []}
                    data={selectedData}
                    errors={errors}
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
            <Button label="Save Appointment" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default AppointmentForm;
