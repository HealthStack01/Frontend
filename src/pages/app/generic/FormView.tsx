import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../components/buttons/Button';
import DynamicInput from '../../../components/inputs/DynamicInput';
import { Dictionary } from '../../../types.d';
import { getResolver } from '../schema';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../styles';

interface Props {
  title: string;
  backClick: () => void;
  onSubmit: (_data, _event) => void;
  schema: any;
  selectedData?: Dictionary;
}

const FormView: React.FC<Props> = ({ title, schema, backClick, selectedData, onSubmit }) => {
  const resolver = yupResolver(getResolver(schema));
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: selectedData._reactName ? {} : selectedData, resolver }); //FIXME: wrong data passed here is still a mystery
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>
              {selectedData._id ? 'Update' : 'Create'} {title}
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
                  data={selectedData}
                  errors={errors}
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
