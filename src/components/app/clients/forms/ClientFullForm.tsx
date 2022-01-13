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

const clientFullFormData = {
  names: [
    { title: 'First Name', description: 'Enter your first name' },
    { title: 'Middle Name', description: 'Enter your middle name' },
    { title: 'Last Name', description: 'Enter your last name' },
  ],
  biodata: [
    {
      title: 'Date of Birth',
      description: 'Enter your Date of Birth',
      type: 'date',
    },
    { title: 'Gender', options: ['Male', 'Female'] },
    { title: 'Marital Status', options: ['Single', 'Married', 'Divorced'] },
    { title: 'Religion', options: ['Christianity', 'Islam', 'Rather not say'] },
    {
      title: 'Medical Records',
      options: ['Record 1', 'Record 2', 'Record 3'],
    },
    {
      title: 'Profession',
      options: ['Profession 1', 'Profession  2', 'Profession 3'],
    },
    {
      title: 'Phone Number',
      description: 'Enter your phone number',
      type: 'tel',
    },
    {
      title: 'Phone Number (Optional)',
      description: 'Enter your phone number',
      type: 'tel',
    },
    {
      title: 'Email',
      description: 'Enter your email address',
      type: 'email',
    },
  ],
  address: [
    { title: 'Country', options: ['Nigeria', 'France', 'Egypt', 'Ghana'] },
    { title: 'State', options: ['Lagos', 'Ilorin', 'Abuja', 'Kaduna'] },
    {
      title: 'Local Government',
      options: [
        'Ibadan S/W',
        'Lagos Central',
        'Abuja Central',
        'Kaduna Central',
      ],
    },
    {
      title: 'Town/City',
      options: ['Ikeja', 'Epe', 'Ofa', 'Ibadan'],
    },
    { title: 'Neighbourhood', description: 'Enter your Neighbourhood' },
    { title: 'Street Address', description: 'Enter your Street Address' },
  ],
  otherDetails: [
    {
      title: 'Medical Data',
      description: 'Enter your residential address line 1 here',
    },
    {
      title: 'Tags',
      description: 'Select from the options',
    },
    {
      title: 'Other Bio-data',
      description: 'Enter other Bio-data here',
    },
    {
      title: 'Next of Kin',
      options: ['Wale Romi', 'Blond Games', 'Williams Tosin', 'Wale Romi'],
    },
    {
      title: 'Non Hospital Indetifiers',
      options: ['CD120', 'CD122', 'CD120', 'CD130'],
    },
    {
      title: 'Payment Information',
      options: ['Paid', 'Out of cash'],
    },
    {
      title: 'Assignt to Care Team',
      options: ['Yes', 'No'],
    },
  ],
  nextOfKin: [
    {
      title: 'Full Name',
      description: 'Enter next of kin full name here',
    },
    {
      title: 'Phone Number',
      description: '234 000 000 0000',
    },
    {
      title: 'Email',
      description: 'Enter next of kin email here',
    },
    {
      title: 'Relationship',
      options: ['Father', 'Mother', 'Sibling'],
    },
  ],
  nonHospitalIndetifiers: [
    {
      title: 'National ID Number',
      description: 'Enter your National ID Number here',
    },
    {
      title: 'International Passport Number',
      description: 'Enter your International Passport Number here',
    },
    {
      title: 'Voters Card Number',
      description: 'Enter your Voters Card Number here',
    },
    {
      title: 'Drivers License Number',
      description: 'Enter your Drivers License Number here',
    },
  ],
  paymentInformation: [
    {
      title: 'Account Holder Name',
      description: 'Enter account holder name here',
    },
    {
      title: 'Bank',
      description: 'Enter Bank name here',
    },
    {
      title: 'Account Number',
      description: '000 0000 000',
    },
    {
      title: 'Payment Method',
      description: '',
    },
  ],
  medicalData: [
    {
      title: 'Blood Group',
      description: 'Enter blood group here',
    },
    {
      title: 'Genotype',
      description: 'Enter genotype here',
    },
    {
      title: 'Disabilities',
      description: '',
    },
    {
      title: 'Allergies',
      description: '',
    },
    {
      title: 'Co-mobidities',
      description: '',
    },
    {
      title: 'Payment Information',
      description: '',
    },
    {
      title: 'Specific details about patients',
      description: 'Enter other details about patients',
      textarea: true,
    },
  ],
};
const ClientFullForm = () => {
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
                label='Quick Registration'
                background='#ECF3FF'
                color='#0364FF'
                showicon={true}
                icon='bi bi-pen-fill'
                onClick={() => setFullRegistration(false)}
              />
            </HeadWrapper>
            {/* Names */}
            <DetailsWrapper title='Names'>
              <h2>Names</h2>
              <GridWrapper className='subgrid'>
                {clientFullFormData.names.map((name, index) => (
                  <Input label={name.title} key={index} />
                ))}
              </GridWrapper>
            </DetailsWrapper>

            {/*   BioData */}
            <DetailsWrapper title='Bio-data'>
              <h2>Bio-data</h2>
              <GridWrapper className='subgrid'>
                {clientFullFormData.biodata.map((bio, index) => {
                  if (bio.options) {
                    return (
                      <Select
                        options={bio.options}
                        label={bio.title}
                        key={index}
                        value=''
                      />
                    );
                  } else {
                    return (
                      <Input label={bio.title} key={index} type={bio.type} />
                    );
                  }
                })}
              </GridWrapper>
            </DetailsWrapper>

            {/* Address   */}
            <DetailsWrapper title='Address'>
              <h2>Address</h2>
              <GridWrapper className='subgrid'>
                {clientFullFormData.address.map((address, index) => {
                  if (address.options) {
                    return (
                      <Select
                        options={address.options}
                        label={address.title}
                        key={index}
                        value=''
                      />
                    );
                  } else {
                    return (
                      <Input
                        label={address.title}
                        key={index}
                        // type={address.type}
                      />
                    );
                  }
                })}
              </GridWrapper>
            </DetailsWrapper>

            {/* Other Details  */}
            <DetailsWrapper title='Other Details'>
              <h2>Other Details</h2>
              <GridWrapper className='subgrid'>
                {clientFullFormData.address.map((address, index) => {
                  if (address.options) {
                    return (
                      <Select
                        options={address.options}
                        label={address.title}
                        key={index}
                        value=''
                      />
                    );
                  } else {
                    return <Input label={address.title} key={index} />;
                  }
                })}
              </GridWrapper>
            </DetailsWrapper>

            {/* Next of Kin  */}
            <DetailsWrapper title='Next of Kin'>
              <h2>Next of Kin</h2>
              <GridWrapper className='subgrid'>
                {clientFullFormData.nextOfKin.map((address, index) => {
                  if (address.options) {
                    return (
                      <Select
                        options={address.options}
                        label={address.title}
                        key={index}
                        value=''
                      />
                    );
                  } else {
                    return <Input label={address.title} key={index} />;
                  }
                })}
              </GridWrapper>
            </DetailsWrapper>

            {/* Non Hosiptal Idenfiers  */}
            <DetailsWrapper title='Non-Hospitalsiptal Idenfiers'>
              <h2>Non-Hospital Indetifiers</h2>
              <GridWrapper className='subgrid'>
                {clientFullFormData.nonHospitalIndetifiers.map(
                  (address, index) => {
                    return <Input label={address.title} key={index} />;
                  }
                )}
              </GridWrapper>
            </DetailsWrapper>

            {/* Payment Information   */}
            <DetailsWrapper title='Payment Information'>
              <h2>Payment Information</h2>
              <GridWrapper className='subgrid'>
                {clientFullFormData.paymentInformation.map((address, index) => {
                  return <Input label={address.title} key={index} />;
                })}
              </GridWrapper>
            </DetailsWrapper>

            {/* Medical Data   */}
            <DetailsWrapper title='Medical Data'>
              <h2>Medical Data</h2>
              <GridWrapper className='subgrid'>
                {clientFullFormData.medicalData.map((address, index) => {
                  if (address.textarea) {
                    return <Textarea label={address.title} key={index} />;
                  }
                  return <Input label={address.title} key={index} />;
                })}
              </GridWrapper>
            </DetailsWrapper>

            <BottomWrapper>
              <Button label='Clear Form' background='#FFE9E9' color='#ED0423' />
              <Button label='Save Form' />
            </BottomWrapper>
          </GrayWrapper>
        </PageWrapper>
      ) : (
        <ClientQuickForm />
      )}
    </>
  );
};

export default ClientFullForm;
