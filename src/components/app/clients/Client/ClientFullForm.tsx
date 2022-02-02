import React, { useState } from 'react';

import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import Select from '../../../inputs/basic/Select';
import Textarea from '../../../inputs/basic/Textarea';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import ClientQuickForm from './ClientQuickForm';





interface ClientDetailsProps {
  // row?: RowProps;
  backClick: () => void;
  onSubmit: (_) => void;
}


const ClientFullForm: React.FC<ClientDetailsProps> = ({backClick, onSubmit}) => {
  const [isFullRegistration, setFullRegistration] = useState(true);

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
            {/* Names */}
            <DetailsWrapper title="Names">
              <h2>Names</h2>
              <GridWrapper className="subgrid">
                {clientFullFormData.names.map((name, index) => (
                  <Input label={name.title} key={index} />
                ))}
              </GridWrapper>
            </DetailsWrapper>

            {/*   BioData */}
            <DetailsWrapper title="Bio-data">
              <h2>Bio-data</h2>
              <GridWrapper className="subgrid">
                {clientFullFormData.biodata.map((bio, index) => {
                  if (bio.options) {
                    return (
                      <Select
                        options={bio.options}
                        label={bio.title}
                        key={index}
                      />
                    );
                  }
                  return (
                    <Input label={bio.title} key={index} type={bio.type} />
                  );
                })}
              </GridWrapper>
            </DetailsWrapper>

            {/* Address   */}
            <DetailsWrapper title="Address">
              <h2>Address</h2>
              <GridWrapper className="subgrid">
                {clientFullFormData.address.map((address, index) => {
                  if (address.options) {
                    return (
                      <Select
                        options={address.options}
                        label={address.title}
                        key={index}
                      />
                    );
                  }
                  return <Input label={address.title} key={index} />;
                })}
              </GridWrapper>
            </DetailsWrapper>

            {/* Other Details  */}
            <DetailsWrapper title="Other Details">
              <h2>Other Details</h2>
              <GridWrapper className="subgrid">
                {clientFullFormData.address.map((address, index) => {
                  if (address.options) {
                    return (
                      <Select
                        options={address.options}
                        label={address.title}
                        key={index}
                      />
                    );
                  }
                  return <Input label={address.title} key={index} />;
                })}
              </GridWrapper>
            </DetailsWrapper>

            {/* Next of Kin  */}
            <DetailsWrapper title="Next of Kin">
              <h2>Next of Kin</h2>
              <GridWrapper className="subgrid">
                {clientFullFormData.nextOfKin.map((address, index) => {
                  if (address.options) {
                    return (
                      <Select
                        options={address.options}
                        label={address.title}
                        key={index}
                      />
                    );
                  }
                  return <Input label={address.title} key={index} />;
                })}
              </GridWrapper>
            </DetailsWrapper>

            {/* Non Hosiptal Idenfiers  */}
            <DetailsWrapper title="Non-Hospitalsiptal Idenfiers">
              <h2>Non-Hospital Indetifiers</h2>
              <GridWrapper className="subgrid">
                {clientFullFormData.nonHospitalIndetifiers.map(
                  (address, index) => (
                    <Input label={address.title} key={index} />
                  ),
                )}
              </GridWrapper>
            </DetailsWrapper>

            {/* Payment Information   */}
            <DetailsWrapper title="Payment Information">
              <h2>Payment Information</h2>
              <GridWrapper className="subgrid">
                {clientFullFormData.paymentInformation.map((address, index) => (
                  <Input label={address.title} key={index} />
                ))}
              </GridWrapper>
            </DetailsWrapper>

            {/* Medical Data   */}
            <DetailsWrapper title="Medical Data">
              <h2>Medical Data</h2>
              <GridWrapper className="subgrid">
                {clientFullFormData.medicalData.map((address, index) => {
                  if (address.textarea) {
                    return <Textarea label={address.title} key={index} />;
                  }
                  return <Input label={address.title} key={index} />;
                })}
              </GridWrapper>
            </DetailsWrapper>

            <BottomWrapper>
              <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
              <Button label="Save Form" />
            </BottomWrapper>
          </GrayWrapper>
        </PageWrapper>
      ) : (
        <ClientQuickForm backClick ={backClick} onSubmit ={onSubmit} />
      )}
    </>
  );
}

export default ClientFullForm;
