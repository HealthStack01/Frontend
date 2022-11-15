import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/basic/Input';
import CustomSelect from '../../components/inputs/basic/Select';
import BasicDatePicker from '../../components/inputs/Date';
import { yupResolver } from '@hookform/resolvers/yup';
import client from '../../feathers';
import {
  BottomWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
  ViewBox,
} from '../app/styles';
import { createClientSchema } from './schema';
import ModalBox from '../../components/modal';
import Textarea from '../../components/inputs/basic/Textarea';

const ClientForm = ({ open, setOpen }) => {
  const ClientServ = client.service('client');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFullRegistration, setFullRegistration] = useState(false);
  const data = localStorage.getItem('user');
  const user = JSON.parse(data);

  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    resolver: yupResolver(createClientSchema),

    defaultValues: {
      firstname: '',
      lastname: '',
      middlename: '',
      dob: '',
      phone: '',
      email: '',
      facility: user.currentEmployee.facility,
    },
  });
  const submit = async (data, e) => {
    setLoading(true);
    e.preventDefault();
    setSuccess(false);

    await ClientServ.create(data)
      .then(res => {
        toast.success(`Client successfully created`);

        setLoading(false);
      })
      .catch(err => {
        toast.error(`Sorry, You weren't able to create an client. ${err}`);
        setLoading(false);
      });
    setOpen(false);
    setLoading(false);
  };
  const showRegister = data => console.log('>>>>>>', data);

  return (
    <ModalBox open={open} onClose={setOpen}>
      <form onSubmit={handleSubmit(submit)}>
        <ToastContainer theme='colored' />

        {/* Start form */}
        <PageWrapper>
          <div>
            <HeadWrapper>
              <div>
                <h2>{`${
                  isFullRegistration
                    ? 'Full Register Client'
                    : 'Quick Register Client'
                }`}</h2>
                <span>
                  Create a New client by filling out the form below to get
                  started.
                </span>
              </div>
              <Button
                label={`${
                  !isFullRegistration
                    ? 'Full Registration'
                    : 'Quick Registration'
                }`}
                background='#ECF3FF'
                color='#0364FF'
                showicon
                icon='bi bi-pen-fill'
                onClick={() => setFullRegistration(!isFullRegistration)}
              />
            </HeadWrapper>

            <ToastContainer theme='colored' />

            {!isFullRegistration ? (
              <div style={{ width: '80vw' }}>
                <ViewBox>
                  <GridWrapper
                    className='height-auto'
                    style={{
                      marginTop: '1rem',
                      gap: '1rem',
                    }}
                  >
                    <Input
                      label='First Name'
                      register={register('firstname')}
                      errorText={errors?.firstname?.message}
                    />
                    <Input
                      label='Middle Name'
                      register={register('middlename')}
                      errorText={errors?.middlename?.message}
                    />
                    <Input
                      label='Last Name'
                      register={register('lastname')}
                      errorText={errors?.lastname?.message}
                    />
                    <Input
                      label='Phone'
                      register={register('phone')}
                      type='tel'
                      errorText={errors?.phone?.message}
                    />
                    <Input
                      label='Email'
                      register={register('email')}
                      type='email'
                      errorText={errors?.email?.message}
                    />
                    <BasicDatePicker
                      label='dob'
                      register={register('dob')}
                      errorText={errors?.dob?.message}
                    />
                    <CustomSelect
                      label='Gender'
                      register={register('gender', { required: true })}
                      options={[
                        { label: 'Male', value: 'Male' },
                        { label: 'Female', value: 'Memale' },
                      ]}
                      errorText={errors?.gender?.message}
                    />
                    <CustomSelect
                      label='Marital Status'
                      register={register('maritalstatus')}
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
                </ViewBox>

                <BottomWrapper>
                  <Button
                    label='Close'
                    background='#FFE9E9'
                    color='#ED0423'
                    onClick={() => setOpen(false)}
                  />
                  <Button label='Save Form' type='submit' loading={loading} />
                </BottomWrapper>
              </div>
            ) : (
              <div
                style={{ height: '80vh', overflowY: 'scroll', width: '80vw' }}
              >
                {/* Names Section */}

                <ViewBox>
                  <h2>Names</h2>

                  <GridWrapper>
                    <Input
                      label='First Name'
                      register={register('firstname')}
                      errorText={errors?.firstname?.message}
                    />
                    <Input
                      label='Middle Name'
                      register={register('middlename')}
                      errorText={errors?.middlename?.message}
                    />
                    <Input
                      label='Last Name'
                      register={register('lastname')}
                      errorText={errors?.lastname?.message}
                    />
                    <BasicDatePicker
                      label='Date of Birth'
                      register={register('dob')}
                      errorText={errors?.dob?.message}
                    />
                  </GridWrapper>
                </ViewBox>
                {/* Biodata Section */}

                <ViewBox>
                  <h2>Biodata</h2>

                  <GridWrapper>
                    <CustomSelect
                      label='Gender'
                      register={register('gender')}
                      options={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                      ]}
                    />
                    <CustomSelect
                      label='Marital Status'
                      register={register('maritalstatus')}
                      options={[
                        { label: 'Single', value: 'Single' },
                        { label: 'Married', value: 'Married' },
                      ]}
                    />
                    <Input
                      label='Medical record Number'
                      register={register('mrn')}
                    />
                    <Input label='Religion' register={register('religion')} />
                    <Input
                      label='Profession'
                      register={register('profession')}
                    />
                    <Input
                      label='Phone No'
                      register={register('phone')}
                      errorText={errors?.phone?.message}
                    />
                    <Input
                      label='Email'
                      register={register('email')}
                      errorText={errors?.email?.message}
                    />
                    <Input label='Tags' register={register('clientTags')} />
                  </GridWrapper>
                </ViewBox>
                {/* Address */}
                <ViewBox>
                  <h2>Addresses</h2>
                  <Textarea
                    label='Residential Address'
                    register={register('address')}
                  />

                  <GridWrapper>
                    <Input label='Town/City' register={register('city')} />
                    <Input label='Local Govt Area' register={register('lga')} />
                    <Input label='State' register={register('state')} />
                    <Input label='Country' register={register('country')} />
                  </GridWrapper>
                </ViewBox>
                {/* Medical Data */}
                <ViewBox>
                  <h2>Medical Data</h2>

                  <GridWrapper>
                    <Input
                      label='Blood Group'
                      register={register('bloodgroup')}
                    />
                    <Input label='Genotype' register={register('genotype')} />
                    <Input
                      label='Disabilities'
                      register={register('disabilities')}
                    />
                    <Input label='Allergies' register={register('allergies')} />
                    <Input
                      label='Co-mobidities'
                      register={register('comorbidities')}
                    />
                    <Input
                      label='Specific Details '
                      register={register('specificDetails')}
                    />
                  </GridWrapper>
                </ViewBox>
                {/* Next of Kin Information */}
                <ViewBox>
                  <h2>Next of Kin Information</h2>

                  <GridWrapper>
                    <Input label='Full Name' register={register('nok_name')} />
                    <Input
                      label='Phone Number'
                      register={register('nok_phoneno')}
                    />
                    <Input label=' Email' register={register('nok_email')} />
                    <Input
                      label='Relationship'
                      register={register('nok_relationship')}
                    />
                    <Input
                      label='Co-mobidities'
                      register={register('comorbidities')}
                    />
                    <Input
                      label='Specific Details '
                      register={register('specificDetails')}
                    />
                  </GridWrapper>
                </ViewBox>

                <BottomWrapper>
                  <Button
                    label='Close'
                    background='#FFE9E9'
                    color='#ED0423'
                    onClick={() => setOpen(false)}
                  />
                  <Button label='Save Form' type='submit' loading={loading} />
                </BottomWrapper>
              </div>
            )}
          </div>
        </PageWrapper>
      </form>
    </ModalBox>
  );
};

export default ClientForm;
