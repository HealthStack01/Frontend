import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import { ClientFullSchema } from '../schema';
import ClientQuickForm from './ClientQuickForm';

interface ClientDetailsProps {
  backClick: () => void;
  onSubmit: (_) => void;
}

const ClientFullForm: React.FC<ClientDetailsProps> = ({
  backClick,
  onSubmit,
}) => {
  const [isFullRegistration, setFullRegistration] = useState(true);

  const { control, handleSubmit } = useForm();

  return (
    <>
      {isFullRegistration ? (
        <PageWrapper>
          <GrayWrapper>
            <HeadWrapper>
              <Button
                label="Quick Registration"
                background="#ECF3FF"
                color="#0364FF"
                showicon
                icon="bi bi-pen-fill"
                onClick={() => setFullRegistration(false)}
              />
            </HeadWrapper>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Names */}
              <DetailsWrapper title="Names">
                <GridWrapper>
                  {ClientFullSchema.names.map(({ inputType, key, name }) => (
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

              {/*   BioData */}
              <DetailsWrapper title="Bio-data">
                <GridWrapper>
                  {ClientFullSchema.biodata.map(
                    ({ inputType, key, name, options }) => (
                      <DynamicInput
                        key={key}
                        name={key}
                        control={control}
                        inputType={inputType}
                        label={name}
                        options={options || []}
                      />
                    ),
                  )}
                </GridWrapper>
              </DetailsWrapper>

              {/* Address   */}
              <DetailsWrapper title="Address">
                <GridWrapper>
                  {ClientFullSchema.address.map(
                    ({ inputType, key, name, options }) => (
                      <DynamicInput
                        key={key}
                        name={key}
                        control={control}
                        inputType={inputType}
                        label={name}
                        options={options || []}
                      />
                    ),
                  )}
                </GridWrapper>
              </DetailsWrapper>

              {/* Other Details  */}
              <DetailsWrapper title="Other Details">
                <GridWrapper>
                  {ClientFullSchema.otherDetails.map(
                    ({ inputType, key, name, options }) => (
                      <DynamicInput
                        key={key}
                        name={key}
                        control={control}
                        inputType={inputType}
                        label={name}
                        options={options || []}
                      />
                    ),
                  )}
                </GridWrapper>
              </DetailsWrapper>

              {/* Next of Kin  */}
              <DetailsWrapper title="Next of Kin">
                <GridWrapper>
                  {ClientFullSchema.nextOfKin.map(
                    ({ inputType, key, name, options }) => (
                      <DynamicInput
                        key={key}
                        name={key}
                        control={control}
                        inputType={inputType}
                        label={name}
                        options={options || []}
                      />
                    ),
                  )}
                </GridWrapper>
              </DetailsWrapper>

              {/* Non Hosiptal Idenfiers  */}
              <DetailsWrapper title="Non-Hospitalsiptal Idenfiers">
                <h2>Non-Hospital Indetifiers</h2>
                <GridWrapper>
                  {ClientFullSchema.nonHospitalIndetifiers.map(
                    ({ inputType, key, name }) => (
                      <DynamicInput
                        key={key}
                        name={key}
                        control={control}
                        inputType={inputType}
                        label={name}
                      />
                    ),
                  )}
                </GridWrapper>
              </DetailsWrapper>

              {/* Payment Information   */}
              <DetailsWrapper title="Payment Information">
                <GridWrapper>
                  {ClientFullSchema.paymentInformation.map(
                    ({ inputType, key, name }) => (
                      <DynamicInput
                        key={key}
                        name={key}
                        control={control}
                        inputType={inputType}
                        label={name}
                      />
                    ),
                  )}
                </GridWrapper>
              </DetailsWrapper>

              {/* Medical Data   */}
              <DetailsWrapper title="Medical Data">
                <GridWrapper>
                  {ClientFullSchema.medicalData.map(
                    ({ inputType, key, name }) => (
                      <DynamicInput
                        key={key}
                        name={key}
                        control={control}
                        inputType={inputType}
                        label={name}
                      />
                    ),
                  )}
                </GridWrapper>
              </DetailsWrapper>

              <BottomWrapper>
                <Button
                  label="Clear Form"
                  background="#FFE9E9"
                  color="#ED0423"
                />
                <Button label="Save Form" />
              </BottomWrapper>
            </form>
          </GrayWrapper>
        </PageWrapper>
      ) : (
        <ClientQuickForm backClick={backClick} onSubmit={onSubmit} />
      )}
    </>
  );
};

export default ClientFullForm;
