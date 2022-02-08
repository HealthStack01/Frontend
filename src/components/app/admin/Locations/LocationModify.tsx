import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../buttons/Button';
import DynamicInput from '../../DynamicInput';
import { LocationSchema } from '../../ModelSchema';
import {
  BottomWrapper,
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

const locationType = ['Front Desk', 'Clinic', 'Store', 'Laboratory', 'Finance'];

const LocationModify: React.FC<Props> = ({
  cancelEditClicked,
  onSubmit,
  row: location,
  backClick,
}) => {
  const { handleSubmit, control } = useForm({
    defaultValues: location,
  });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Location Details</h2>
            <span>Below are your location’s details</span>
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
          <GridWrapper>
            {LocationSchema.map((client, index) => (
              <DynamicInput
                key={index}
                name={client.key}
                control={control}
                label={client.name}
                inputType={client.inputType}
                options={locationType}
              />
            ))}
          </GridWrapper>

          <BottomWrapper>
            <Button
              label="Delete Location"
              background="#FFE9E9"
              color="#ED0423"
            />
            <Button label="Save Location" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default LocationModify;
