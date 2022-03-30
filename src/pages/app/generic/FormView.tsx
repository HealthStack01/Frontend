import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../components/buttons/Button';
import DynamicInput from '../../../components/inputs/DynamicInput';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../styles';

interface Props {
  title: string;
  backClick: () => void;
  onSubmit: (_data, _event) => void;
  schema: any;
  data?: any;
}

const FormView: React.FC<Props> = ({ title, schema, backClick, data, onSubmit }) => {
  const { handleSubmit, control } = useForm({ defaultValues: data });
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>
              {data ? 'Update' : 'Create'} {title}
            </h2>
            <span>Create a New {title} by filling out the form below to get started.</span>
          </div>
          <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
        </HeadWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FullDetailsWrapper title="Create Band">
            <GridWrapper>
              {schema.map((client, index) => (
                <DynamicInput
                  key={index}
                  name={client.key}
                  control={control}
                  label={client.name}
                  inputType={client.inputType}
                  options={client.options}
                  data={data}
                />
              ))}
            </GridWrapper>
          </FullDetailsWrapper>

          <BottomWrapper>
            <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
            <Button label="Save Form" type="submit" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default FormView;
