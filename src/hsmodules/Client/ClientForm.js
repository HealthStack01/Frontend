import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
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
        toast({
          message: 'Client created succesfully',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
        });

        setLoading(false);
        alert('Client successfully created');
      })
      .catch(err => {
        //setMessage("Error creating Client, probable network issues "+ err )
        // setError(true)
        toast({
          message: 'Error creating Client, probable network issues or ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
        setLoading(false);
        console.log('>>>>>>', data);

        alert('Errr creating client' + err);
      });

    setLoading(false);
  };
  const showRegister = data => console.log('>>>>>>', data);

  return (
    <form onSubmit={handleSubmit(submit)}>
      {/* <GridWrapper>
        <Input label='First Name' register={register('firstname')} />
        <Input label='Middle Name' register={register('middlename')} />
        <Input label='Last Name' register={register('lastname')} />
        <Input label='Phone' register={register('phone')} />
        <BasicDatePicker label='dob' register={register('dob')} />
      </GridWrapper> */}

      <PageWrapper>
        <GrayWrapper className='height-auto'>
          <HeadWrapper>
            <Button
              label='Quick Registration'
              background='#ECF3FF'
              color='#0364FF'
              showicon
              icon='bi bi-pen-fill'
              // onClick={() => setFullRegistration(false)}
            />
          </HeadWrapper>

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
          {/* <DetailsWrapper title='Address'>
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
          </DetailsWrapper> */}
          {/* Medical Data */}
          {/* <DetailsWrapper title='Medical Data'>
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
          </DetailsWrapper> */}
          {/* Next of Kin Information */}
          {/* <DetailsWrapper title='Next of Kin Information'>
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
          </DetailsWrapper> */}
          <BottomWrapper>
            <Button label='Save' type='submit' loading={loading} />
          </BottomWrapper>
        </GrayWrapper>
      </PageWrapper>
    </form>
  );
};

export default ClientForm;
