import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../buttons/Button';
import DynamicInput from '../../DynamicInput';
import { ServicesSchema } from '../../schema/ModelSchema';
import { BottomWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  cancelEditClicked?: () => void;
  row?: any;
  backClick: () => void;
  onSubmit: (_data) => void;
}

const ServiceModify: React.FC<Props> = ({ cancelEditClicked, row: services, backClick, onSubmit }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: services,
  });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Service Details</h2>
            <span>Below are your service's details</span>
          </div>
          <div>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
            <Button
              label={'Cancel Editing'}
              background={'#f2f2f2'}
              color={'#333'}
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={cancelEditClicked}
            />
          </div>
        </HeadWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <GridWrapper>
            {ServicesSchema.map((client, index) => (
              <DynamicInput
                key={index}
                name={client.key}
                control={control}
                label={client.name}
                inputType={client.inputType}
              />
            ))}
          </GridWrapper>

          <BottomWrapper>
            <Button label="Save Service" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ServiceModify;
