import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../buttons/Button';
import DynamicInput from '../../DynamicInput';
import { ClientMiniSchema } from '../../schema';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import ClientFullForm from './ClientFullForm';

interface RowProps {
  id: any;
}

interface ClientDetailsProps {
  row?: RowProps;
  backClick: () => void;
  onSubmit: (_) => void;
}

const ClientQuickForm: React.FC<ClientDetailsProps> = ({
  backClick,
  onSubmit,
}) => {
  const [isFullRegistration, setFullRegistration] = useState(false);

  const { control, handleSubmit } = useForm();

  return (
    <>
      {!isFullRegistration ? (
        <PageWrapper>
          <GrayWrapper>
            <HeadWrapper>
              <div>
                <h2>Quick Register Client</h2>
                <span>
                  Create a New client by filling out the form below to get
                  started.
                </span>
              </div>
              <Button
                label="Full Registration"
                background="#ECF3FF"
                color="#0364FF"
                showicon
                icon="bi bi-pen-fill"
                onClick={() => setFullRegistration(true)}
              />
            </HeadWrapper>

            <form onSubmit={handleSubmit(onSubmit)}>
              <DetailsWrapper title="Create Client" defaultExpanded={true}>
                <GridWrapper>
                  {ClientMiniSchema.map(({ inputType, key, name }) => (
                    <DynamicInput
                      key={key}
                      name={key}
                      control={control}
                      inputType={inputType}
                      label={name}
                    />
                  ))}
                </GridWrapper>
              </DetailsWrapper>

              <BottomWrapper>
                <Button
                  label="Clear Form"
                  background="#FFE9E9"
                  color="#ED0423"
                />
                <Button label="Save Form" type="submit" />
              </BottomWrapper>
            </form>
          </GrayWrapper>
        </PageWrapper>
      ) : (
        <ClientFullForm backClick={backClick} onSubmit={onSubmit} />
      )}
    </>
  );
};

export default ClientQuickForm;
