import React, { useState } from 'react';

import Button from '../../../buttons/Button';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

import ClientQuickForm from './ClientQuickForm';
import { clientFullFormData } from '../../ModelSchema';
import { useForm } from 'react-hook-form';
import DynamicInput from '../../DynamicInput';

interface ClientDetailsProps {
  // row?: RowProps;
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
              <div>
                <h2>Create Client</h2>
                <span>
                  Create a New client by filling out the form below to get
                  started.
                </span>
              </div>
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
                <h2>Names</h2>
                <GridWrapper>
                  {clientFullFormData.names.map(({ inputType, key, name }) => (
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
                <h2>Bio-data</h2>
                <GridWrapper>
                  {clientFullFormData.biodata.map(
                    ({ inputType, key, name, options }) => (
                      <DynamicInput
                        key={key}
                        name={key}
                        control={control}
                        inputType={inputType}
                        label={name}
                        options={options || []}
                      />
                    )
                  )}
                </GridWrapper>
              </DetailsWrapper>

              {/* Address   */}
              <DetailsWrapper title="Address">
                <h2>Address</h2>
                <GridWrapper>
                  {clientFullFormData.address.map(
                    ({ inputType, key, name, options }) => (
                      <DynamicInput
                        key={key}
                        name={key}
                        control={control}
                        inputType={inputType}
                        label={name}
                        options={options || []}
                      />
                    )
                  )}
                </GridWrapper>
              </DetailsWrapper>

              {/* Other Details  */}
              <DetailsWrapper title="Other Details">
                <h2>Other Details</h2>
                <GridWrapper>
                  {clientFullFormData.otherDetails.map(
                    ({ inputType, key, name, options }) => (
                      <DynamicInput
                        key={key}
                        name={key}
                        control={control}
                        inputType={inputType}
                        label={name}
                        options={options || []}
                      />
                    )
                  )}
                </GridWrapper>
              </DetailsWrapper>

              {/* Next of Kin  */}
              <DetailsWrapper title="Next of Kin">
                <h2>Next of Kin</h2>
                <GridWrapper>
                  {clientFullFormData.nextOfKin.map(
                    ({ inputType, key, name, options }) => (
                      <DynamicInput
                        key={key}
                        name={key}
                        control={control}
                        inputType={inputType}
                        label={name}
                        options={options || []}
                      />
                    )
                  )}
                </GridWrapper>
              </DetailsWrapper>

              {/* Non Hosiptal Idenfiers  */}
              <DetailsWrapper title="Non-Hospitalsiptal Idenfiers">
                <h2>Non-Hospital Indetifiers</h2>
                <GridWrapper>
                  {clientFullFormData.nonHospitalIndetifiers.map(
                    ({ inputType, key, name }) => (
                      <DynamicInput
                        key={key}
                        name={key}
                        control={control}
                        inputType={inputType}
                        label={name}
                      />
                    )
                  )}
                </GridWrapper>
              </DetailsWrapper>

              {/* Payment Information   */}
              <DetailsWrapper title="Payment Information">
                <h2>Payment Information</h2>
                <GridWrapper>
                  {clientFullFormData.paymentInformation.map(
                    ({ inputType, key, name }) => (
                      <DynamicInput
                        key={key}
                        name={key}
                        control={control}
                        inputType={inputType}
                        label={name}
                      />
                    )
                  )}
                </GridWrapper>
              </DetailsWrapper>

              {/* Medical Data   */}
              <DetailsWrapper title="Medical Data">
                <h2>Medical Data</h2>
                <GridWrapper>
                  {clientFullFormData.medicalData.map(
                    ({ inputType, key, name }) => (
                      <DynamicInput
                        key={key}
                        name={key}
                        control={control}
                        inputType={inputType}
                        label={name}
                      />
                    )
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
