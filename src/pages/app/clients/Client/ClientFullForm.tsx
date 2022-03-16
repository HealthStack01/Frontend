import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import DynamicInput from '../../DynamicInput';
import { ClientFullSchema } from '../../schema';
import { BottomWrapper, DetailsWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';
import ClientQuickForm from './ClientQuickForm';

interface ClientDetailsProps {
  backClick: () => void;
  onSubmit: (_) => void;
}

const ClientFullForm: React.FC<ClientDetailsProps> = ({ backClick, onSubmit }) => {
  const [isFullRegistration, setFullRegistration] = useState(true);

  const { control, handleSubmit } = useForm();

  return (
    <>
      {isFullRegistration ? (
        <PageWrapper>
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
              <h2>Names</h2>
              <GridWrapper>
                {ClientFullSchema.names.map(({ inputType, key, name }) => (
                  <DynamicInput key={key} name={key} control={control} inputType={inputType} label={name} />
                ))}
              </GridWrapper>
            </DetailsWrapper>

            {/*   BioData */}
            <DetailsWrapper title="Bio-data">
              <h2>Bio-data</h2>
              <GridWrapper>
                {ClientFullSchema.biodata.map(({ inputType, key, name, options }) => (
                  <DynamicInput
                    key={key}
                    name={key}
                    control={control}
                    inputType={inputType}
                    label={name}
                    options={options || []}
                  />
                ))}
              </GridWrapper>
            </DetailsWrapper>

            {/* Address   */}
            <DetailsWrapper title="Address">
              <h2>Address</h2>
              <GridWrapper>
                {ClientFullSchema.address.map(({ inputType, key, name, options }) => (
                  <DynamicInput
                    key={key}
                    name={key}
                    control={control}
                    inputType={inputType}
                    label={name}
                    options={options || []}
                  />
                ))}
              </GridWrapper>
            </DetailsWrapper>

            {/* Other Details  */}
            <DetailsWrapper title="Other Details">
              <h2>Other Details</h2>
              <GridWrapper>
                {ClientFullSchema.otherDetails.map(({ inputType, key, name, options }) => (
                  <DynamicInput
                    key={key}
                    name={key}
                    control={control}
                    inputType={inputType}
                    label={name}
                    options={options || []}
                  />
                ))}
              </GridWrapper>
            </DetailsWrapper>

            {/* Next of Kin  */}
            <DetailsWrapper title="Next of Kin">
              <h2>Next of Kin</h2>
              <GridWrapper>
                {ClientFullSchema.nextOfKin.map(({ inputType, key, name, options }) => (
                  <DynamicInput
                    key={key}
                    name={key}
                    control={control}
                    inputType={inputType}
                    label={name}
                    options={options || []}
                  />
                ))}
              </GridWrapper>
            </DetailsWrapper>

            {/* Non Hosiptal Idenfiers  */}
            <DetailsWrapper title="Non-Hospitalsiptal Idenfiers">
              <h2>Non-Hospital Indetifiers</h2>
              <GridWrapper>
                {ClientFullSchema.nonHospitalIndetifiers.map(({ inputType, key, name }) => (
                  <DynamicInput key={key} name={key} control={control} inputType={inputType} label={name} />
                ))}
              </GridWrapper>
            </DetailsWrapper>

            {/* Payment Information   */}
            <DetailsWrapper title="Payment Information">
              <h2>Payment Information</h2>
              <GridWrapper>
                {ClientFullSchema.paymentInformation.map(({ inputType, key, name }) => (
                  <DynamicInput key={key} name={key} control={control} inputType={inputType} label={name} />
                ))}
              </GridWrapper>
            </DetailsWrapper>

            {/* Medical Data   */}
            <DetailsWrapper title="Medical Data">
              <h2>Medical Data</h2>
              <GridWrapper>
                {ClientFullSchema.medicalData.map(({ inputType, key, name }) => (
                  <DynamicInput key={key} name={key} control={control} inputType={inputType} label={name} />
                ))}
              </GridWrapper>
            </DetailsWrapper>

            <BottomWrapper>
              <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
              <Button label="Save Form" />
            </BottomWrapper>
          </form>
        </PageWrapper>
      ) : (
        <ClientQuickForm backClick={backClick} onSubmit={onSubmit} />
      )}
    </>
  );
};

export default ClientFullForm;
