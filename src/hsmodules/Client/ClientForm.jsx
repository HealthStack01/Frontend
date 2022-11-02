import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/basic/Input';
import CustomSelect from '../../components/inputs/basic/Select';
import BasicDatePicker from '../../components/inputs/Date';
import { UserContext } from '../../context';
import { yupResolver } from '@hookform/resolvers/yup';
import client from '../../feathers';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../app/styles';
import { createClientSchema } from './schema';
import ModalBox from '../../components/modal';

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
          <GrayWrapper>
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
              <>
                <DetailsWrapper title='Create Client' defaultExpanded={true}>
                  <GridWrapper className='height-auto'>
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
                </DetailsWrapper>
              </>
            ) : (
              <>
                {/* Names Section */}

                <DetailsWrapper title='Names'>
                  <GridWrapper>
                    <Input
                      label='First Name'
                      register={register('firstname')}
                    />
                    <Input
                      label='Middle Name'
                      register={register('middlename')}
                    />
                    <Input label='Last Name' register={register('lastname')} />
                    <BasicDatePicker
                      label='dob'
                      register={register('dob')}
                      errorText={errors?.dob?.message}
                    />
                  </GridWrapper>
                </DetailsWrapper>
                {/* Biodata Section */}

                <DetailsWrapper title='Biodata'>
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
                    <Input label='Phone No' register={register('phone')} />
                    <Input label='Email' register={register('email')} />
                    <Input label='Tags' register={register('clientTags')} />
                  </GridWrapper>
                </DetailsWrapper>
                {/* Address */}
                <DetailsWrapper title='Address'>
                  <GridWrapper>
                    <Input
                      label='Residential Address'
                      register={register('address')}
                    />
                    <Input label='Town/City' register={register('city')} />
                    <Input label='Local Govt Area' register={register('lga')} />
                    <Input label='State' register={register('state')} />
                    <Input label='Country' register={register('country')} />
                  </GridWrapper>
                </DetailsWrapper>
                {/* Medical Data */}
                <DetailsWrapper title='Medical Data'>
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
                      label='Specific Details about patient'
                      register={register('specificDetails')}
                    />
                  </GridWrapper>
                </DetailsWrapper>
                {/* Next of Kin Information */}
                <DetailsWrapper title='Next of Kin Information'>
                  <GridWrapper>
                    <Input
                      label='Next of Kin Full Name'
                      register={register('nok_name')}
                    />
                    <Input
                      label='Next of Kin Phone Number'
                      register={register('nok_phoneno')}
                    />
                    <Input
                      label='Next of Kin Email'
                      register={register('nok_email')}
                    />
                    <Input
                      label='Next of Kin Relationship'
                      register={register('nok_relationship')}
                    />
                    <Input
                      label='Co-mobidities'
                      register={register('comorbidities')}
                    />
                    <Input
                      label='Specific Details about patient'
                      register={register('specificDetails')}
                    />
                  </GridWrapper>
                </DetailsWrapper>
              </>
            )}
            <BottomWrapper>
              <Button label='Clear Form' background='#FFE9E9' color='#ED0423' />
              <Button label='Save Form' type='submit' loading={loading} />
            </BottomWrapper>
          </GrayWrapper>
        </PageWrapper>
      </form>
    </ModalBox>
  );
};

export default ClientForm;
