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

export default BandModify;
