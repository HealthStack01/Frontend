import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/basic/Input';
import CustomSelect from '../../components/inputs/basic/Select';
import BasicDatePicker from '../../components/inputs/Date';
import ViewText from '../../components/viewtext';
import { UserContext } from '../../context';
import client from '../../feathers';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../app/styles';

const ClientView = ({ user }) => {
  const ClientServ = client.service('client');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const { user: data, setUser } = useContext(UserContext);

  console.log('User', user);

  const { register, handleSubmit, reset } = useForm({});

  useEffect(() => {
    reset({
      firstname: user.firstname,
      lastname: user.lastname,
      middlename: user.middlename,
      dob: user.dob,
      phone: user.phone,
      email: user.email,
      facility: data.currentEmployee.facility,
    });
  }, []);
  const submit = async (data, e) => {
    setLoading(true);
    e.preventDefault();
    setSuccess(false);

    await ClientServ.patch(user._id, data)
      .then(res => {
        toast.success(`Client successfully updated`);

        setLoading(false);
      })
      .catch(err => {
        toast.error(`Sorry, You weren't able to updated an client. ${err}`);
        setLoading(false);
      });

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <ToastContainer theme='colored' />

      {/* Start form */}
      <PageWrapper>
        <GrayWrapper>
          <HeadWrapper>
            <div>
              <h2>Client Detail</h2>
              <span>
                Client detail of {user.firstname} {user.lastname}
              </span>
            </div>
            <Button
              label={`${editing ? 'Edit Client' : 'Cancel Editing'}`}
              background='#ECF3FF'
              color='#0364FF'
              showicon
              icon='bi bi-pen-fill'
              disabled={editing}
              onClick={() => {
                setEditing(!editing);
                reset();
              }}
            />
          </HeadWrapper>

          <ToastContainer theme='colored' />

          <>
            {/* Names Section */}

            <DetailsWrapper title='Names'>
              <GridWrapper>
                {!editing ? (
                  <ViewText label='First Name' text={user.firstname} />
                ) : (
                  <Input
                    label='First Name'
                    register={register('firstname', { required: true })}
                  />
                )}
                {!editing ? (
                  <ViewText label='Middle Name' text={user.middlename} />
                ) : (
                  <Input
                    label='Midle Name'
                    register={register('middlename', { required: true })}
                  />
                )}
                {!editing ? (
                  <ViewText label='Last Name' text={user.lastname} />
                ) : (
                  <Input
                    label='Last Name'
                    register={register('lastname', { required: true })}
                  />
                )}
                {!editing ? (
                  <ViewText label='Date of Birth' text={user.dob} />
                ) : (
                  <BasicDatePicker label='dob' register={register('dob')} />
                )}
              </GridWrapper>
            </DetailsWrapper>
            {/* Biodata Section */}

            <DetailsWrapper title='Biodata'>
              <GridWrapper>
                {!editing ? (
                  <ViewText label='Gender' text={user.gender} />
                ) : (
                  <CustomSelect
                    label='Gender'
                    register={register('gender', { required: true })}
                    options={[
                      { label: 'Male', value: 'male' },
                      { label: 'Female', value: 'female' },
                    ]}
                  />
                )}
                {!editing ? (
                  <ViewText label='Marital Status' text={user.maritalstatus} />
                ) : (
                  <CustomSelect
                    label='Marital Status'
                    register={register('maritalstatus', { required: true })}
                    options={[
                      { label: 'Single', value: 'single' },
                      { label: 'Married', value: 'married' },
                    ]}
                  />
                )}

                {!editing ? (
                  <ViewText label='Medical record Number' text={user.mrn} />
                ) : (
                  <Input
                    label='Medical record Number'
                    register={register('mrn', { required: true })}
                  />
                )}
                {!editing ? (
                  <ViewText label='Religion' text={user.religion} />
                ) : (
                  <Input
                    label='Religion'
                    register={register('religion', { required: true })}
                  />
                )}

                {!editing ? (
                  <ViewText label='Profession' text={user.profession} />
                ) : (
                  <Input
                    label='Profession'
                    register={register('profession', { required: true })}
                  />
                )}
                {!editing ? (
                  <ViewText label='Phone Number' text={user.phone} />
                ) : (
                  <Input
                    label='Phone Number'
                    register={register('phone', { required: true })}
                    type='tel'
                  />
                )}
                {!editing ? (
                  <ViewText label='Email' text={user.email} />
                ) : (
                  <Input
                    label='Email'
                    register={register('email', { required: true })}
                    type='email'
                  />
                )}
                {!editing ? (
                  <ViewText label='Tags' text={user.clientTags} />
                ) : (
                  <Input
                    label='Tags'
                    register={register('clientTags', { required: true })}
                    type='email'
                  />
                )}
              </GridWrapper>
            </DetailsWrapper>
            {/* Address */}
            <DetailsWrapper title='Address'>
              <GridWrapper>
                {!editing ? (
                  <ViewText label='Residential Address' text={user.address} />
                ) : (
                  <Input
                    label='Residential Address'
                    register={register('address', { required: true })}
                  />
                )}
                {!editing ? (
                  <ViewText label='Town/City' text={user.city} />
                ) : (
                  <Input
                    label='Town/City'
                    register={register('city', { required: true })}
                  />
                )}

                {!editing ? (
                  <ViewText label='Local Government Area' text={user.lga} />
                ) : (
                  <Input
                    label='Local Government Area'
                    register={register('lga', { required: true })}
                  />
                )}

                {!editing ? (
                  <ViewText label='State' text={user.state} />
                ) : (
                  <Input
                    label='State'
                    register={register('state', { required: true })}
                  />
                )}

                {!editing ? (
                  <ViewText label='Country' text={user.country} />
                ) : (
                  <Input
                    label='Country'
                    register={register('country', { required: true })}
                  />
                )}
              </GridWrapper>
            </DetailsWrapper>
            {/* Medical Data */}
            <DetailsWrapper title='Medical Data'>
              <GridWrapper>
                {!editing ? (
                  <ViewText label='Blood Group' text={user.bloodgroup} />
                ) : (
                  <Input
                    label='Blood Group'
                    register={register('bloodgroup', { required: true })}
                  />
                )}

                {!editing ? (
                  <ViewText label='Genotype' text={user.genotype} />
                ) : (
                  <Input
                    label='Genotype'
                    register={register('genotype', { required: true })}
                  />
                )}
                {!editing ? (
                  <ViewText label='Disabilities' text={user.disabilities} />
                ) : (
                  <Input
                    label='Disabilities'
                    register={register('disabilities', { required: true })}
                  />
                )}
                {!editing ? (
                  <ViewText label='Allergies' text={user.allergies} />
                ) : (
                  <Input
                    label='Allergies'
                    register={register('allergies', { required: true })}
                  />
                )}
                {!editing ? (
                  <ViewText label='Co-mobidities' text={user.comorbidities} />
                ) : (
                  <Input
                    label='Co-mobidities'
                    register={register('comorbidities', { required: true })}
                  />
                )}
                {!editing ? (
                  <ViewText
                    label='Specific Details about patient'
                    text={user.specificDetails}
                  />
                ) : (
                  <Input
                    label='Specific Details about patient'
                    register={register('specificDetails', { required: true })}
                  />
                )}
              </GridWrapper>
            </DetailsWrapper>
            {/* Next of Kin Information */}
            <DetailsWrapper title='Next of Kin Information'>
              <GridWrapper>
                {!editing ? (
                  <ViewText
                    label='Next of Kin Full Name'
                    text={user.nok_name}
                  />
                ) : (
                  <Input
                    label='Next of Kin Full Name'
                    register={register('nok_name', { required: true })}
                  />
                )}

                {!editing ? (
                  <ViewText
                    label='Next of Kin Phone Number'
                    text={user.nok_phoneno}
                  />
                ) : (
                  <Input
                    label='Next of Kin Phone Number'
                    register={register('nok_phoneno', { required: true })}
                  />
                )}

                {!editing ? (
                  <ViewText label='Next of Kin Email' text={user.email} />
                ) : (
                  <Input
                    label='Next of Kin Email'
                    register={register('nok_email', { required: true })}
                  />
                )}
                {!editing ? (
                  <ViewText
                    label='Next of Kin Relationship'
                    text={user.nok_relationship}
                  />
                ) : (
                  <Input
                    label='Next of Kin Relationship'
                    register={register('nok_relationship', { required: true })}
                  />
                )}
                {!editing ? (
                  <ViewText label='Co-mobidities' text={user.comorbidities} />
                ) : (
                  <Input
                    label='Co-mobidities'
                    register={register('comorbidities', { required: true })}
                  />
                )}
                {!editing ? (
                  <ViewText
                    label='Specific Details about patient'
                    text={user.specificDetails}
                  />
                ) : (
                  <Input
                    label='Specific Details about patient'
                    register={register('specificDetails', { required: true })}
                  />
                )}
              </GridWrapper>
            </DetailsWrapper>
          </>
          <BottomWrapper>
            <Button
              label='Clear Form'
              background='#FFE9E9'
              color='#ED0423'
              onClick={() => reset()}
            />
            <Button label='Save Form' type='submit' loading={loading} />
          </BottomWrapper>
        </GrayWrapper>
      </PageWrapper>
    </form>
  );
};

export default ClientView;
