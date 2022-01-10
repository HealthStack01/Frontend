import React, { useState } from 'react';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import { useNavigate } from 'react-router-dom';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import ClientFullForm from './ClientFullForm';

interface RowProps {
  id: any;
}

interface ClientDetailsProps {
  row?: RowProps;
}
const clientFormData = [
  {
    title: 'First Name',
    name: 'fname',
    description: 'John',
    required: true,
  },
  {
    title: 'Midlle Name',
    description: 'Onyekachi',
    required: false,
  },
  {
    title: 'Last Name',
    description: 'Mabdiwe',
  },
  {
    title: 'Date of Birth',
    description: '2021-12-08',
  },
  {
    title: 'Gender',
    description: 'Male',
  },
  {
    title: 'Marital Status',
    description: 'Single',
  },
  {
    title: 'Email',
    description: 'johndoe@mail.com',
  },
  {
    title: 'Phone Number',
    description: '0806478263',
  },
  {
    title: 'Residential Address',
    description: 'Ozumba Mbadiwe',
  },
  {
    title: 'Town',
    description: 'Ikate Elegushi',
  },
  {
    title: 'State',
    description: 'Lagos',
  },
  {
    title: 'Country',
    description: 'Nigeria',
  },
  {
    title: 'Next of Kin',
    description: 'Cheif OBA Elegushi',
  },
  {
    title: 'Next of kin Phone',
    description: '0806478263',
  },
];

const ClientQuickForm: React.FC<ClientDetailsProps> = ({ row }) => {
  const [values, setValues] = useState({});
  const [isFullRegistration, setFullRegistration] = useState(false);

  let navigate = useNavigate();
  return (
    <>
      {!isFullRegistration ? (
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
                label='Full Registration'
                background='#ECF3FF'
                color='#0364FF'
                showicon={true}
                icon='bi bi-pen-fill'
                onClick={() => setFullRegistration(true)}
              />
            </HeadWrapper>
            <form
              action=''
              onSubmit={() => {
                navigate('/dashboard/clients/appointments');
                alert('submitted');
              }}
            >
              <DetailsWrapper title='Create Client'>
                <GridWrapper>
                  {clientFormData.map((client, index) => (
                    <Input
                      key={index}
                      label={client.title}
                      name={client.title}
                      onChange={e =>
                        setValues({
                          ...values,
                          [e.target.name]: e.target.value,
                        })
                      }
                    ></Input>
                  ))}
                </GridWrapper>
              </DetailsWrapper>

              <BottomWrapper>
                <Button
                  label='Clear Form'
                  background='#FFE9E9'
                  color='#ED0423'
                />
                <Button label='Save Form' type='submit' />
              </BottomWrapper>
            </form>
          </GrayWrapper>
        </PageWrapper>
      ) : (
        <ClientFullForm />
      )}
    </>
  );
};

export default ClientQuickForm;
