import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../buttons/Button';
import DynamicInput from '../../DynamicInput';
import { Schema } from '../../schema';
import { BandSchema } from '../../schema/ModelSchema';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

interface Props {
  cancelEditClicked?: () => void;
  row?: any;
  backClick: () => void;
  onSubmit: (_data) => void;
}

const BandModify: React.FC<Props> = ({
  cancelEditClicked,
  onSubmit,
  row: band,
  backClick,
}) => {
  const { handleSubmit, control } = useForm({
    defaultValues: band,
  });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Band Details</h2>
            <span>Below are your band’s details</span>
          </div>
          <div>
            <Button
              label="Back to List"
              background="#fdfdfd"
              color="#333"
              onClick={backClick}
            />
            <Button
              label="Cancel Editing"
              background="#f2f2f2"
              color="#333"
              showicon
              icon="bi bi-pen-fill"
              onClick={cancelEditClicked}
            />
          </div>
        </HeadWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FullDetailsWrapper title="Create Band">
            <GridWrapper>
              {BandSchema.map((client: Schema, index) => (
                <DynamicInput
                  key={index}
                  name={client.key}
                  control={control}
                  label={client.name}
                  inputType={client.inputType}
                  options={client.options}
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

export default BandModify;
