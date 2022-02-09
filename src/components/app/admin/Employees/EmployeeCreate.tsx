import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../buttons/Button';
import DynamicInput from '../../DynamicInput';
import { EmployeeSchema } from '../../schema/ModelSchema';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

interface Props {
  backClick: () => void;
  onSubmit: (_data, _event) => void;
}

const EmployeeCreate: React.FC<Props> = ({ backClick, onSubmit }) => {
  const { handleSubmit, control } = useForm();

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Employee</h2>
            <span>
              Create a New employee by filling out the form below to get
              started.
            </span>
          </div>
          <Button
            label="Back to List"
            background="#fdfdfd"
            color="#333"
            onClick={backClick}
          />
        </HeadWrapper>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <FullDetailsWrapper title="Create Employee">
            <GridWrapper>
              {EmployeeSchema.map((client, index) => (
                <DynamicInput
                  key={index}
                  name={client.key}
                  control={control}
                  label={client.name}
                  inputType={client.inputType}
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

export default EmployeeCreate;
