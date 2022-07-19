import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../components/buttons/Button';
import DynamicInput from '../../../components/inputs/DynamicInput';
import { Dictionary } from '../../../types.d';
import { getDefaultValues, getResolver } from '../schema/util';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../styles';

interface Props {
  title: string;
  backClick: () => void;
  onSubmit: (_data, _event) => void;
  schema: any;
  selectedData?: Dictionary;
  submitBtnCaption?: string;
}

const FormView: React.FC<Props> = ({
  title,
  schema,
  backClick,
  selectedData = {},
  onSubmit,
  submitBtnCaption = 'Save Form',
}) => {
  const resolver = yupResolver(getResolver(schema.flat()));
  const defaultValues = getDefaultValues(schema.flat());
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { ...defaultValues, ...selectedData },
    resolver,
  });
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>
              {selectedData._id ? 'Update' : 'Create'} {title}
            </h2>
            <span>
              Create a New {title} by filling out the form below to get started.
              {errors &&
                JSON.stringify(
                  ((Object.values(errors)[0] as any) || ({} as any)).message,
                )}
            </span>
          </div>
          <Button
            label="Back to List"
            background="#fdfdfd"
            color="#333"
            onClick={backClick}
          />
        </HeadWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FullDetailsWrapper title={'Create' + title}>
            {schema.map((field: any, index) => {
              if (field.length) {
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
          </FullDetailsWrapper>

          <BottomWrapper>
            <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
            <Button label={submitBtnCaption} type="submit" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default FormView;
