import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../buttons/Button';
import DynamicInput from '../../DynamicInput';
import { ClientFullSchema } from '../../schema';
import {
  BottomWrapper,
  // DetailsWrapper,
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
  handleDelete: () => void;
}

const ClientModify: React.FC<Props> = ({
  cancelEditClicked,
  row: client,
  backClick,
  onSubmit,
  handleDelete,
}) => {
  const { handleSubmit, control } = useForm({ defaultValues: client });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Client Modification</h2>
            <span>Below are your Client’s details</span>
          </div>
          <div>
            <Button
              label="Back to List"
              background="#fdfdfd"
              color="#333"
              onClick={backClick}
            />
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
          <div style={{ marginTop: '30px' }}>
            <h2>Names</h2>
            <GridWrapper style={{ marginTop: '10px' }}>
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
          </div>

          <div style={{ marginTop: '30px' }}>
            <h2>Bio-Data</h2>
            <GridWrapper style={{ marginTop: '10px' }}>
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
                )
              )}
            </GridWrapper>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h2>Address </h2>
            <GridWrapper style={{ marginTop: '10px' }}>
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
                )
              )}
            </GridWrapper>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h2>Other Details</h2>
            <GridWrapper style={{ marginTop: '10px' }}>
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
                )
              )}
            </GridWrapper>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h2>Next Of Kin</h2>
            <GridWrapper style={{ marginTop: '10px' }}>
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
                )
              )}
            </GridWrapper>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h2>Non-Hospital Indetifiers</h2>
            <GridWrapper style={{ marginTop: '10px' }}>
              {ClientFullSchema.nonHospitalIndetifiers.map(
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
          </div>

          <div style={{ marginTop: '30px' }}>
            <h2>Payment Information</h2>
            <GridWrapper style={{ marginTop: '10px' }}>
              {ClientFullSchema.paymentInformation.map(
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
          </div>

          <div style={{ marginTop: '30px' }}>
            <h2>Medical Data</h2>
            <GridWrapper style={{ marginTop: '10px' }}>
              {ClientFullSchema.medicalData.map(({ inputType, key, name }) => (
                <DynamicInput
                  key={key}
                  name={key}
                  control={control}
                  inputType={inputType}
                  label={name}
                />
              ))}
            </GridWrapper>
          </div>

          <BottomWrapper>
            <Button
              label="Delete Client"
              background="#FFE9E9"
              color="#ED0423"
              onClick={handleDelete}
            />
            <Button label="Save Client" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ClientModify;
