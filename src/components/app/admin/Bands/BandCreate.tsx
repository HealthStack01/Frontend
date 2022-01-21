import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import CustomSelect from '../../../inputs/basic/Select';
import { BandSchema } from '../../ModelSchema';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

const bandTypes = ['Provider', 'Company', 'Patient', 'Plan'];
interface Props {
  backClick: () => void;
  onSubmit: (_data, _event) => void;
}

const BandCreate: React.FC<Props> = ({ backClick, onSubmit }) => {
  const { handleSubmit, control } = useForm();

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Band</h2>
            <span>
              Create a New band by filling out the form below to get started.
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
          <FullDetailsWrapper title="Create Band">
            <GridWrapper>
              <Controller
                key="bandType"
                name="bandType"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    label="Choose a Band Type"
                    options={bandTypes}
                  />
                )}
              />
              {BandSchema.map((client, index) => (
                <Controller
                  key={index}
                  name={client.name}
                  control={control}
                  render={({ field }) => <Input {...field} />}
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

export default BandCreate;
