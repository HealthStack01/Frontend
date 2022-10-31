import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/basic/Input';
import CustomSelect from '../../components/inputs/basic/Select';
import BasicDatePicker from '../../components/inputs/Date';
import client from '../../feathers';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../app/styles';

const ClientForm = () => {
  const ClientServ = client.service('client');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFullRegistration, setFullRegistration] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      middlename: '',
      dob: '',
      phone: '',
      email: '',
      facility: '',
    },
  });
  const submit = async (data, e) => {
    setLoading(true);
    e.preventDefault();
    setSuccess(false);

    await ClientServ.create(data)
      .then(res => {
        toast.error(`Client successfully created`);

        setLoading(false);
      })
      .catch(err => {
        toast.error(`Sorry, You weren't able to create an client.`);
        setLoading(false);
        console.log('>>>>>>', data);
      });

    setLoading(false);
  };
  const showRegister = data => console.log('>>>>>>', data);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <ToastContainer theme='colored' />

      {/* Start form */}
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
              label={`${
                !isFullRegistration ? 'Full Registration' : 'Quick Registration'
              }`}
              background='#ECF3FF'
              color='#0364FF'
              showicon
              icon='bi bi-pen-fill'
              onClick={() => setFullRegistration(!isFullRegistration)}
            />
          </HeadWrapper>

          <form onSubmit={handleSubmit(submit)}>
            <ToastContainer theme='colored' />

            {!isFullRegistration ? (
              <>
                <DetailsWrapper title='Create Client' defaultExpanded={true}>
                  <GridWrapper className='height-auto'>
                    <Input
                      label='First Name'
                      register={register('firstname')}
                    />
                    <Input
                      label='Middle Name'
                      register={register('middlename')}
                    />
                    <Input label='Last Name' register={register('lastname')} />
                    <Input
                      label='Phone'
                      register={register('phone')}
                      type='tel'
                    />
                    <Input
                      label='Email'
                      register={register('email')}
                      type='email'
                    />
                    <BasicDatePicker label='dob' register={register('dob')} />
                    <CustomSelect
                      label='Gender'
                      register={register('gender', { required: true })}
                      options={[
                        { label: 'Male', value: 'Male' },
                        { label: 'Female', value: 'Memale' },
                      ]}
                    />
                    <CustomSelect
                      label='Gender'
                      register={register('maritalstatus', { required: true })}
                      options={[
                        { label: 'Single', value: 'Single' },
                        { label: 'Married', value: 'Married' },
                      ]}
                    />
                    <Input
                      label='Residential Address'
                      register={register('residentialaddress')}
                    />
                    <Input label='Town' register={register('town')} />
                    <Input label='State' register={register('state')} />
                    <Input label='Country' register={register('country')} />
                    <Input
                      label='Next of Kin'
                      register={register('nextofkin')}
                    />
                    <Input
                      label='Next of Kin Phone'
                      register={register('nextofkinphone')}
                      type='tel'
                    />
                  </GridWrapper>
                </DetailsWrapper>
              </>
            ) : (
              <>
                {/* Names Section */}

                <DetailsWrapper title='Names'>
                  <GridWrapper>
                    <Input
                      label='First Name'
                      register={register('firstname', { required: true })}
                    />
                    <Input
                      label='Middle Name'
                      register={register('middlename', { required: true })}
                    />
                    <Input
                      label='Last Name'
                      register={register('lastname', { required: true })}
                    />
                  </GridWrapper>
                </DetailsWrapper>
                {/* Biodata Section */}

                <DetailsWrapper title='Biodata'>
                  <GridWrapper>
                    <CustomSelect
                      label='Gender'
                      register={register('gender', { required: true })}
                      options={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                      ]}
                    />
                    <Input
                      label='Marital Status'
                      register={register('maritalstatus', { required: true })}
                    />
                    <Input
                      label='Medical record Number'
                      register={register('mrn', { required: true })}
                    />
                    <Input
                      label='Religion'
                      register={register('religion', { required: true })}
                    />
                    <Input
                      label='Profession'
                      register={register('profession', { required: true })}
                    />
                    <Input
                      label='Phone No'
                      register={register('phone', { required: true })}
                    />
                    <Input
                      label='Email'
                      register={register('email', { required: true })}
                    />
                    <Input
                      label='Tags'
                      register={register('clientTags', { required: true })}
                    />
                  </GridWrapper>
                </DetailsWrapper>
                {/* Address */}
                <DetailsWrapper title='Address'>
                  <GridWrapper>
                    <Input
                      label='Residential Address'
                      register={register('address', { required: true })}
                    />
                    <Input
                      label='Town/City'
                      register={register('city', { required: true })}
                    />
                    <Input
                      label='Local Govt Area'
                      register={register('lga', { required: true })}
                    />
                    <Input
                      label='State'
                      register={register('state', { required: true })}
                    />
                    <Input
                      label='Country'
                      register={register('country', { required: true })}
                    />
                  </GridWrapper>
                </DetailsWrapper>
                {/* Medical Data */}
                <DetailsWrapper title='Medical Data'>
                  <GridWrapper>
                    <Input
                      label='Blood Group'
                      register={register('bloodgroup', { required: true })}
                    />
                    <Input
                      label='Genotype'
                      register={register('genotype', { required: true })}
                    />
                    <Input
                      label='Disabilities'
                      register={register('disabilities', { required: true })}
                    />
                    <Input
                      label='Allergies'
                      register={register('allergies', { required: true })}
                    />
                    <Input
                      label='Co-mobidities'
                      register={register('comorbidities', { required: true })}
                    />
                    <Input
                      label='Specific Details about patient'
                      register={register('specificDetails', { required: true })}
                    />
                  </GridWrapper>
                </DetailsWrapper>
                {/* Next of Kin Information */}
                <DetailsWrapper title='Next of Kin Information'>
                  <GridWrapper>
                    <Input
                      label='Next of Kin Full Name'
                      register={register('nok_name', { required: true })}
                    />
                    <Input
                      label='Next of Kin Phone Number'
                      register={register('nok_phoneno', { required: true })}
                    />
                    <Input
                      label='Next of Kin Email'
                      register={register('nok_email', { required: true })}
                    />
                    <Input
                      label='Next of Kin Relationship'
                      register={register('nok_relationship', {
                        required: true,
                      })}
                    />
                    <Input
                      label='Co-mobidities'
                      register={register('comorbidities', { required: true })}
                    />
                    <Input
                      label='Specific Details about patient'
                      register={register('specificDetails', { required: true })}
                    />
                  </GridWrapper>
                </DetailsWrapper>
              </>
            )}
            <BottomWrapper>
              <Button label='Clear Form' background='#FFE9E9' color='#ED0423' />
              <Button label='Save Form' type='submit' loading={loading} />
            </BottomWrapper>
          </form>
        </GrayWrapper>
      </PageWrapper>
    </form>
  );
};

export default ClientForm;
